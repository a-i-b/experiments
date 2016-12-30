package aib.dvs.capture;

import org.apache.log4j.Logger;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;

import aib.dvs.capture.contract.Reply;
import aib.dvs.capture.contract.Request;

@Component
public class Consumer {
	static Logger logger = Logger.getLogger(Consumer.class);
	
	RabbitTemplate rabbitTemplate;
	
	public Consumer(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}
	
	@RabbitListener(queues = "q.rpc")
    public Reply onMessage(Request message) {
    	String result = "Hallo, " + message.getName();        
    	logger.info(result);    	
        Reply replyMessage = new Reply();
        replyMessage.setGreeting(result);
                
		return replyMessage;        
    }

	@RabbitListener(queues = "q.hl7")
	@SendTo(RabbitMqConfig.QueueNameWs)
    public Reply onHl7(Request message) {
    	String result = "Routed to HL7 Service!!! Hallo, " + message.getName();        
    	logger.info(result);                

    	Reply replyMessage = new Reply();
        replyMessage.setGreeting(result);
        return replyMessage;
    }

	@RabbitListener(queues = "q.dicom")
	@SendTo(RabbitMqConfig.QueueNameWs)
    public Reply onDicom(Request message) {
    	String result = "Routed to DICOM Service!!! Hallo, " + message.getName();        
    	logger.info(result);
    	
        Reply replyMessage = new Reply();
        replyMessage.setGreeting(result);
        return replyMessage;
    }

	@RabbitListener(queues = "q.c1")
	@SendTo(RabbitMqConfig.QueueNameWs)
    public Reply onC1(Request message) {
    	String result = "Routed to C1!!! Hallo, " + message.getName();        
    	logger.info(result);                

    	Reply replyMessage = new Reply();
        replyMessage.setGreeting(result);
        return replyMessage;
	}

	@RabbitListener(queues = "q.c2")
	@SendTo(RabbitMqConfig.QueueNameWs)
    public Reply onC2(Request message) {
    	String result = "Routed to C2!!! Hallo, " + message.getName();        
    	logger.info(result);                

    	Reply replyMessage = new Reply();
        replyMessage.setGreeting(result);
        return replyMessage;
    }
}
