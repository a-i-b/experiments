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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableRabbit
@Configuration
public class RabbitConfigPubsub {
	
	static Logger logger = Logger.getLogger(RabbitConfigPubsub.class);
	
	final static String QueueNameC1 = "q.c1"; 
	final static String QueueNameC2 = "q.c2"; 
	final static String FanoutExchangeName = "exchange_pubsub"; 
	
	@Autowired
	private ConnectionFactory cachingConnectionFactory;

	@Autowired
	private MessageConverter jsonMessageConverter;

    @Bean
    public RabbitTemplate rabbitPubsubTemplate() {
        RabbitTemplate template = new RabbitTemplate(cachingConnectionFactory);
        template.setExchange(FanoutExchangeName);
        template.setReplyTimeout(30*1000);
        template.setMessageConverter(jsonMessageConverter);
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
