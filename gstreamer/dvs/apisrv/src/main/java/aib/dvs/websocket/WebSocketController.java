package aib.dvs.websocket;

import org.apache.log4j.Logger;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

import aib.dvs.capture.contract.PreviewStateChanged;

@Component
public class WebSocketController {
	static Logger logger = Logger.getLogger(WebSocketController.class);
	
	private final SimpMessageSendingOperations messagingTemplate;
	
	public WebSocketController(SimpMessageSendingOperations messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}
	
	@RabbitListener(queues = "q.ws")
    public void onNewMessage(PreviewStateChanged message) {
    	messagingTemplate.convertAndSend("/topic/messages", message);
    }	
}
