package neu.edu.controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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
import neu.edu.bean.UserPayementBean;
import neu.edu.bean.UserRegistrationBean;
import neu.edu.controller.output.DeleteResponseBean;
import neu.edu.controller.output.PayementOutputBean;
import neu.edu.entity.User;
import neu.edu.service.PayementService;
import neu.edu.service.RegisterService;
import neu.edu.service.UserService;


@Controller
@Path("/payement")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class payementController {

	@Autowired
	private RegisterService registerService;
	
	@Autowired
	private PayementService payementService;
	
	@GET
	@Path("/getAllPayements/{projId}")
	public Response card( @PathParam("projId") String projId){
		
		List<UserPayementBean> userPayementBean = payementService.getAllPayements(Integer.parseInt(projId));
		
		return  Response.ok().status(200).entity(userPayementBean).build();
	}
	
	
	
	@POST
	@Path("/proj/{cfId}/{projectId}")
	public Response card( @PathParam("cfId") String cfId, @PathParam("projectId") String projectId,UserPayementBean userPayementBean){
		
		userPayementBean.setFunderId(Integer.parseInt(cfId));
		userPayementBean.setProjectId(Integer.parseInt(projectId));
		
		
		Integer payId = payementService.addPayement(userPayementBean);
		
		

		PayementOutputBean output = new PayementOutputBean();
		if(payId!=null){
			
			output.setPayId(payId);
			return Response.ok().status(200).entity(output).build();
		}else{
			String msg = "Transaction failed. Try again";
			output.setMsg(msg);
			return Response.ok().status(422).entity(output).build();
		}
		
	}
	
	
	
	
}
