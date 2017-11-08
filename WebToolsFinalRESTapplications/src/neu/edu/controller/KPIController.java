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

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Controller;

import neu.edu.bean.UserCategoryBean;
import neu.edu.bean.UserFunderBean;
import neu.edu.bean.UserPayementBean;
import neu.edu.bean.UserProjectBean;
import neu.edu.bean.UserServiceBean;
import neu.edu.controller.output.DeleteResponseBean;
import neu.edu.controller.output.ProjectOutputBean;
import neu.edu.entity.Creator;
import neu.edu.service.KPIService;
import neu.edu.service.ProjectService;
import neu.edu.service.UserService;
import neu.edu.service.ServiceService;

@Controller
@Path("/user/demand")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class KPIController {
	
	
	@Autowired
	private KPIService kpiService;
	
//	@GET
//	@Path("/getAllServices/{projectId}")
//	public Response getAllProject(@PathParam("projectId") String projectId){
//		 
//		List<UserServiceBean> userServiceBeans =  serviceService.getAllService( Integer.parseInt(projectId));
//		return  Response.ok().status(200).entity(userServiceBeans).build();
//		
//	}
	
	@GET
	@Path("/city/{projectId}")
	public Response city(@PathParam("projectId") String projectId){
		
		List<UserPayementBean> userPayementBeans =  kpiService.getCity(Integer.parseInt(projectId));
		return  Response.ok().status(200).entity(userPayementBeans).build();
		
	}
	
	
	@GET
	@Path("/funder/{projectId}")
	public Response funder(@PathParam("projectId") String projectId){
		
		List<UserFunderBean> userFunderBeans =  kpiService.getFunder(Integer.parseInt(projectId));
		return  Response.ok().status(200).entity(userFunderBeans).build();
		
	}
	
	
	
	@GET
	@Path("/project")
	public Response project(){
		
		Integer projId =  kpiService.getPopularity();
		ProjectOutputBean u = new ProjectOutputBean();
		u.setProjectId(projId);
		return  Response.ok().status(200).entity(u).build();
		
	}
	
	@GET
	@Path("/payement/{projectId}")
	public Response payement(@PathParam("projectId") String projectId){
		
		Integer projId =  kpiService.getPayementTotal(Integer.parseInt(projectId));
		ProjectOutputBean u = new ProjectOutputBean();
		u.setProjectId(projId);
		return  Response.ok().status(200).entity(u).build();
		
	}
	
	
	
	
	
	
	
	
	
//	@POST
//	@Path("/add/{projectId}")
//	public Response addProject(@PathParam("projectId") String projectId,UserServiceBean userServiceBean){
//		
//		int projId = Integer.parseInt(projectId);
//		
//		userServiceBean.setProjectId(projId);
//		
//		
//		
//		
//		String msg = serviceService.addService(userServiceBean);
//		
//		
//		DeleteResponseBean message = new DeleteResponseBean();
//		if(msg==null){
//			message.setMessage("Could not add");
//			return  Response.ok().status(422).entity(message).build();
//		}else{
//			message.setMessage(msg);
//			return  Response.ok().status(200).entity(message).build();
//		}
//	}
}





