package aib.rpc.consumer;

import org.apache.log4j.Logger;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableRabbit
@Configuration
public class RabbitMqConfig {
	
	static Logger logger = Logger.getLogger(RabbitMqConfig.class);
	
	public static String RpcQueueName = "q.rpc"; 
	
	@Autowired
	private ConnectionFactory cachingConnectionFactory;
	
    @Bean
    public MessageConverter jsonMessageConverter(){
        return new JsonMessageConverter();
    }
/*    
    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate template = new RabbitTemplate(cachingConnectionFactory);
        template.setQueue(RpcQueueName);
        template.setReplyTimeout(30*1000);
        template.setMessageConverter(jsonMessageConverter());
        return template;
    }

    @Bean
    public Queue myQueue() {
       return new Queue(RpcQueueName);
    }	
*/
}
