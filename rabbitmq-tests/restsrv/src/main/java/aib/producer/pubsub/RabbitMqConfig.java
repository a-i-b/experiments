package aib.producer.pubsub;

import org.apache.log4j.Logger;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
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
public class RabbitMqConfig {
	
	static Logger logger = Logger.getLogger(RabbitMqConfig.class);
	
	final static String QueueNameC1 = "q.c1"; 
	final static String QueueNameC2 = "q.c2"; 
	final static String FanoutExchangeName = "exchange_pubsub"; 
	
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
    public RabbitTemplate rabbitPubsubTemplate() {
        RabbitTemplate template = new RabbitTemplate(connectionFactory());
        template.setExchange(FanoutExchangeName);
        template.setReplyTimeout(30*1000);
        template.setMessageConverter(jsonMessageConverter());
        return template;
    }

    @Bean
    public FanoutExchange fanoutExchange(){
        return new FanoutExchange(FanoutExchangeName);
    }       

    @Bean
    public Queue QueueNameC1() {
       return new Queue(QueueNameC1);
    }

    @Bean
    public Queue QueueNameC2() {
       return new Queue(QueueNameC2);
    }
    
    @Bean
    public Binding binding1(){
        return BindingBuilder.bind(QueueNameC1()).to(fanoutExchange());
    }

    @Bean
    public Binding binding2(){
        return BindingBuilder.bind(QueueNameC2()).to(fanoutExchange());
    }
}
