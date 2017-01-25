package aib.dvs.av;

import java.util.concurrent.CountDownLatch;

import org.apache.log4j.Logger;
import org.freedesktop.gstreamer.Bin;
import org.freedesktop.gstreamer.Bus.EOS;
import org.freedesktop.gstreamer.Element;
import org.freedesktop.gstreamer.ElementFactory;
import org.freedesktop.gstreamer.Event;
import org.freedesktop.gstreamer.Gst;
import org.freedesktop.gstreamer.GstObject;
import org.freedesktop.gstreamer.Pad;
import org.freedesktop.gstreamer.PadProbeReturn;
import org.freedesktop.gstreamer.Pipeline;
import org.freedesktop.gstreamer.State;
import org.freedesktop.gstreamer.StateChangeReturn;
import org.freedesktop.gstreamer.event.EOSEvent;
import org.freedesktop.gstreamer.lowlevel.GstEventAPI;

public class VideoService implements IVideoSevice, EOS {
	static Logger logger = Logger.getLogger(VideoService.class);

	final VideoService _this = this;

	private Pipeline pipe;
	
	private Element tee;
	private Bin mp4Bin;
	
	private Pad teeSrc1;
	private Pad captureSink;
		
	public VideoService() {
		Gst.init("Video streaming service", new String[] { "--gst-debug=2", "--gst-debug-no-color" });
	}

	@Override
	public boolean startStream(String resolution, int channel, int port) {
		if (pipe != null)
			return true;

		try {
			String resData[] = resolution.split("(x)|(\\@)");

			String caps = "video/x-raw, width=" + resData[0] + ", height=" + resData[1] + ", framerate=" + resData[2]
					+ "/1";

			String readPipe = isWindows() ? "ksvideosrc" : "v4l2src";
			readPipe += " ! " + "capsfilter caps=\"" + caps + "\"";
			Bin readBin = Bin.launch(readPipe, true);
			readBin.setName("readBin");

			tee = ElementFactory.make("tee", "tee");

			String rtpLine = "queue leaky=1 name=rtpQueue";
			rtpLine += " ! " + "jpegenc";
			rtpLine += " ! " + "rtpjpegpay";
			rtpLine += " ! " + "udpsink buffer-size=10000000 host=127.0.0.1 port=" + port + " sync = false";
			Bin rtpBin = Bin.launch(rtpLine, true);
			rtpBin.setName("rtpBin");

			pipe = new Pipeline();
			pipe.addMany(readBin, tee, rtpBin);

			if (!Pipeline.linkMany(readBin, tee))
				throw new Exception("Can not link");

			Pad teeSrc0 = tee.getRequestPad("src_%u");
			Pad rtpSink = rtpBin.getStaticPad("sink");
			teeSrc0.link(rtpSink);
//			teeSrc1 = tee.getRequestPad("src_%u");
			pipe.getBus().connect(this);

			inspect(pipe);

			StateChangeReturn ret = pipe.play();
			if (ret == StateChangeReturn.ASYNC || ret == StateChangeReturn.SUCCESS) {
				return true;
			}

			logger.error("Pipeline play() returnd " + ret.name());
			return false;
		} catch (Exception ex) {
			logger.error(ex);
			return false;
		}
	}

	@Override
	public boolean stopStream(int port) {
		if (pipe == null)
			return true;
		try {
			pipe.sendEvent(GstEventAPI.GSTEVENT_API.gst_event_new_eos());
			return true;
		} catch (Exception ex) {
			return false;
		}
	}
	
	public boolean startCapturing(String fileName) {
		if (pipe != null) {
			if(pipe.getElementByName("mp4Bin") == null) {
				mp4Bin = createCaptureBin(fileName);				
				pipe.add(mp4Bin);
				captureSink = mp4Bin.getStaticPad("sink");
				teeSrc1 = tee.getRequestPad("src_1");
				logger.info("getRequestPad = " + teeSrc1.getName());
				teeSrc1.link(captureSink);
				StateChangeReturn ret = mp4Bin.play();

				inspect(pipe);
			}	
		}

		return true;
	}

	public boolean stopCapturing() {
		if (pipe != null && mp4Bin != null) {
// Changing elements in a pipeline
// https://gstreamer.freedesktop.org/documentation/application-development/advanced/pipeline-manipulation.html#dynamically-changing-the-pipeline								
			CountDownLatch lock = new CountDownLatch(1);
			Pad.EVENT_PROBE eosListener = new Pad.EVENT_PROBE() {				
				@Override
				public PadProbeReturn eventReceived(Pad pad, Event event) {
					logger.info("EOS probe: " + pad.toString());
					if(event instanceof EOSEvent) {
						logger.info("EOS probe: " + pad.toString() + ", " + event.toString());
						lock.countDown();
						return PadProbeReturn.REMOVE;
					}
					
					return PadProbeReturn.OK;						
				}
			};			

			Pad mp4BinEnd= mp4Bin.getElementByName("fs").getStaticPad("sink");

			teeSrc1.block(new Runnable() {

				@Override
				public void run() {
					if(pipe.getElementByName("mp4Bin") != null) {
						teeSrc1.unlink(captureSink);
						mp4BinEnd.addEventProbe(eosListener);
						mp4Bin.getStaticPad("sink").sendEvent(GstEventAPI.GSTEVENT_API.gst_event_new_eos());							
						pipe.remove(mp4Bin);
					}
				}
			});

			try {
				lock.await();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			StateChangeReturn ret = mp4Bin.stop();
			mp4Bin.dispose();
			mp4Bin = null;
			tee.releaseRequestPad(teeSrc1);
			teeSrc1.dispose();
			teeSrc1 = null;
			logger.info("Stopped");
			inspect(pipe);
		}
		return true;
	}

	@Override
	public void endOfStream(GstObject go) {
		logger.info("Got EOS for " + go.getName());
		pipe.setState(State.PAUSED);
		pipe.setState(State.READY);
		StateChangeReturn ret = pipe.stop();
		pipe.dispose();
		pipe = null;
	}

	private boolean isWindows() {
		return System.getProperty("os.name").contains("Windows");
	}

	private static void inspect(Pipeline pipe) {
		for (Element elt : pipe.getElements()) {
			System.out.println(elt.getName());
			for (Pad pad : elt.getSinkPads()) {
				if (pad.getPeer() == null) {
					System.out.println("\tSink pad: " + pad.getName() + " DISCONNECTED");
				} else {
					System.out.println("\tSink pad: " + pad.getName() + " connected to peer parent="
							+ pad.getPeer().getParent() + " / " + pad.getPeer());
				}
			}
			for (Pad pad : elt.getSrcPads()) {
				if (pad.getPeer() == null) {
					System.out.println("\tSink pad: " + pad.getName() + " DISCONNECTED");
				} else {
					System.out.println("\tSrc pad: " + pad.getName() + " connected to peer parent="
							+ pad.getPeer().getParent() + " / " + pad.getPeer());
				}
			}
		}

		pipe.debugToDotFile(Pipeline.DEBUG_GRAPH_SHOW_ALL, "test");
	}

	private Bin createCaptureBin(String fileName) {
		String pipeLine = "queue name=captureQueue" + (isWindows() ? " ! videoconvert" : "");
		pipeLine += " ! video/x-raw, format=I420";
		String savePath = (isWindows() ? "d:/Videos/" : "~/Videos/") + fileName;
		pipeLine += " ! x264enc ! mp4mux name=muxer ! filesink name=fs location=" + savePath;
		Bin mp4Bin = Bin.launch(pipeLine, true);
		mp4Bin.setName("mp4Bin");
		return mp4Bin;
	}
}
