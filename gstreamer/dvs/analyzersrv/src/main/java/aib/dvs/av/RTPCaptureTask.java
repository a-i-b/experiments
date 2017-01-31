package aib.dvs.av;

import org.apache.log4j.Logger;
import org.opencv.core.Mat;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.videoio.VideoCapture;
import org.springframework.stereotype.Service;

@Service
public class RTPCaptureTask implements Runnable {
	static Logger logger = Logger.getLogger(RTPCaptureTask.class);
	VideoCapture capture;
	
	@Override
	public void run() {
		capture = new VideoCapture();
		capture.open("rtp://224.1.1.1:5200");
		
		if(!capture.isOpened()) {
			logger.error("Can not open rtp stream!");
			return;
		}

		Mat image=new Mat();
		
		for(;;) {
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}

			if(capture.read(image)) {
				
				Imgcodecs.imwrite("d:\\Videos\\" + System.currentTimeMillis() + ".jpg", image);
			}
		}
		
//		capture.release();
	}

}
