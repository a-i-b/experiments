package aib.rpc.consumer;

import org.apache.log4j.Logger;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import aib.rpc.consumer.contract.Reply;
import aib.rpc.producer.contract.Request;

@Component
public class Consumer {
	static Logger logger = Logger.getLogger(Consumer.class);
	
	@RabbitListener(queues = "q.rpc")
    public Reply onMessage(Request message) {
    	String result = "Hallo, " + message.getName();
        
    	logger.info(result);
    	
        try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
        
        Reply replyMessage = new Reply();
        replyMessage.setGreeting(result);
                
		return replyMessage;        
    }
}
