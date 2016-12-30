package aib.dvs.api;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aib.dvs.capture.contract.Reply;
import aib.dvs.capture.contract.Request;

@RestController
@RequestMapping("/rpc")
public class RpcProvider {
	
	RabbitTemplate rabbitRpcTemplate;
	
	public RpcProvider(RabbitTemplate rabbitRpcTemplate) {
		this.rabbitRpcTemplate = rabbitRpcTemplate;
	}
	
	@RequestMapping("/call")
    public Reply greeting(@RequestParam(value="name", defaultValue="World") String name) {		
		Request request = new Request();
		request.setName(name);
		
		Reply reply = (Reply)rabbitRpcTemplate.convertSendAndReceive(RabbitConfigRpc.QueueNameRpc, request);		
		return reply;
    }
}
