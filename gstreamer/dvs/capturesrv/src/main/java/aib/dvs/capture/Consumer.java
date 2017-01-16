package aib.dvs.capture;

import org.apache.log4j.Logger;
import org.freedesktop.gstreamer.Bin;
import org.freedesktop.gstreamer.Caps;
import org.freedesktop.gstreamer.Element;
import org.freedesktop.gstreamer.ElementFactory;
import org.freedesktop.gstreamer.Gst;
import org.freedesktop.gstreamer.Pipeline;
import org.freedesktop.gstreamer.StateChangeReturn;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import aib.dvs.av.IVideoSevice;
import aib.dvs.capture.contract.ICommand;
import aib.dvs.capture.contract.PreviewStateChanged;
import aib.dvs.capture.contract.StartPreview;
import aib.dvs.capture.contract.StopPreview;

@Component
public class Consumer {
	static Logger logger = Logger.getLogger(Consumer.class);
		
	private IVideoSevice videoService;
	
	public Consumer(IVideoSevice videoService) {
		this.videoService = videoService;
	}
	
	@RabbitListener(queues = "q.capture")
    public PreviewStateChanged onMessage(ICommand command) throws InterruptedException {
		
		if(command instanceof StartPreview) {
			StartPreview message = (StartPreview)command;
	    	logger.info("Starting preview. Resolution=" + message.getResolution());    	

	    	PreviewStateChanged replyMessage = new PreviewStateChanged();
	    	
	    	try {
		    	replyMessage.setIsStarted(videoService.startStream(message.getResolution(), 0, 5200));
	    	} catch (Exception ex) {
	    		logger.error(ex.getMessage());
	    		replyMessage.setIsStarted(false);
	    	}
	        
	        logger.info(replyMessage.getIsStarted() ? "Pipeline started successfully" : "Error while starting pipeline");
			return replyMessage;        
		} else if(command instanceof StopPreview) {
	    	logger.info("Stopping preview");   
	    	PreviewStateChanged replyMessage = new PreviewStateChanged();
	        replyMessage.setIsStarted(!videoService.stopStream(5200));
	        logger.info(!replyMessage.getIsStarted() ? "Pipeline stopped successfully" : "Error while stopping pipeline");
			return replyMessage;        
		}
		
		return null;
    }
}
