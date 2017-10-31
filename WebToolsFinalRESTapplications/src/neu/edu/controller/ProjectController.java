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

import neu.edu.bean.UserCategoryBean;
import neu.edu.bean.UserCommentBean;
import neu.edu.bean.UserProjectBean;
import neu.edu.controller.output.DeleteResponseBean;
import neu.edu.controller.output.ProjectOutputBean;
import neu.edu.entity.Comments;
import neu.edu.entity.Creator;
import neu.edu.service.ProjectService;

@Controller
@Path("/user/project")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProjectController {
	
	
	@Autowired
	private ProjectService projectService;
	
	@GET
	@Path("/getAllProjects/{catId}")
	public Response getAllProject(@PathParam("catId") String catId){
		
		List<UserProjectBean> userProjectBeans =  projectService.getAllProject( Integer.parseInt(catId));
		return  Response.ok().status(200).entity(userProjectBeans).build();
		
	}
	
	@GET
	@Path("/getAllProjects")
	public Response getAllProjects(){
		
		List<UserProjectBean> userProjectBeans =  projectService.getAllProjects();
		return  Response.ok().status(200).entity(userProjectBeans).build();
		
	}
	
	
	@POST
	@Path("/add/{userId}")
	public Response addProject(@PathParam("userId") String userId,UserProjectBean userProjectBean){
		
		int userId1= Integer.parseInt(userId);
		Creator creator = projectService.getCreator(userId1);
		int creatorId = creator.getCreatorId();
		
		userProjectBean.setCreatorId(creatorId);
		
		
		Integer projId = projectService.addProject(userProjectBean);
		System.out.println(projId);
		ProjectOutputBean projectOutput = new ProjectOutputBean();
		projectOutput.setProjectId(projId);
		
		DeleteResponseBean message = new DeleteResponseBean();
		
		
		
		if(projId==null){
			message.setMessage("Could not add");
			return  Response.ok().status(422).entity(message).build();
		}else{
			//message.setMessage(msg);
			return  Response.ok().status(200).entity(projectOutput).build();
		}
	}
	
	
	@PUT
	@Path("/delete/{projId}")
	public Response deleteProject( @PathParam("projId") String projId){
//		String name = userCategoryBean.getCategoryName();
//		String description = userCategoryBean.getCategoryDescription();
		Response message = null;
		System.out.println("Connected to rest delete");
		String msg = projectService.deleteProject(Integer.parseInt(projId));
		DeleteResponseBean deleteResponseBean = new DeleteResponseBean();
		System.out.println("reached back from db");
		if(msg!="can't be deleted"){
			deleteResponseBean.setMessage(msg);
			deleteResponseBean.setSuccess(true);
			return Response.ok().status(200).entity(deleteResponseBean).build();
		}else{
			deleteResponseBean.setMessage(msg);
			deleteResponseBean.setSuccess(false);
			System.out.println(msg);
			return Response.ok().status(422).entity(deleteResponseBean).build();
		}
	}
	
	
	@POST
	@Path("/like/{projId}/{funderId}")
	public Response likeProject( @PathParam("projId") int projId, @PathParam("funderId") String funderId){
		
		int projId1= projId;
		int funderId1= Integer.parseInt(funderId);
		
		Integer c = projectService.likeProject(projId1,funderId1);
		DeleteResponseBean deleteResponseBean = new DeleteResponseBean();
		if(c!=null){
			deleteResponseBean.setMessage("Liked");
			deleteResponseBean.setSuccess(true);
			return Response.ok().status(200).entity(deleteResponseBean).build();
		}else{
			deleteResponseBean.setMessage("-");
			deleteResponseBean.setSuccess(false);
			return Response.ok().status(422).entity(deleteResponseBean).build();

		}
		
		
	}
	
}





