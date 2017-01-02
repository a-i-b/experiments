package aib.dvs.capture.contract;

public class StartPreview implements ICommand {
	private String resolution;
	private Integer frameRate;
	private String codec;
	private Double quality;
	private Integer channel;

	public String getResolution() {
		return resolution;
	}
	public void setResolution(String resolution) {
		this.resolution = resolution;
	}
	public Integer getFrameRate() {
		return frameRate;
	}
	public void setFrameRate(Integer frameRate) {
		this.frameRate = frameRate;
	}
	public String getCodec() {
		return codec;
	}
	public void setCodec(String codec) {
		this.codec = codec;
	}
	public Double getQuality() {
		return quality;
	}
	public void setQuality(Double quality) {
		this.quality = quality;
	}
	public Integer getChannel() {
		return channel;
	}
	public void setChannel(Integer channel) {
		this.channel = channel;
	}
}
