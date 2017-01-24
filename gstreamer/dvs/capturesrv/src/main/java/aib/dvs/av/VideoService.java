																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																											package aib.dvs.av;

import java.util.List;
import java.util.stream.Stream;

import org.apache.log4j.Logger;
import org.freedesktop.gstreamer.Bin;
import org.freedesktop.gstreamer.Bus;
import org.freedesktop.gstreamer.Bus.EOS;
import org.freedesktop.gstreamer.Element;
import org.freedesktop.gstreamer.ElementFactory;
import org.freedesktop.gstreamer.GhostPad;
import org.freedesktop.gstreamer.Gst;
import org.freedesktop.gstreamer.GstObject;
import org.freedesktop.gstreamer.Message;
import org.freedesktop.gstreamer.MessageType;
import org.freedesktop.gstreamer.Pad;
import org.freedesktop.gstreamer.Pipeline;
import org.freedesktop.gstreamer.State;
import org.freedesktop.gstreamer.StateChangeReturn;
import org.freedesktop.gstreamer.lowlevel.GstBusAPI;
import org.freedesktop.gstreamer.lowlevel.GstEventAPI;
import org.freedesktop.gstreamer.message.EOSMessage;

public class VideoService implements IVideoSevice, EOS {
	static Logger logger = Logger.getLogger(VideoService.class);

	private VideoServiceData data = new VideoServiceData();

	private List<Pad> pads;
	
	public VideoService() {
		Gst.init("Video streaming service", new String[]{ "--gst-debug=2", "--gst-debug-no-color" });		
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
	    	readBin.setName("readBin");
	    	
	    	data.tee = ElementFactory.make("tee", "tp");
	    		
	    	String rtpLine = "queue leaky=1 name=rtpQueue";
	    	rtpLine += " ! " + "jpegenc";
	    	rtpLine += " ! " + "rtpjpegpay";
	    	rtpLine += " ! " + "udpsink buffer-size=10000000 host=127.0.0.1 port=" + port + " sync = false";
	    	Bin rtpBin = Bin.launch(rtpLine, true);
	    	rtpBin.setName("rtpBin");
	    		    	
	    	String pipeLine = "queue name=captureQueue" + (isWindows() ? " ! videoconvert" : "");
        	pipeLine += " ! video/x-raw, format=I420";
	    	String savePath = isWindows() ? "d:/captured.mp4" : "~/Videos/captured.mp4";
        	pipeLine += " ! x264enc ! mp4mux ! filesink name=fs location=" + savePath;
        	data.binMp4 = Bin.launch(pipeLine, true);
        	data.binMp4.setName("binMp4");
        	       	
	    	data.pipe = new Pipeline();
	    	data.pipe.addMany(readBin, data.tee, rtpBin, data.binMp4);
	    	
	    	if(!Pipeline.linkMany(readBin, data.tee)) throw new Exception("Can not link");
	    	    		
	    	Pad teeSrc0 = data.tee.getRequestPad("src_%u");
	    	Pad rtpSink = rtpBin.getStaticPad("sink");	    	    	
	    	teeSrc0.link(rtpSink);
	    		    		    	    	
	    	Pad teeSrc1 = data.tee.getRequestPad("src_%u");
	    	Pad captureSink = data.binMp4.getStaticPad("sink");
	    	teeSrc1.link(captureSink);
	    	
	    	pads = data.tee.getSrcPads();
	    	
	    	inspect(data.pipe);
	    	
	    	data.pipe.getBus().connect(this);

	    	StateChangeReturn ret = data.pipe.play();			
	    	if(ret == StateChangeReturn.ASYNC || ret == StateChangeReturn.SUCCESS) {
    			return true;
    		}
    		
    		logger.error("Pipeline play() returnd " + ret.name());
	    	return false;
		} catch(Exception ex) {
			logger.error(ex);
			return false;		
		}		
	}

	@Override
	public boolean stopStream(int port) {
		if(data.pipe == null)
			return true;
		try {
//			pads.stream().forEach(pad -> data.tee.releaseRequestPad(pad));
			
			data.pipe.sendEvent(GstEventAPI.GSTEVENT_API.gst_event_new_eos());
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
    		data.binMp4.play();
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
	
	private static void inspect(Pipeline pipe) {
		for (Element elt : pipe.getElements()) {
			System.out.println(elt.getName());
			for (Pad pad : elt.getSinkPads()) {
				if (pad.getPeer() == null) {
					System.out.println("\tSink pad: " + pad.getName()
							+ " DISCONNECTED");
				} else {
					System.out
							.println("\tSink pad: " + pad.getName()
									+ " connected to peer parent="
									+ pad.getPeer().getParent() + " / "
									+ pad.getPeer());
				}
			}
			for (Pad pad : elt.getSrcPads()) {
				if (pad.getPeer() == null) {
					System.out.println("\tSink pad: " + pad.getName()
							+ " DISCONNECTED");
				} else {
					System.out
							.println("\tSrc pad: " + pad.getName()
									+ " connected to peer parent="
									+ pad.getPeer().getParent() + " / "
									+ pad.getPeer());
				}
			}
		}

		pipe.debugToDotFile(Pipeline.DEBUG_GRAPH_SHOW_ALL, "test");
	}

	@Override
	public void endOfStream(GstObject go) {
		logger.info("Got EOS from " + go.getName());
		data.pipe.setState(State.PAUSED);
		data.pipe.setState(State.READY);
		StateChangeReturn ret = data.pipe.stop();
		data.pipe.dispose();
		data.pipe = null;
	}
}
