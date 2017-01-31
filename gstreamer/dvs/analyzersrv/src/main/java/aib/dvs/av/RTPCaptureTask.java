package aib.dvs.av;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.log4j.Logger;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.videoio.VideoCapture;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class RTPCaptureTask implements Runnable {
	static Logger logger = Logger.getLogger(RTPCaptureTask.class);
	
	private VideoCapture capture;	
	private RabbitTemplate rabbitRpcTemplate;
	private IRTPReceiver rtpReceiver;
	
	private long counter = 0;

	public RTPCaptureTask(RabbitTemplate rabbitRpcTemplate, IRTPReceiver rtpReceiver) {
		this.rabbitRpcTemplate = rabbitRpcTemplate;
		this.rtpReceiver = rtpReceiver;
	}
	
	@Override
	public void run() {
		final double Threshold = 15.0; 
		rtpReceiver.run(data -> {
	    	try {
	    		counter++;
	    		int brightnessCounter = 0; 
	    		if(counter % 5 == 0) {
	    			byte[] bytes = new byte[data.remaining()];
	    			data.get(bytes);
	    			Mat streamImg = Imgcodecs.imdecode(new MatOfByte(bytes), Imgcodecs.IMREAD_UNCHANGED);
	    			Mat hsvImg = new Mat();	    			
	    			Imgproc.cvtColor(streamImg, hsvImg, Imgproc.COLOR_RGB2HSV);
					for( int y = 0; y < hsvImg.rows() - 1; y++ ) { 
						for( int x = 0; x < hsvImg.cols() - 1; x++ ) { 
							double[] point = hsvImg.get(y, x);
							if(point[0] < Threshold && point[1] < Threshold && point[2] < Threshold)
								brightnessCounter++;
						}
					}
					
					logger.info("brightnessCounter: " + brightnessCounter);
					if(brightnessCounter > hsvImg.cols()*hsvImg.rows()*0.9) {
						logger.info("The image is dark");
					}
//	    			Imgcodecs.imwrite("d:\\Videos\\" + System.currentTimeMillis() + ".jpg", image);
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
