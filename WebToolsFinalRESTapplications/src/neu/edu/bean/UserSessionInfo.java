package neu.edu.bean;

import java.util.ArrayList;
import java.util.List;



public class UserSessionInfo {
	
	private Integer userId;
	private String name;
	private String role;
	private Integer cfId;
	
	
	
	
	private UserInformationBean userInformationBean;
	private List<UserProjectBean> userProjectBeans;
	
	public UserSessionInfo(Integer userId) {
		// TODO Auto-generated constructor stub
		this.userId = userId;
		userInformationBean = new UserInformationBean();
		userProjectBeans = new ArrayList<>();
	}

	
	
	
	public Integer getCfId() {
		return cfId;
	}

	public void setCfId(Integer cfId) {
		this.cfId = cfId;
	}

	
	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public UserInformationBean getUserInformationBean() {
		return userInformationBean;
	}

	public void setUserInformationBean(UserInformationBean userInformationBean) {
		this.userInformationBean = userInformationBean;
	}

	public List<UserProjectBean> getUserProjectBeans() {
		return userProjectBeans;
	}

	public void setUserProjectBeans(List<UserProjectBean> userProjectBeans) {
		this.userProjectBeans = userProjectBeans;
	}
	
	public String getRole() {
		return role;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	

}
