package neu.edu.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import neu.edu.bean.UserCategoryBean;
import neu.edu.dao.UserDAO;
import neu.edu.entity.Category;
import neu.edu.entity.Project;

@Service
public class CategoryService {
	
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
	public String disableCategory(Integer catId ){
			
			//Category category = new Category();
//			category.setCategoryId(userCategoryBean.getCategoryId());
//			Integer categoryId =  
			Category cat = userDAO.fetchCategory(catId);
			Integer projects = userDAO.getAllProjectsDisable(catId);
			 System.out.println(projects);
			String msg = null;
			
				// cat.setIsEnable((byte) 0);
				//System.out.println(cat.getIsEnable());
				 int i = userDAO.disableCategory(catId);
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
	public String enableCategory(Integer catId ){
			
			//Category category = new Category();
//			category.setCategoryId(userCategoryBean.getCategoryId());
//			Integer categoryId =  
			//Category cat = userDAO.fetchCategory(catId);
//			Integer projects = userDAO.getAllProjectsDisable(catId);
//			 System.out.println(projects);
			String msg = null;
			
				// cat.setIsEnable((byte) 0);
				//System.out.println(cat.getIsEnable());
				 int i = userDAO.enableCategory(catId);
				 if(i!= 0){
					 msg="enabled";
					 return msg;
				}
				 else{
					 msg="nothing enabled";
					 return msg;
				 }
			
		}
	
	@Transactional
	public String deleteCategory(Integer catId ){
			
			//Category category = new Category();
//			category.setCategoryId(userCategoryBean.getCategoryId());
//			Integer categoryId =  
			Category cat = userDAO.fetchCategory(catId);
			Integer projects = userDAO.getAllProjectsDisable(catId);
			 System.out.println(projects);
			String msg = null;
			if(projects==0){
				// cat.setIsEnable((byte) 0);
				//System.out.println(cat.getIsEnable());
				 int i = userDAO.deleteCategory(catId);
				 if(i!= 0){
					 msg="Deleted";
					 return msg;
				}
				 else{
					 msg="nothing deleted";
					 return msg;
				 }
			}else{
				msg = "can't be deleted";
				return msg;
			}
		}
	

//	public boolean updateCategory(UserCategoryBean userCategoryBean, Integer userId) {
//		// TODO Auto-generated method stub
//		return userDAO.updateCategory(userCategoryBean, userId);
//	}
	
	@Transactional
	public List<UserCategoryBean> getAllCategory() {
		// TODO Auto-generated method stub
		List<Category> categories = userDAO.getAllCategory();
		//System.out.println(categories);
		List<UserCategoryBean> response = new ArrayList<>();
		
		
		for(Category category : categories){
			UserCategoryBean userCategoryBean = new UserCategoryBean();
			userCategoryBean.setCategoryName(category.getCategoryName());
			userCategoryBean.setCategoryId(category.getCategoryId());
			userCategoryBean.setCategoryDescription(category.getCategoryDescription());
			response.add(userCategoryBean);
		}
		return response;
	}
	
	
	@Transactional
	public List<UserCategoryBean> getfilteredFunderCategory() {
		// TODO Auto-generated method stub
		List<Category> categories = userDAO.getfilteredFunderCategory();
		//System.out.println(categories);
		List<UserCategoryBean> response = new ArrayList<>();
		
		
		for(Category category : categories){
			UserCategoryBean userCategoryBean = new UserCategoryBean();
			userCategoryBean.setCategoryName(category.getCategoryName());
			userCategoryBean.setCategoryId(category.getCategoryId());
			userCategoryBean.setCategoryDescription(category.getCategoryDescription());
			response.add(userCategoryBean);
		}
		return response;
	}
	@Transactional
	public List<UserCategoryBean> getfilteredCreatorCategory() {
		// TODO Auto-generated method stub
		List<Category> categories = userDAO.getfilteredCreatorCategory();
		//System.out.println(categories);
		List<UserCategoryBean> response = new ArrayList<>();
		
		
		for(Category category : categories){
			UserCategoryBean userCategoryBean = new UserCategoryBean();
			userCategoryBean.setCategoryName(category.getCategoryName());
			userCategoryBean.setCategoryId(category.getCategoryId());
			userCategoryBean.setCategoryDescription(category.getCategoryDescription());
			response.add(userCategoryBean);
		}
		return response;
	}

}
