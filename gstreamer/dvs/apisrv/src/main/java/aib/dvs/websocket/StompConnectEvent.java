package aib.dvs.websocket;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

@Component
public class StompConnectEvent implements ApplicationListener<SessionConnectEvent> {
	 
	private final Logger logger = Logger.getLogger(StompConnectEvent.class);
 
    public void onApplicationEvent(SessionConnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
 
        String  versions = sha.getNativeHeader("accept-version").get(0);
        logger.info("Connect event [sessionId: " + sha.getSessionId() +"; versions: "+ versions + " ]");
    }    
}