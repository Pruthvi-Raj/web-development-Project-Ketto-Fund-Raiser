package neu.edu.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import neu.edu.bean.UserCommentBean;
import neu.edu.bean.UserProjectBean;
import neu.edu.dao.UserDAO;
import neu.edu.entity.Category;
import neu.edu.entity.Comments;
import neu.edu.entity.Creator;
import neu.edu.entity.Project;

@Service
public class ProjectService {
	
	@Autowired
	private UserDAO userDAO;
	
	
//	public boolean addProject(UserProjectBean userProjectBean,Integer userId){
//		return userDAO.addProject(userProjectBean, userId);
//	}
//
//	public boolean updateProject(UserProjectBean userProjectBean, Integer userId) {
//		// TODO Auto-generated method stub
//		return userDAO.updateProject(userProjectBean, userId);
//	}
	
	@Transactional
	public List<UserProjectBean> getAllProject( Integer catId) {
		// TODO Auto-generated method stub
		List<Project> Projects = userDAO.getAllProjects(catId);
		
		List<UserProjectBean> response = new ArrayList<>();
		System.out.println(Projects);
		
		for(Project project:Projects){
			System.out.println(project.getProjectId());
			System.out.println(project.getProjectName());
			UserProjectBean userProjectBean = new UserProjectBean();
			userProjectBean.setProjectName(project.getProjectName());
			userProjectBean.setProjectDescription(project.getProjectDescription());
			userProjectBean.setProjectId(project.getProjectId());
			userProjectBean.setProjectFundingExpectation(project.getProjectFundingExpectation());
			
			userProjectBean.setProjectStartDate(project.getStartDate());
			userProjectBean.setProjectDeadLine(project.getDeadLine());
			response.add(userProjectBean);
		}
		return response;
	}
	
	@Transactional
	public List<UserProjectBean> getAllProjects( ) {
		// TODO Auto-generated method stub
		List<Project> Projects = userDAO.getAllProject();
		
		List<UserProjectBean> response = new ArrayList<>();
		System.out.println(Projects);
		
		for(Project project:Projects){
			System.out.println(project.getProjectFundingExpectation());
			UserProjectBean userProjectBean = new UserProjectBean();
			userProjectBean.setProjectName(project.getProjectName());
			userProjectBean.setProjectDescription(project.getProjectDescription());
			userProjectBean.setProjectId(project.getProjectId());
			userProjectBean.setProjectFundingExpectation(project.getProjectFundingExpectation());
			
			userProjectBean.setProjectStartDate(project.getStartDate());
			userProjectBean.setProjectDeadLine(project.getDeadLine());
			response.add(userProjectBean);
		}
		return response;
	}
	
	
	
	
	
	@Transactional
	public Creator getCreator(int userId){

		Creator creator = userDAO.getCreator(userId);
		return creator;
	}
	
	@Transactional
	public Integer addProject(UserProjectBean userProjectBean){
		
		Project project = new Project();
		
		project.setProjectName(userProjectBean.getProjectName());
		project.setProjectDescription(userProjectBean.getProjectDescription());
		project.setProjectFundingExpectation(userProjectBean.getProjectFundingExpectation());
		//project.setStartDate(userProjectBean.getProjectStartDate());
		//project.setDeadLine(userProjectBean.getProjectDeadLine());
		project.setCategoryCategoryId(userProjectBean.getCategoryId());
		project.setCreatorCreatorId(userProjectBean.getCreatorId());
		project.setStartDate(userProjectBean.getProjectStartDate());
		project.setDeadLine(userProjectBean.getProjectDeadLine());
		
		
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//
//		if (userProjectBean.getProjectStartDate() != null) {
//			try {
//				project.setStartDate(sdf.parse(userProjectBean.getProjectStartDate()));
//			} catch (ParseException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		if (userProjectBean.getProjectDeadLine()!= null) {
//			try {
//				project.setDeadLine(sdf.parse(userProjectBean.getProjectDeadLine()));
//			} catch (ParseException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
		
		String msg = null;
		 Boolean m = userDAO.addProject(project);
		 Integer projId = userDAO.fetchProject(project);
		 
		 
		 
		 
		if(m){
			msg = "Added successfully";
			return projId;
		}else{
		
			return null;
		}
		
	}
	
	
	
	
	@Transactional
	public String deleteProject(Integer projId ){
			
			//Category category = new Category();
//			category.setCategoryId(userCategoryBean.getCategoryId());
//			Integer categoryId =  
			Category cat = userDAO.fetchProject(projId);
			
			 String msg = null;
				 int i = userDAO.deleteProject(projId);
				 if(i!= 0){
					 msg="Deleted";
					 return msg;
				}
				 else{
					 msg="nothing deleted";
					 return msg;
				 }
			
		}
	
	@Transactional
	public Integer likeProject(Integer projId, Integer funderId){
		UserCommentBean userCommentBean = new UserCommentBean();
		int like = 1;
		//userCommentBean.setCommentId(funderId);
		userCommentBean.setProjectId(projId);
		userCommentBean.setLike(like);
		userCommentBean.setFunderId(funderId);
		
		
		Comments comment = new Comments();
		comment.setCommentsId(userCommentBean.getCommentId());
		comment.setProjectProjectId(userCommentBean.getProjectId());
		comment.setFunderFunderId(userCommentBean.getFunderId());
		comment.setComments(userCommentBean.getLike());
		
		
		int c = userDAO.likeProject(comment);
		
		
		
		return c;
	}
}




