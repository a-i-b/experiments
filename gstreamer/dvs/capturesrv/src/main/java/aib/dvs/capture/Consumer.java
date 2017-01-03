package aib.dvs.capture;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import aib.dvs.capture.contract.ICommand;
import aib.dvs.capture.contract.PreviewStateChanged;
import aib.dvs.capture.contract.StartPreview;
import aib.dvs.capture.contract.StopPreview;

@Component
public class Consumer {
	static Logger logger = Logger.getLogger(Consumer.class);
	
	RabbitTemplate rabbitTemplate;
	
	public Consumer(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}
	
	@RabbitListener(queues = "q.capture")
    public PreviewStateChanged onMessage(ICommand command) {
		
		if(command instanceof StartPreview) {
			StartPreview message = (StartPreview)command;
	    	logger.info("Starting preview. Resolution=" + message.getResolution());    	
	        
	    	PreviewStateChanged replyMessage = new PreviewStateChanged();
	        replyMessage.setIsStarted(true);
			return replyMessage;        
		} else if(command instanceof StopPreview) {
	    	logger.info("Stopping preview");    	
	    	PreviewStateChanged replyMessage = new PreviewStateChanged();
	        replyMessage.setIsStarted(false);
			return replyMessage;        
		}
		
		return null;
    }
}
