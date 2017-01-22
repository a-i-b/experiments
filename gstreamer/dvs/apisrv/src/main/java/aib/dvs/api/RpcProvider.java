package aib.dvs.api;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.channels.Channels;
import java.nio.channels.WritableByteChannel;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aib.dvs.av.IRTPReceiver;
import aib.dvs.capture.contract.CapturingStateChanged;
import aib.dvs.capture.contract.ICommand;
import aib.dvs.capture.contract.PreviewStateChanged;
import aib.dvs.capture.contract.StartCapturing;
import aib.dvs.capture.contract.StartPreview;
import aib.dvs.capture.contract.StopCapturing;
import aib.dvs.capture.contract.StopPreview;

@RestController
@RequestMapping("/api")
public class RpcProvider {
	static Logger logger = Logger.getLogger(RpcProvider.class);

	RabbitTemplate rabbitRpcTemplate;
	IRTPReceiver rtpReceiver;
	
	public RpcProvider(RabbitTemplate rabbitRpcTemplate, IRTPReceiver rtpReceiver) {
		this.rabbitRpcTemplate = rabbitRpcTemplate;
		this.rtpReceiver = rtpReceiver;
	}
	
	@RequestMapping("/preview")
    public PreviewStateChanged preview(@RequestParam(value="isToStart") Boolean isToStart, 
    		@RequestParam(value="resolution") String resolution) {		
		
		ICommand request = null;
		if(isToStart) {
			StartPreview startRequest = new StartPreview();
			startRequest.setResolution(resolution);
			request = startRequest;
		} else {
			request = new StopPreview();
		}
		
		PreviewStateChanged reply = (PreviewStateChanged)rabbitRpcTemplate.convertSendAndReceive(RabbitConfigRpc.QueueCapture, request);		
		return reply;
    }

	@RequestMapping("/capture")
    public CapturingStateChanged capture(@RequestParam(value="isToStart") Boolean isToStart, 
    		@RequestParam(value="fileName") String fileName) {		
		
		ICommand request = null;
		if(isToStart) {
			StartCapturing startRequest = new StartCapturing();
			startRequest.setFileName(fileName);
			request = startRequest;
		} else {
			request = new StopCapturing();
		}
		
		CapturingStateChanged reply = (CapturingStateChanged)rabbitRpcTemplate.convertSendAndReceive(RabbitConfigRpc.QueueCapture, request);		
		return reply;
    }

	@Async
	@RequestMapping("/mjpeg")
	public void getMotionJPEGAsResource(HttpServletResponse response) {

		rtpReceiver.stop();
		
		response.setContentType("multipart/x-mixed-replace; boundary=--BoundaryString");

		OutputStream outputStream;
		try {
			outputStream = response.getOutputStream();
			WritableByteChannel channel = Channels.newChannel(outputStream);
			rtpReceiver.run(data -> {
		    	try {
		    		outputStream.write((
							"--BoundaryString\r\n" +
							"Content-type: image/jpeg\r\n" +
							"Content-Length: " +
							data.remaining() +
							"\r\n\r\n").getBytes());	    		
		    		channel.write(data);	    		
					outputStream.write("\r\n\r\n".getBytes());				
					outputStream.flush();
					return false;
					
				} catch (IOException e) {
					e.printStackTrace();
					return true;
				}
		    });	    
			
			while(!rtpReceiver.isErrorOnStream()) {
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			
		} catch (IOException e) {
			rtpReceiver.stop();
			logger.info("Exit streaming...");
		}		
	}
}
