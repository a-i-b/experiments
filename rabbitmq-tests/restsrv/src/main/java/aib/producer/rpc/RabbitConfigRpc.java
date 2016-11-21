package aib.producer.rpc;

import org.apache.log4j.Logger;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableRabbit
@Configuration
public class RabbitConfigRpc {
	
	static Logger logger = Logger.getLogger(RabbitConfigRpc.class);
	
	final static String QueueNameRpc = "q.rpc"; 
	
	@Bean
    public ConnectionFactory connectionFactory() {
		CachingConnectionFactory connectionFactory = new CachingConnectionFactory("localhost");
        connectionFactory.setUsername("guest");
        connectionFactory.setPassword("guest");
        return connectionFactory;
    }

    @Bean
    public AmqpAdmin amqpAdmin() {
        return new RabbitAdmin(connectionFactory());
    }

    @Bean
    public MessageConverter jsonMessageConverter(){
        return new JsonMessageConverter();
    }
    
    @Bean
    public RabbitTemplate rabbitRpcTemplate() {
        RabbitTemplate template = new RabbitTemplate(connectionFactory());
        template.setQueue(QueueNameRpc);
        template.setReplyTimeout(30*1000);
        template.setMessageConverter(jsonMessageConverter());
        return template;
    }

    @Bean
    public Queue myQueue() {
       return new Queue(QueueNameRpc);
    }
}
