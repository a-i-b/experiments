package aib.dvs.capture.contract;

public class StartStopPreview implements ICommand {
	private Boolean isToStart;

	public Boolean getIsToStart() {
		return isToStart;
	}

	public void setIsToStart(Boolean isToStart) {
		this.isToStart = isToStart;
	}
}
