package aib.dvs.capture;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.support.converter.JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import aib.dvs.av.IVideoSevice;
import aib.dvs.av.VideoService;

@EnableRabbit
@Configuration
public class AppConfig {
	
	public static final String QueueNameWs = "q.ws";
	
    @Bean
    public MessageConverter jsonMessageConverter(){
        return new JsonMessageConverter();
    }
    
    @Bean
    public Queue myQueue() {
       return new Queue(QueueNameWs);
    }
    
    @Bean
    public IVideoSevice produceVideeoService() {
    	return new VideoService();
    }
}
