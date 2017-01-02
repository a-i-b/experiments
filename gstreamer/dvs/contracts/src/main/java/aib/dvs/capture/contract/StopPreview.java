package aib.dvs.capture.contract;

public class StopPreview implements ICommand {
	private Integer channel;
	
	public Integer getChannel() {
		return channel;
	}
	public void setChannel(Integer channel) {
		this.channel = channel;
	}
}
