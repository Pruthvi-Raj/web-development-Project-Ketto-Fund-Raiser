package neu.edu.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import neu.edu.bean.UserCategoryBean;
import neu.edu.bean.UserFunderBean;
import neu.edu.bean.UserPayementBean;
import neu.edu.dao.UserDAO;
import neu.edu.entity.Category;
import neu.edu.entity.Comments;
import neu.edu.entity.Funder;
import neu.edu.entity.Payement;
import neu.edu.entity.Project;

@Service
public class KPIService {
	
	@Autowired
	private UserDAO userDAO;
	
	@Transactional
	public Category addCategory(UserCategoryBean userCategoryBean){
		
		Category category = new Category();
		
		
		category.setCategoryName(userCategoryBean.getCategoryName());
		category.setCategoryDescription(userCategoryBean.getCategoryDescription());
		return userDAO.addCategory(category);
	}
	
	@Transactional
	public List<UserPayementBean> getCity(int projectId){

		List<Payement> payements = userDAO.getAllPayements(projectId);
		//return creator;
		
		//Project project = userDAO.getProject(projectId);
		
		
		//List<Return> returs = userDAO.getAllServices(project);
		
		List<UserPayementBean> response = new ArrayList<>();
		//System.out.println(returs);
		
		for(Payement payement:payements){

			UserPayementBean userPayementBean = new UserPayementBean();
			
			
			
			userPayementBean.setCity(payement.getCity()); 
			
			

			//userServiceBean.setProjectId(retur.getProjectProjectId());
			//userServiceBean.setReturnId(retur.getReturnId());
			response.add(userPayementBean);
		}
		return response;
	}
	
	
	
	@Transactional
	public List<UserFunderBean> getFunder(int projectId){

		List<Payement> payements = userDAO.getAllPayements(projectId);
		//return creator;
		
		//Project project = userDAO.getProject(projectId);
		
		
		//List<Return> returs = userDAO.getAllServices(project);
		
		List<UserFunderBean> response = new ArrayList<>();
		//System.out.println(returs);
		
		for(Payement payement:payements){

			UserFunderBean userFunderBean = new UserFunderBean();
			
			
			
			//userPayementBean.setCity(payement.getCity()); 
			userFunderBean.setFunderId(payement.getFunderFunderId());
			int funderId = userFunderBean.getFunderId();
			Funder funder = userDAO.getFunder(funderId);
			String name = funder.getFunderName();
			userFunderBean.setFunderName(name);
			//userServiceBean.setProjectId(retur.getProjectProjectId());
			//userServiceBean.setReturnId(retur.getReturnId());
			response.add(userFunderBean);
		}
		return response;
	}
	
	
	
	@Transactional
	public Integer getPopularity(){

		int projId = userDAO.getPopularity();
		//return creator;
		
		//Project project = userDAO.getProject(projectId);
		
		
		//List<Return> returs = userDAO.getAllServices(project);
		
		
		return projId;
	}
	
	
	@Transactional
	public Integer getPayementTotal(int projId){

		int projectId = userDAO.getPayementTotal(projId);
		//return creator;
		
		//Project project = userDAO.getProject(projectId);
		
		
		//List<Return> returs = userDAO.getAllServices(project);
		
		
		return projectId;
	}
	
	
}
