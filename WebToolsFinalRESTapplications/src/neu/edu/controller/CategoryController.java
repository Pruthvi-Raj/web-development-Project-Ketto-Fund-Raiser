package neu.edu.controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Controller;

import neu.edu.bean.UserCategoryBean;
import neu.edu.controller.output.DeleteResponseBean;
import neu.edu.entity.Category;
import neu.edu.service.CategoryService;

@Controller
@Path("/admin/category")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class CategoryController {
	
	
	@Autowired
	private CategoryService categoryService;
	
	@GET
	public Response getAllCategory(){
		
		List<UserCategoryBean> userCategoryBeans =  categoryService.getAllCategory();
		return  Response.ok().status(200).entity(userCategoryBeans).build();
		
	}
	
	@GET
	@Path("/filter")
	public Response getfilteredFunderCategory(){
		List<UserCategoryBean> userCategoryBeans =  categoryService.getfilteredFunderCategory();
		return  Response.ok().status(200).entity(userCategoryBeans).build();
	}
	
	@GET
	@Path("/creator")
	public Response getfilteredCreatorCategory(){
		List<UserCategoryBean> userCategoryBeans =  categoryService.getfilteredCreatorCategory();
		return  Response.ok().status(200).entity(userCategoryBeans).build();
	}
	
	@POST
	@Path("/add")
	public Response addCategory( UserCategoryBean userCategoryBean){
//		String name = userCategoryBean.getCategoryName();
//		String description = userCategoryBean.getCategoryDescription();
		
		System.out.println("Connected to rest");
		
		Category category = categoryService.addCategory(userCategoryBean);
		if(category!= null){
			List<UserCategoryBean> userCategoryBeans =  categoryService.getAllCategory();
			return  Response.ok().status(200).entity(userCategoryBeans).build();
		}else{
			DeleteResponseBean deleteResponseBean = new DeleteResponseBean();
			String message= "Failed to add";
			deleteResponseBean.setMessage(message); 
			return Response.ok().status(422).entity(deleteResponseBean).build();
		}
	}
	
	@PUT
	@Path("/disable/{catId}")
	public Response disableCategory( @PathParam("catId") String catId){
//		String name = userCategoryBean.getCategoryName();
//		String description = userCategoryBean.getCategoryDescription();
		Response message = null;
		System.out.println("Connected to rest disable");
		String msg = categoryService.disableCategory(Integer.parseInt(catId));
		DeleteResponseBean deleteResponseBean = new DeleteResponseBean();
		System.out.println("reached back from db");
		if(msg!="nothing deleted"){
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
	
	
	@PUT
	@Path("/enable/{catId}")
	public Response enableCategory( @PathParam("catId") String catId){
//		String name = userCategoryBean.getCategoryName();
//		String description = userCategoryBean.getCategoryDescription();
		Response message = null;
		System.out.println("Connected to rest disable");
		String msg = categoryService.enableCategory(Integer.parseInt(catId));
		DeleteResponseBean deleteResponseBean = new DeleteResponseBean();
		System.out.println("reached back from db");
		if(msg!="nothing deleted"){
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
	
	
	
	
	@PUT
	@Path("/delete/{catId}")
	public Response deleteCategory( @PathParam("catId") String catId){
//		String name = userCategoryBean.getCategoryName();
//		String description = userCategoryBean.getCategoryDescription();
		Response message = null;
		System.out.println("Connected to rest delete");
		String msg = categoryService.deleteCategory(Integer.parseInt(catId));
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
}