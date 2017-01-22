package aib.dvs.capture.contract;

public class CapturingStateChanged implements IEvent {
	private Boolean isRunning;

	public Boolean getIsRunning() {
		return isRunning;
	}

	public void setIsRunning(Boolean isRunning) {
		this.isRunning = isRunning;
	}	
}
