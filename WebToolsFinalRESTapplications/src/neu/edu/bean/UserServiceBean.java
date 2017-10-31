package neu.edu.bean;

import java.util.Date;

public class UserServiceBean {
	
	private int returnId;
	private String gift;
	private int from;
	private int to;
	private int projectId;
	
	public UserServiceBean() {
		// TODO Auto-generated constructor stub
	}
	
	
	
	public UserServiceBean(int returnId, String gift, 
							int from, int to, int projectId) {
		super();
		this.returnId = returnId;
		this.gift = gift;
		this.projectId = projectId;
		this.from = from;
		this.to = to;
	}



	public int getReturnId() {
		return returnId;
	}



	public void setReturnId(int returnId) {
		this.returnId = returnId;
	}



	public String getGift() {
		return gift;
	}



	public void setGift(String gift) {
		this.gift = gift;
	}



	public int getFrom() {
		return from;
	}



	public void setFrom(int from) {
		this.from = from;
	}



	public int getTo() {
		return to;
	}



	public void setTo(int to) {
		this.to = to;
	}



	public int getProjectId() {
		return projectId;
	}



	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}



	



}
