package aib.dvs.analyzer;

import org.opencv.core.Core;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(scanBasePackages = {"aib.dvs.av", "aib.dvs.analyzer"})
public class MsgsrvApplication {

	static{ System.loadLibrary(Core.NATIVE_LIBRARY_NAME); }
	
	public static void main(String[] args) {
		SpringApplication.run(MsgsrvApplication.class, args);
	}
}
