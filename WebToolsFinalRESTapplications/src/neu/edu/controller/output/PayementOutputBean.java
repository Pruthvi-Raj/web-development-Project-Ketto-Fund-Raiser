package neu.edu.controller.output;

import javax.ws.rs.core.Response;

public class PayementOutputBean {
	
	private Integer payId;
	private boolean Success;
	private String msg;
	
	
	
	
	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Integer getPayId() {
		return payId;
	}

	public void setPayId(Integer payId) {
		this.payId = payId;
	}

	public boolean isSuccess() {
		return Success;
	}

	public void setSuccess(boolean success) {
		Success = success;
	}
	
	

	
}
