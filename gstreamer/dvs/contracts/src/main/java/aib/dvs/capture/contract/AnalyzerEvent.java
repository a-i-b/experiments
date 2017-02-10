package aib.dvs.capture.contract;

public class AnalyzerEvent implements IEvent {

	private String eventText;
	
	private String eventTime;
	
	public String getEventText() {
		return eventText;
	}
	public void setEventText(String eventText) {
		this.eventText = eventText;
	}
	public String getEventTime() {
		return eventTime;
	}
	public void setEventTime(String eventTime) {
		this.eventTime = eventTime;
	}
}
