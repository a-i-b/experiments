package aib.dvs.av;

import java.nio.ByteBuffer;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.function.Consumer;

import org.apache.log4j.Logger;
import org.freedesktop.gstreamer.Bin;
import org.freedesktop.gstreamer.Buffer;
import org.freedesktop.gstreamer.Caps;
import org.freedesktop.gstreamer.Element;
import org.freedesktop.gstreamer.ElementFactory;
import org.freedesktop.gstreamer.FlowReturn;
import org.freedesktop.gstreamer.Gst;
import org.freedesktop.gstreamer.Pipeline;
import org.freedesktop.gstreamer.Sample;
import org.freedesktop.gstreamer.StateChangeReturn;
import org.freedesktop.gstreamer.elements.AppSink;

public class RTPReceiver implements IRTPReceiver {
	static Logger logger = Logger.getLogger(RTPReceiver.class);

	private final Lock bufferLock = new ReentrantLock();
	
	private Pipeline pipe;

	public RTPReceiver() {
		Gst.init("RTPReceiver", new String[]{});	
	}
	
	@Override
	public boolean Start(Consumer<char[]> callback) {
		if(pipe != null)
			return true;

		try {
	    	Bin src = Bin.launch("udpsrc multicast-group=127.0.0.1 auto-multicast=true port=5200", true);
	        final Element videofilter = ElementFactory.make("capsfilter", "filter");
	        String caps = "vapplication/x-rtp,encoding-name=JPEG,payload=96";
	        videofilter.setCaps(Caps.fromString(caps));
	    	Bin depay = Bin.launch("rtpjpegdepay", true);
	    	
	    	final AppSink  appsink = (AppSink)ElementFactory.make("appsink", "sink");
	    	appsink.set("emit-signals", true);
	    	appsink.set("sync", true);
	    	appsink.connect(new AppSink.NEW_SAMPLE() {				
				public FlowReturn newSample(AppSink elem) {
					Sample sample = elem.pullSample();
					Buffer buffer = sample.getBuffer();
					ByteBuffer bb = buffer.map(false);
		            if (bb != null) {
		            	bufferLock.lock();
		            	try {
		            		callback.accept(bb.asCharBuffer().array());
		            	} finally {
		            		bufferLock.unlock();
		            		buffer.unmap();
		            	}
		            }
		            sample.dispose();
		            return FlowReturn.OK;
				}
			});
	        
	    	pipe = new Pipeline();
	    	pipe.addMany(src, videofilter, depay, appsink);
	    	Pipeline.linkMany(src, videofilter, depay, appsink);
	   
	    	StateChangeReturn ret = pipe.play();
			
	    	return true;
		} catch(Exception ex) {
			return false;		
		}		
	}

	@Override
	public boolean Stop() {
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
