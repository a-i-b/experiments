package aib.dvs.capture.contract;

public class PreviewStateChanged implements IEvent {
	Boolean isStarted;

	public Boolean getIsStarted() {
		return isStarted;
	}

	public void setIsStarted(Boolean isStarted) {
		this.isStarted = isStarted;
	}
}
