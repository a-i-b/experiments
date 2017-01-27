package aib.dvs.analyzer;

import org.apache.log4j.Logger;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import aib.dvs.capture.contract.ICommand;
import aib.dvs.capture.contract.IEvent;

@Component
public class Consumer {
	static Logger logger = Logger.getLogger(Consumer.class);
			
	public Consumer() {
	}
	
	@RabbitListener(queues = "q.capture")
    public IEvent onMessage(ICommand command) throws InterruptedException {

		/*
		if(command instanceof StartPreview) {
			StartPreview message = (StartPreview)command;
	    	logger.info("Starting preview. Resolution=" + message.getResolution());    	
	        
	        logger.info(replyMessage.getIsStarted() ? "Preview started successfully" : "Error while starting Preview");
			return replyMessage;        
		}
		*/
		
		return null;
    }
}
