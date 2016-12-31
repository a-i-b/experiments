package aib.dvs.api;

import org.apache.log4j.Logger;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableRabbit
@Configuration
public class RabbitConfigRpc {
	
	static Logger logger = Logger.getLogger(RabbitConfigRpc.class);
	
	final static String QueueCapture = "q.capture"; 

	@Autowired
	private ConnectionFactory cachingConnectionFactory;
	
	@Autowired
	private MessageConverter jsonMessageConverter;

    
    @Bean
    public RabbitTemplate rabbitRpcTemplate() {
        RabbitTemplate template = new RabbitTemplate(cachingConnectionFactory);
        template.setQueue(QueueCapture);
        template.setReplyTimeout(30*1000);
        template.setMessageConverter(jsonMessageConverter);
        return template;
    }

    @Bean
    public Queue myQueue() {
       return new Queue(QueueCapture);
    }
}
