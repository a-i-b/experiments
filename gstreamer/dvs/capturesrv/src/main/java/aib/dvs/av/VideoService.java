package aib.dvs.av;

import org.apache.log4j.Logger;
import org.freedesktop.gstreamer.Bin;
import org.freedesktop.gstreamer.Caps;
import org.freedesktop.gstreamer.Element;
import org.freedesktop.gstreamer.ElementFactory;
import org.freedesktop.gstreamer.Gst;
import org.freedesktop.gstreamer.Pipeline;
import org.freedesktop.gstreamer.StateChangeReturn;

public class VideoService implements IVideoSevice {
	static Logger logger = Logger.getLogger(VideoService.class);

	private Pipeline pipe;

	public VideoService() {
		Gst.init("Video streaming service", new String[]{});		
	}

	@Override
	public boolean startStream(String resolution, int channel, int port) {
		if(pipe != null)
			return true;

		try {
	        String resData[] = resolution.split("(x)|(\\@)");
	        	    	
	        String caps = "video/x-raw, width=" + resData[0] + ", height=" + resData[1] + ", framerate="+resData[2] + "/1";

	        String pipeLine = isWindows() ? "ksvideosrc" : "v4l2src";
	    	pipeLine += " ! " + "capsfilter caps=\"" + caps + "\"";
	    	pipeLine += " ! " + "queue";
	    	pipeLine += " ! " + "jpegenc";
	    	pipeLine += " ! " + "rtpjpegpay";
	    	pipeLine += " ! " + "udpsink host=127.0.0.1 port=" + port;
	    	Bin binRtp = Bin.launch(pipeLine, true);
	    	
	    	pipe = new Pipeline();
	    	pipe.add(binRtp);
	   
	    	StateChangeReturn ret = pipe.play();
			
	    	return true;
		} catch(Exception ex) {
			return false;		
		}		
	}

	@Override
	public boolean stopStream(int port) {
		if(pipe == null)
			return true;
		try {
			StateChangeReturn ret = pipe.stop();
			pipe = null;
	    	return true;
		} catch(Exception ex) {
			return false;		
		}		
	}
	
	private boolean isWindows() {
		return System.getProperty("os.name").contains("Windows");		
	}
}
