package aib.dvs.capture.contract;

import java.util.Date;

public class AnalyzerEvent implements IEvent {

	private String eventText;
	
	private Date eventTime;
	
	public String getEventText() {
		return eventText;
	}
	public void setEventText(String eventText) {
		this.eventText = eventText;
	}
	public Date getEventTime() {
		return eventTime;
	}
	public void setEventTime(Date eventTime) {
		this.eventTime = eventTime;
	}
}
