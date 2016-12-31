package aib.dvs.capture.contract;

public class StartStopPreview implements ICommand {
	Integer isToStart;

	public Integer isToStart() {
		return isToStart;
	}

	public void setToStart(Integer isToStart) {
		this.isToStart = isToStart;
	}
}
