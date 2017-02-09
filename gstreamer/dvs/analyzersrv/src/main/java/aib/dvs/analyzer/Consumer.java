package aib.dvs.analyzer;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
	static Logger logger = Logger.getLogger(Consumer.class);
	
	private TaskExecutor taskExecutor;

	public Consumer(TaskExecutor taskExecutor, @Autowired Runnable task) {
		this.taskExecutor = taskExecutor;
		this.taskExecutor.execute(task);
	}	
}
