package neu.edu.controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import neu.edu.bean.UserCategoryBean;
import neu.edu.bean.UserProjectBean;
import neu.edu.bean.UserServiceBean;
import neu.edu.controller.output.DeleteResponseBean;
import neu.edu.entity.Creator;
import neu.edu.service.ProjectService;
import neu.edu.service.UserService;
import neu.edu.service.ServiceService;

@Controller
@Path("/user/service")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ServiceController {
	
	
	@Autowired
	private ServiceService serviceService;
	
	@GET
	@Path("/getAllServices/{projectId}")
	public Response getAllProject(@PathParam("projectId") String projectId){
		 
		List<UserServiceBean> userServiceBeans =  serviceService.getAllService( Integer.parseInt(projectId));
		return  Response.ok().status(200).entity(userServiceBeans).build();
		
	}
	
	@GET
	@Path("/getAllServices")
	public Response getAllProjects(){
		
		List<UserServiceBean> userServiceBeans =  serviceService.getAllServices();
		return  Response.ok().status(200).entity(userServiceBeans).build();
		
	}
	
	
	@POST
	@Path("/add/{projectId}")
	public Response addProject(@PathParam("projectId") String projectId,UserServiceBean userServiceBean){
		
		int projId = Integer.parseInt(projectId);
		
		userServiceBean.setProjectId(projId);
		
		
		
		
		String msg = serviceService.addService(userServiceBean);
		
		
		DeleteResponseBean message = new DeleteResponseBean();
		if(msg==null){
			message.setMessage("Could not add");
			return  Response.ok().status(422).entity(message).build();
		}else{
			message.setMessage(msg);
			return  Response.ok().status(200).entity(message).build();
		}
	}
}





