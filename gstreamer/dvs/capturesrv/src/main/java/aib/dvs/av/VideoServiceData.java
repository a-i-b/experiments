package aib.dvs.av;

import org.freedesktop.gstreamer.Bin;
import org.freedesktop.gstreamer.Element;
import org.freedesktop.gstreamer.Pipeline;

public class VideoServiceData {
	public Pipeline pipe;
	public Bin readBin;
	public Element tee;
	public Bin binMp4;

	public VideoServiceData() {
	}
}