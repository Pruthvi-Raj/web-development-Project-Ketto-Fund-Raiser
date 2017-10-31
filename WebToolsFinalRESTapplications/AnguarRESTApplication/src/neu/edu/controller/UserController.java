package neu.edu.controller;


import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import neu.edu.bean.UserAccountBean;
import neu.edu.controller.input.UserLoginBean;
import neu.edu.service.UserService;

@Controller
@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@POST
	@Path("/auth")
	public UserAccountBean validateUser(UserLoginBean loginBean){
				
		
		return userService.validateUser(loginBean);
	}
	
	

	
	

	
	
	

}
