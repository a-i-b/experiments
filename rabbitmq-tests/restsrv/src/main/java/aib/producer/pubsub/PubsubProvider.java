package aib.producer.pubsub;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aib.rpc.producer.contract.Request;

@RestController
@RequestMapping("/pubsub")
public class PubsubProvider {
	
	@Autowired
    ApplicationContext context;
	
	@RequestMapping("/call")
	public void publisher(@RequestParam(value="name", defaultValue="World") String name) {
		Request request = new Request();
		request.setName(name);
		RabbitTemplate rabbitTemplate = (RabbitTemplate) context.getBean("rabbitPubsubTemplate");
		rabbitTemplate.convertAndSend(request);
	}
}
