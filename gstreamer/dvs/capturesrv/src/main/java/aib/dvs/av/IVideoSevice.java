package aib.dvs.av;

public interface IVideoSevice {
	boolean startStream(String resolution, int channel, int port);
	boolean stopStream(int port);
}
