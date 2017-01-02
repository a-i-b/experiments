package aib.dvs.api;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aib.dvs.capture.contract.ICommand;
import aib.dvs.capture.contract.PreviewStateChanged;
import aib.dvs.capture.contract.StartPreview;
import aib.dvs.capture.contract.StopPreview;

@RestController
@RequestMapping("/rpc")
public class RpcProvider {
	
	RabbitTemplate rabbitRpcTemplate;
	
	public RpcProvider(RabbitTemplate rabbitRpcTemplate) {
		this.rabbitRpcTemplate = rabbitRpcTemplate;
	}
	
	@RequestMapping("/preview")
    public PreviewStateChanged preview(@RequestParam(value="isToStart") Boolean isToStart, 
    		@RequestParam(value="resolution") String resolution) {		
		
		ICommand request = null;
		if(isToStart) {
			StartPreview startRequest = new StartPreview();
			startRequest.setResolution(resolution);
			request = startRequest;
		} else {
			request = new StopPreview();
		}
		
		PreviewStateChanged reply = (PreviewStateChanged)rabbitRpcTemplate.convertSendAndReceive(RabbitConfigRpc.QueueCapture, request);		
		return reply;
    }
}
