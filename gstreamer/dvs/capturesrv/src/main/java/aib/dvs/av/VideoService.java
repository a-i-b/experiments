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

	private VideoServiceData data = new VideoServiceData();


	public VideoService() {
		Gst.init("Video streaming service", new String[]{});		
	}

	@Override
	public boolean startStream(String resolution, int channel, int port) {
		if(data.pipe != null)
			return true;

		try {
	        String resData[] = resolution.split("(x)|(\\@)");
	        	    	
	        String caps = "video/x-raw, width=" + resData[0] + ", height=" + resData[1] + ", framerate="+resData[2] + "/1";

	        String readPipe = isWindows() ? "ksvideosrc" : "v4l2src";
	        readPipe += " ! " + "capsfilter caps=\"" + caps + "\"";
	    	Bin readBin =  Bin.launch(readPipe, true);
	    	
	    	data.tee = ElementFactory.make("tee", "tp");
	    		
	    	String rtpLine = "queue leaky=1";
	    	rtpLine += " ! " + "jpegenc";
	    	rtpLine += " ! " + "rtpjpegpay";
	    	rtpLine += " ! " + "udpsink buffer-size=10000000 host=127.0.0.1 port=" + port + " sync = false";
	    	Bin rtpBin = Bin.launch(rtpLine, true);
	    	
	    	data.pipe = new Pipeline();
	    	data.pipe.addMany(readBin, data.tee, rtpBin);
	    	
	    	readBin.link(data.tee);
	    	data.tee.link(rtpBin);
	    	
	   
	    	StateChangeReturn ret = data.pipe.play();
			
	    	return true;
		} catch(Exception ex) {
			return false;		
		}		
	}

	@Override
	public boolean stopStream(int port) {
		if(data.pipe == null)
			return true;
		try {
			StateChangeReturn ret = data.pipe.stop();
			data.pipe = null;
	    	return true;
		} catch(Exception ex) {
			return false;		
		}		
	}
	
	public boolean startCapturing(String fileName) {
    	if(data.pipe != null) {	    		    	
	    	String pipeLine = "queue";
        	pipeLine += " ! x264enc ! mp4mux ! filesink location=~/Videos/" + fileName;
        	data.binMp4 = Bin.launch(pipeLine, true);
    		data.pipe.add(data.binMp4);
    		data.tee.link(data.binMp4);
    	}
    	
		return true;
	}
		
	public boolean stopCapturing() {
    	if(data.pipe != null && data.binMp4 != null) {
    		data.pipe.remove(data.binMp4);
    		data.binMp4 = null;
    	}
		return true;
	}

	private boolean isWindows() {
		return System.getProperty("os.name").contains("Windows");		
	}
}
