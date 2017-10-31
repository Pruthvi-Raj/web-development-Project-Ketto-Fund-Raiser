package neu.edu.bean;

import java.util.List;

public class UserAccountBean {
	
	private String username;
	private String name;
	private String age;
	private String role;
	private int id;
	
	
	public UserAccountBean() {
		// TODO Auto-generated constructor stub
	}
		
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getRole() {
		return role;
	}
	

	
}
