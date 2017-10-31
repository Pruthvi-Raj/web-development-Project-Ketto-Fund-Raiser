package neu.edu.controller;

import java.util.Date;
import java.util.Random;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import neu.edu.bean.UserAccountBean;
import neu.edu.bean.UserSessionInfo;
import neu.edu.controller.error.AuthResponseError;
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
	public Response validateUser(UserLoginBean loginBean) {
		System.out.println("reached auth");
		Integer userId = userService.validateUser(loginBean);
		System.out.println(loginBean.getRole());
//		String str = "4";
//		System.out.println("hashed"+str.hashCode());
		if (userId == null) {
			
			AuthResponseError authResponseErr = new AuthResponseError();
			authResponseErr.setMessage("user-not-found");
			
			
			
			return Response.ok().status(422).entity(authResponseErr).build();
			
			
		} else {
			String key = generateKey();
			
			UserSessionInfo userSessionInfo = userService.fetchUserAccountDetails(userId);
			
			Integer cfId = userService.fetchFunder(userId);
			userSessionInfo.setCfId(cfId);
			System.out.println(userSessionInfo.getCfId());
			return Response.ok().status(200).entity(userSessionInfo).build();
		}

	}

	private String generateKey() {
		Random rand = new Random();

		int n = rand.nextInt(50) + 1;

		return n + (new Date().toString());
	}

}
