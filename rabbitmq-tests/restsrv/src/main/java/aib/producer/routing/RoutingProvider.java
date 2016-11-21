package aib.producer.routing;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aib.rpc.producer.contract.Request;

@RestController
@RequestMapping("/routing")
public class RoutingProvider {
	
	@Autowired
    ApplicationContext context;
	
	@RequestMapping("/call/{srv}")
	public void publisher(@PathVariable("srv") String srv, @RequestParam(value="name", defaultValue="World") String name) {
		Request request = new Request();
		request.setName(name);
		RabbitTemplate rabbitTemplate = (RabbitTemplate) context.getBean("rabbitRoutingTemplate");
		rabbitTemplate.convertAndSend(srv, request);
	}
}
