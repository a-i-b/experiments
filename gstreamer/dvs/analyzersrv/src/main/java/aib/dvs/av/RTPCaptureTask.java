package aib.dvs.av;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;
import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.videoio.VideoCapture;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import aib.dvs.analyzer.AppConfig;
import aib.dvs.capture.contract.AnalyzerEvent;

@Service
public class RTPCaptureTask implements Runnable {
	static Logger logger = Logger.getLogger(RTPCaptureTask.class);
	
	private RabbitTemplate rabbitRpcTemplate;
	private IRTPReceiver rtpReceiver;
	
	private long frameCounter = 0;
	private long darkCounter = 0;
	private long brightCounter = 0;
	
	private SimpleDateFormat sdp = new SimpleDateFormat("dd.mm.yyyy hh:MM:ss");
	
	private boolean currentState = false;

	public RTPCaptureTask(RabbitTemplate rabbitRpcTemplate, IRTPReceiver rtpReceiver) {
		this.rabbitRpcTemplate = rabbitRpcTemplate;
		this.rtpReceiver = rtpReceiver;
	}
	
	@Override
	public void run() {
		final double Threshold = 40; 
		rtpReceiver.run(data -> {
	    	try {
	    		frameCounter++;
	    		int darkPointCounter = 0;
	    		if(frameCounter % 5 == 0) {
	    			byte[] bytes = new byte[data.remaining()];
	    			data.get(bytes);
	    			Mat streamImg = Imgcodecs.imdecode(new MatOfByte(bytes), Imgcodecs.IMREAD_UNCHANGED);
	    			Mat grayImg = new Mat();
	    			Imgproc.cvtColor(streamImg, grayImg, Imgproc.COLOR_RGB2GRAY);
					for( int y = 0; y < grayImg.rows() - 1; y++ ) { 
						for( int x = 0; x < grayImg.cols() - 1; x++ ) { 
							double[] point = grayImg.get(y, x);
							if(point[0] < Threshold)
								darkPointCounter++;
						}
					}
					
					if(darkPointCounter > (int)(grayImg.cols()*grayImg.rows()*0.90)) {
						brightCounter = 0;
						darkCounter++;
						if(darkCounter > 3 && !currentState) {
							logger.info("The image is dark");
							AnalyzerEvent event = new AnalyzerEvent();
							event.setEventText("Image is dark");
							event.setEventTime(sdp.format(new Date()));
							rabbitRpcTemplate.convertAndSend(AppConfig.QueueNameWs, event);
							currentState = true;
						}
					} else {
						darkCounter = 0;
						brightCounter++;
						if(brightCounter > 3 && currentState) {
							logger.info("The image is bright");
							AnalyzerEvent event = new AnalyzerEvent();
							event.setEventText("Image is bright");
							event.setEventTime(sdp.format(new Date()));
							rabbitRpcTemplate.convertAndSend(AppConfig.QueueNameWs, event);
							currentState = false;
						}						
					}
	    		}
	
	    		return false;				
			} catch (Exception e) {
				e.printStackTrace();
				return true;
			}
	    });	    
		
		while(!rtpReceiver.isErrorOnStream()) {
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		rtpReceiver.stop();
	}

}
