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
	public boolean StartStream(String resolution, int channel, int port) {
		if(pipe != null)
			return true;

		try {
	        String resData[] = resolution.split("(x)|(\\@)");
	        final Element videosrc = ElementFactory.make("v4l2src", "source");
	        final Element videofilter = ElementFactory.make("capsfilter", "filter");
	        String caps = "video/x-raw, width=" + resData[0] + ", height=" + resData[1] + ", framerate="+resData[2] + "/1";
	        videofilter.setCaps(Caps.fromString(caps));
	    	Bin binCodec = Bin.launch("jpegenc", true);
//	    	Bin binCodec = Bin.launch("jpegenc quality=95", true);
	    	Bin binRtp = Bin.launch("rtpjpegpay", true);
	    	Bin binUdp = Bin.launch("udpsink host=127.0.0.1 port=5200", true);
	    	pipe = new Pipeline();
	    	pipe.addMany(videosrc, videofilter, binCodec, binRtp, binUdp);
	    	Pipeline.linkMany(videosrc, videofilter, binCodec, binRtp, binUdp);
	   
	    	StateChangeReturn ret = pipe.play();
			
	    	return true;
		} catch(Exception ex) {
			return false;		
		}		
	}

	@Override
	public boolean StopStream(int port) {
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
}
