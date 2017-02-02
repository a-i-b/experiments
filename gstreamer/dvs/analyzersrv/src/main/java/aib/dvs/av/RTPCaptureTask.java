package aib.dvs.av;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.log4j.Logger;
import org.opencv.core.Core;
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
		final double Threshold = 0.05; 
		rtpReceiver.run(data -> {
	    	try {
	    		counter++;
	    		int darkPointCounter = 0; 
	    		if(counter % 5 == 0) {
	    			byte[] bytes = new byte[data.remaining()];
	    			data.get(bytes);
	    			Mat streamImg = Imgcodecs.imdecode(new MatOfByte(bytes), Imgcodecs.IMREAD_UNCHANGED);
	    			Core.normalize(streamImg, streamImg, 1.0, 1.0, Core.NORM_INF);
	    			Mat hsvImg = new Mat();
	    			Imgproc.cvtColor(streamImg, hsvImg, Imgproc.COLOR_RGB2HSV_FULL);
					for( int y = 0; y < hsvImg.rows() - 1; y++ ) { 
						for( int x = 0; x < hsvImg.cols() - 1; x++ ) { 
							double[] point = hsvImg.get(y, x);
							if(point[2] < Threshold)
								darkPointCounter++;
						}
					}
					
//					logger.info("darkPointCounter: " + darkPointCounter + ", 90% of all pixels: " + hsvImg.cols()*hsvImg.rows()*0.9);
					if(darkPointCounter > hsvImg.cols()*hsvImg.rows()*0.95) {
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
