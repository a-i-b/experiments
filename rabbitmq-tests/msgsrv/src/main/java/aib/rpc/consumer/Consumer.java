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
        Reply replyMessage = new Reply();
        replyMessage.setGreeting(result);
                
		return replyMessage;        
    }

	@RabbitListener(queues = "q.hl7")
    public void onHl7(Request message) {
    	String result = "Routed to HL7 Service!!! Hallo, " + message.getName();        
    	logger.info(result);                
    }

	@RabbitListener(queues = "q.dicom")
    public void onDicom(Request message) {
    	String result = "Routed to DICOM Service!!! Hallo, " + message.getName();        
    	logger.info(result);                
    }

	@RabbitListener(queues = "q.c1")
    public void onC1(Request message) {
    	String result = "Routed to C1!!! Hallo, " + message.getName();        
    	logger.info(result);                
    }

	@RabbitListener(queues = "q.c2")
    public void onC2(Request message) {
    	String result = "Routed to C2!!! Hallo, " + message.getName();        
    	logger.info(result);                
    }
}
