package neu.edu.controller.output;

import javax.ws.rs.core.Response;

public class DeleteResponseBean {
	
	private String message;
	private boolean Success;
	private int cfId;

	
	
	
	public int getCfId() {
		return cfId;
	}

	public void setCfId(int cfId) {
		this.cfId = cfId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isSuccess() {
		return Success;
	}

	public void setSuccess(boolean success) {
		Success = success;
	}
	
	

	
}
