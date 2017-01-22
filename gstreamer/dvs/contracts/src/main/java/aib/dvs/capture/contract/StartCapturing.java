package aib.dvs.capture.contract;

public class StartCapturing implements ICommand {
	private String fileName;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
}
