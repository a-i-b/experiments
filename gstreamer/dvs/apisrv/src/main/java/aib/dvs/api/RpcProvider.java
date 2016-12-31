package aib.dvs.api;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aib.dvs.capture.contract.PreviewStateChanged;
import aib.dvs.capture.contract.StartStopPreview;

@RestController
@RequestMapping("/rpc")
public class RpcProvider {
	
	RabbitTemplate rabbitRpcTemplate;
	
	public RpcProvider(RabbitTemplate rabbitRpcTemplate) {
		this.rabbitRpcTemplate = rabbitRpcTemplate;
	}
	
	@RequestMapping("/preview")
    public PreviewStateChanged greeting(@RequestParam(value="isToStart") int isToStart) {		
		StartStopPreview request = new StartStopPreview();
		request.setToStart(isToStart);
		
		PreviewStateChanged reply = (PreviewStateChanged)rabbitRpcTemplate.convertSendAndReceive(RabbitConfigRpc.QueueCapture, request);		
		return reply;
    }
}
