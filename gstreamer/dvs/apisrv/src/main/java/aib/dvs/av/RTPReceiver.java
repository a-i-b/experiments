package aib.dvs.av;

import java.nio.ByteBuffer;
import java.util.function.Function;

import org.apache.log4j.Logger;
import org.freedesktop.gstreamer.Bin;
import org.freedesktop.gstreamer.Buffer;
import org.freedesktop.gstreamer.ElementFactory;
import org.freedesktop.gstreamer.FlowReturn;
import org.freedesktop.gstreamer.Gst;
import org.freedesktop.gstreamer.Pipeline;
import org.freedesktop.gstreamer.Sample;
import org.freedesktop.gstreamer.StateChangeReturn;
import org.freedesktop.gstreamer.elements.AppSink;
import org.springframework.stereotype.Service;

@Service
public class RTPReceiver implements IRTPReceiver {
	static Logger logger = Logger.getLogger(RTPReceiver.class);
	
	private Pipeline pipe;
	
	private boolean errorOnStream;

	public RTPReceiver() {
		Gst.init("RTPReceiver", new String[]{});	
	}
	
	@Override
	public boolean run(Function<ByteBuffer, Boolean> callback) {
		if(pipe != null) {
			stop();
		}
		
		setErrorOnStream(false);

		try {
			Bin rtpBin = Bin.launch("udpsrc buffer-size=10000000 auto-multicast=true multicast-group=224.1.1.1 port=5200 ! application/x-rtp,encoding-name=(string)JPEG,framerate=30/1 ! queue ! rtpjpegdepay", true);
	    	
	    	final AppSink  appsink = (AppSink)ElementFactory.make("appsink", "sink");
	    	appsink.set("emit-signals", true);
//	    	appsink.set("sync", false);
	    	appsink.connect(new AppSink.NEW_SAMPLE() {				
				public FlowReturn newSample(AppSink elem) {
					Sample sample = null;
					Buffer buffer = null;
	            	try {
						sample = elem.pullSample();
						buffer = sample.getBuffer();
						ByteBuffer bb = buffer.map(false);
			            if (bb != null) {	
			        		setErrorOnStream(callback.apply(bb));		            			
			            }
	            	} catch (Exception e) {
	            		e.printStackTrace();
	            		setErrorOnStream(true);
		            } finally {
	            		if(buffer != null)
	            			buffer.unmap();
	            		if(sample != null)
	            			sample.dispose();
		            }
		            return FlowReturn.OK;
				}
			});
	        
	    	pipe = new Pipeline();
	    	pipe.addMany(rtpBin,  appsink);
	    	Pipeline.linkMany(rtpBin, appsink);
	   
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
    		setErrorOnStream(false);
	    	return true;
		} catch(Exception ex) {
    		setErrorOnStream(true);
			return false;		
		}
	}

	public boolean isErrorOnStream() {
		return errorOnStream;
	}

	private void setErrorOnStream(boolean errorOnStream) {
		this.errorOnStream = errorOnStream;
	}

}
