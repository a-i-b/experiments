package aib.producer.routing;

import org.apache.log4j.Logger;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
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
public class RabbitConfigRouting {
	
	static Logger logger = Logger.getLogger(RabbitConfigRouting.class);
	
	final static String QueueNameHl7 = "q.hl7"; 
	final static String QueueNameDicom = "q.dicom"; 
	final static String DirectExchangeName = "exchange_direct"; 
	
	@Autowired
	private ConnectionFactory cachingConnectionFactory;
	
	@Autowired
	private MessageConverter jsonMessageConverter;
	
    @Bean
    public RabbitTemplate rabbitRoutingTemplate() {
        RabbitTemplate template = new RabbitTemplate(cachingConnectionFactory);
        template.setExchange(DirectExchangeName);
        template.setReplyTimeout(30*1000);
        template.setMessageConverter(jsonMessageConverter);
        return template;
    }

    @Bean
    public DirectExchange directExchange(){
        return new DirectExchange(DirectExchangeName);
    }       

    @Bean
    public Queue QueueNameHl7() {
       return new Queue(QueueNameHl7);
    }

    @Bean
    public Queue QueueNameDicom() {
       return new Queue(QueueNameDicom);
    }
    
    @Bean
    public Binding binding1r(){
        return BindingBuilder.bind(QueueNameHl7()).to(directExchange()).with("hl7");
    }

    @Bean
    public Binding binding2r(){
        return BindingBuilder.bind(QueueNameDicom()).to(directExchange()).with("dicom");
    }
}
