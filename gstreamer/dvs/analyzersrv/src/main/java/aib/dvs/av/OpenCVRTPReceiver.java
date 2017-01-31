package aib.dvs.av;

import org.opencv.videoio.VideoCapture;

public class OpenCVRTPReceiver {
	VideoCapture capture;
	
	public OpenCVRTPReceiver() {
		capture = new VideoCapture();
		capture.open("udp://@224.1.1.1:5200");
	}
}
