package aib.producer.rpc;

import javax.annotation.Resource;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aib.rpc.consumer.contract.Reply;
import aib.rpc.producer.contract.Request;

@RestController
@RequestMapping("/rpc")
public class RpcProvider {
	
	@Resource
	RabbitTemplate rabbitRpcTemplate;
	
	@RequestMapping("/call")
    public String greeting(@RequestParam(value="name", defaultValue="World") String name) {		
		Request request = new Request();
		request.setName(name);
		
		String result;
		
		try {
			Reply reply = (Reply)rabbitRpcTemplate.convertSendAndReceive(RabbitConfigRpc.QueueNameRpc, request);
			result = reply.getGreeting();
		} catch(Exception e) {
			result = e.getMessage();
		}
		
		return result;
    }
}
