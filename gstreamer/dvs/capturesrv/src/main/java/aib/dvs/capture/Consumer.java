package aib.dvs.capture;

import org.apache.log4j.Logger;
import org.freedesktop.gstreamer.Bin;
import org.freedesktop.gstreamer.Pipeline;
import org.freedesktop.gstreamer.StateChangeReturn;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import aib.dvs.capture.contract.ICommand;
import aib.dvs.capture.contract.PreviewStateChanged;
import aib.dvs.capture.contract.StartPreview;
import aib.dvs.capture.contract.StopPreview;

@Component
public class Consumer {
	static Logger logger = Logger.getLogger(Consumer.class);
	
	private Pipeline pipe;
	
	@RabbitListener(queues = "q.capture")
    public PreviewStateChanged onMessage(ICommand command) {
		
		if(command instanceof StartPreview) {
			StartPreview message = (StartPreview)command;
	    	logger.info("Starting preview. Resolution=" + message.getResolution());    	
	    		    	
	        String resData[] = message.getResolution().split("x");
	    	Bin binCam = Bin.launch("v4l2src caps=video/x-raw,width=" + resData[0] + ",height=" + resData[1] + ",framerate=30/1", true); 
	    	Bin binCodec = Bin.launch("jpegenc quality=95", true);
	    	Bin binRtp = Bin.launch("rtpjpegpay", true);
	    	Bin binUdp = Bin.launch("udpsink host=127.0.0.1 port=5200", true);
	    	pipe = new Pipeline();
	    	pipe.addMany(binCam, binCodec, binRtp, binUdp);
	    	Pipeline.linkMany(binCam, binCodec, binRtp, binUdp);
	   
	    	StateChangeReturn ret = pipe.play();
	    	
	    	PreviewStateChanged replyMessage = new PreviewStateChanged();
	        replyMessage.setIsStarted(ret == StateChangeReturn.SUCCESS);
	        logger.info(replyMessage.getIsStarted() ? "Pipeline started successfully" : "Error while starting pipeline");
			return replyMessage;        
		} else if(command instanceof StopPreview) {
	    	logger.info("Stopping preview");   
	    	StateChangeReturn ret = pipe.stop();
	    	PreviewStateChanged replyMessage = new PreviewStateChanged();
	        replyMessage.setIsStarted(ret == StateChangeReturn.SUCCESS);
	        logger.info(replyMessage.getIsStarted() ? "Pipeline stopped successfully" : "Error while stopping pipeline");
			return replyMessage;        
		}
		
		return null;
    }
}
