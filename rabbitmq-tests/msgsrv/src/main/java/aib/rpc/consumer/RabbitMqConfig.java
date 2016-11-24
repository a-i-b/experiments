package aib.rpc.consumer;

import org.apache.log4j.Logger;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.support.converter.JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableRabbit
@Configuration
public class RabbitMqConfig {
	
	static Logger logger = Logger.getLogger(RabbitMqConfig.class);
		
    @Bean
    public MessageConverter jsonMessageConverter(){
        return new JsonMessageConverter();
    }
}
