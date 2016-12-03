package aib.producer.websocket;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.socket.messaging.SessionConnectEvent;

public class StompConnectEvent implements ApplicationListener<SessionConnectEvent> {
	 
	private final Logger logger = Logger.getLogger(StompConnectEvent.class);
 
    public void onApplicationEvent(SessionConnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
 
        String  company = sha.getNativeHeader("company").get(0);
        logger.debug("Connect event [sessionId: " + sha.getSessionId() +"; company: "+ company + " ]");
    }
}