package neu.edu.bean;

import java.util.Date;

public class UserPayementBean {

	private Integer amount;
	private String name;
	private String city;
	private Integer funderId;
	private Integer projectId;
	
	
	
	
	public Integer getFunderId() {
		return funderId;
	}
	public void setFunderId(Integer funderId) {
		this.funderId = funderId;
	}
	public Integer getProjectId() {
		return projectId;
	}
	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	
	
	
}
