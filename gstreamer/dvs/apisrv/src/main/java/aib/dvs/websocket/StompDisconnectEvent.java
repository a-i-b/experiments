package aib.dvs.websocket;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class StompDisconnectEvent implements ApplicationListener<SessionDisconnectEvent> {
	 
	private final Logger logger = Logger.getLogger(StompDisconnectEvent.class);
 
	@Override
	public void onApplicationEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        
        logger.info("Disconnect event [sessionId: " + sha.getSessionId() + "]");
	}    
}