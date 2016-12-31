package aib.dvs.capture.contract;

import java.util.Date;

public class PreviewStateChanged implements IEvent {
	int isStarted;
	Date dt;

	public Date getDt() {
		return dt;
	}

	public void setDt(Date dt) {
		this.dt = dt;
	}

	public int isStarted() {
		return isStarted;
	}

	public void setIsStarted(int isStarted) {
		this.isStarted = isStarted;
	}
}
