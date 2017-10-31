package neu.edu.service;

import org.springframework.stereotype.Service;

import neu.edu.bean.UserAccountBean;
import neu.edu.controller.input.UserLoginBean;

@Service
public class UserService {
	
	
	public UserAccountBean validateUser(UserLoginBean loginBean){
		
		UserAccountBean userAccountBean = new UserAccountBean();
		userAccountBean.setUsername(loginBean.getUsername());
		userAccountBean.setName("ashwin");
		userAccountBean.setRole("admin");
		userAccountBean.setId(3);
		
		return userAccountBean;
		
	}

}
