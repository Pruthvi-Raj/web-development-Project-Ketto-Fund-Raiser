package neu.edu.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import neu.edu.bean.UserCardBean;
import neu.edu.bean.UserRegistrationBean;
import neu.edu.controller.output.DeleteResponseBean;
import neu.edu.entity.User;
import neu.edu.service.RegisterService;
import neu.edu.service.UserService;


@Controller
@Path("/register")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RegistrationController {

	@Autowired
	private RegisterService registerService;
	
	//@Autowired
	//private UserService userService;
	
	@POST
	@Path("/user")
	public Response register(UserRegistrationBean userRegistrationBean){
		Integer Id = registerService.createUser(userRegistrationBean);
		String msg =null;
		DeleteResponseBean deleteResponseBean = new DeleteResponseBean();
		if(Id!=null){
			msg = "Success";
			deleteResponseBean.setMessage(msg);
			return  Response.ok().status(200).entity(deleteResponseBean).build();
		}else{
			msg = "Username already exists!!";
			deleteResponseBean.setMessage(msg);
			//deleteResponseBean.setCfId(Id);
			return  Response.ok().status(422).entity(deleteResponseBean).build();
		}
		
	}
	
	@POST
	@Path("/card/{cfId}")
	public Response card( @PathParam("cfId") String cfId,UserCardBean userCardBean){
		
		
		Integer funderId = Integer.parseInt(cfId);
		
		userCardBean.setFunder_FunderId(funderId);
		String msg = registerService.addCard( userCardBean);
		DeleteResponseBean message = new DeleteResponseBean();
		message.setMessage(msg);
		return Response.ok().status(200).entity(message).build();
		
	}
	
	
	
	
}
