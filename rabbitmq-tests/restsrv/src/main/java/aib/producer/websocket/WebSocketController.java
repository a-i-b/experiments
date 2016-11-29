package aib.producer.websocket;

import org.apache.log4j.Logger;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;

import aib.rpc.consumer.contract.Reply;

@Component
public class WebSocketController {
	static Logger logger = Logger.getLogger(WebSocketController.class);

	@SendTo("/topic/messages")
	@RabbitListener(queues = "q.ws")
    public Reply onNewMessage(Reply message) {
    	logger.info(message.getGreeting());    	
    	return message;
    }	
}
