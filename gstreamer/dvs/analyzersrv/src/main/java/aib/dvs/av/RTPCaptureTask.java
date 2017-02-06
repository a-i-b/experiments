package aib.dvs.av;

import org.apache.log4j.Logger;
import org.opencv.core.Core;
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
		final double Threshold = 40; 
		rtpReceiver.run(data -> {
	    	try {
	    		counter++;
	    		int darkPointCounter = 0;
	    		if(counter % 5 == 0) {
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
						logger.info("The image is dark");
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
