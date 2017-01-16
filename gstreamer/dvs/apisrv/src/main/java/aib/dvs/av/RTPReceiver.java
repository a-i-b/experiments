package aib.dvs.av;

import java.nio.ByteBuffer;
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
import org.freedesktop.gstreamer.Structure;
import org.freedesktop.gstreamer.elements.AppSink;
import org.springframework.stereotype.Service;

@Service
public class RTPReceiver implements IRTPReceiver {
	static Logger logger = Logger.getLogger(RTPReceiver.class);
	
	private Pipeline pipe;

	public RTPReceiver() {
		Gst.init("RTPReceiver", new String[]{});	
	}
	
	@Override
	public boolean run(Consumer<ByteBuffer> callback) {
		if(pipe != null) {
			stop();
		}
						
		try {
	    	Bin src = Bin.launch("udpsrc port=5200", true);
	        final Element videofilter = ElementFactory.make("capsfilter", "filter");
	        String caps = "application/x-rtp,encoding-name=JPEG,framerate=30/1";
	        videofilter.setCaps(Caps.fromString(caps));
	    	Bin depay = Bin.launch("rtpjpegdepay", true);
	    	
	    	final AppSink  appsink = (AppSink)ElementFactory.make("appsink", "sink");
	    	appsink.set("emit-signals", true);
	    	appsink.set("sync", false);
	    	appsink.connect(new AppSink.NEW_SAMPLE() {				
				public FlowReturn newSample(AppSink elem) {
					Sample sample = null;
					Buffer buffer = null;
	            	try {
						sample = elem.pullSample();
						buffer = sample.getBuffer();
						ByteBuffer bb = buffer.map(false);
			            if (bb != null) {	
			            	logger.info("RTP packet is received");
		            		callback.accept(bb);
			            }
	            	} catch (Exception e) {
	            		e.printStackTrace();
		            } finally {
	            		buffer.unmap();
			            sample.dispose();
		            }
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
	public boolean stop() {
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
