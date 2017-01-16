package aib.dvs.api;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.channels.Channels;
import java.nio.channels.WritableByteChannel;

import javax.servlet.http.HttpServletResponse;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import aib.dvs.av.IRTPReceiver;
import aib.dvs.capture.contract.ICommand;
import aib.dvs.capture.contract.PreviewStateChanged;
import aib.dvs.capture.contract.StartPreview;
import aib.dvs.capture.contract.StopPreview;

@RestController
@RequestMapping("/rpc")
public class RpcProvider {
	
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
	
	@RequestMapping("/mjpg")
	public void getMotionJPEGAsResource(HttpServletResponse response) {

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
					
				} catch (IOException e) {
					e.printStackTrace();
				}
		    });	    
			
			while(true) {
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			
		} catch (IOException e) {
			rtpReceiver.stop();
			e.printStackTrace();
		}		
	}
}
