package aib.dvs.av;

public interface IVideoSevice {
	boolean StartStream(String resolution, int channel, int port);
	boolean StopStream(int port);
}
