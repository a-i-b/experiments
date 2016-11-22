package aib.producer.rpc;

import org.springframework.amqp.support.converter.JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(scanBasePackages = {"aib.producer.rpc", "aib.producer.pubsub", "aib.producer.routing"})
public class RestsrvApplication {
	
	@Bean
    public MessageConverter jsonMessageConverter(){
        return new JsonMessageConverter();
    }
	
	public static void main(String[] args) {
		SpringApplication.run(RestsrvApplication.class, args);
	}
}
