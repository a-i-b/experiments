package aib.producer.rpc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"aib.producer.rpc", "aib.producer.pubsub"})
public class RestsrvApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(RestsrvApplication.class, args);
	}
}
