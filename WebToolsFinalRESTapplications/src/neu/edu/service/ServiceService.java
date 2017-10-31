package neu.edu.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import neu.edu.bean.UserPayementBean;
import neu.edu.bean.UserProjectBean;
import neu.edu.bean.UserServiceBean;
import neu.edu.dao.UserDAO;
import neu.edu.entity.Creator;
import neu.edu.entity.Payement;
import neu.edu.entity.Project;
import neu.edu.entity.Return;

@Service
public class ServiceService {
	
	@Autowired
	private UserDAO userDAO;
	
	

	
	@Transactional
	public List<UserServiceBean> getAllService( Integer projectId) {
		// TODO Auto-generated method stub
		Project project = userDAO.getProject(projectId);
		
		
		List<Return> returs = userDAO.getAllServices(project);
		
		List<UserServiceBean> response = new ArrayList<>();
		System.out.println(returs);
		
		for(Return retur:returs){

			UserServiceBean userServiceBean = new UserServiceBean();
			
			
			userServiceBean.setFrom(retur.getFrom());
			userServiceBean.setTo(retur.getTo());
			userServiceBean.setGift(retur.getGift());
			//userServiceBean.setProjectId(retur.getProjectProjectId());
			userServiceBean.setReturnId(retur.getReturnId());
			response.add(userServiceBean);
		}
		return response;
	}
	
	@Transactional
	public List<UserServiceBean> getAllServices( ) {
		// TODO Auto-generated method stub
		List<Return> returs = userDAO.getAllService();
		
		List<UserServiceBean> response = new ArrayList<>();
		System.out.println(returs);
		
		for(Return retur:returs){
			
			UserServiceBean userServiceBean = new UserServiceBean();
			
			userServiceBean.setFrom(retur.getFrom());
			userServiceBean.setTo(retur.getTo());
			userServiceBean.setGift(retur.getGift());
			//userServiceBean.setProjectId(retur.getProjectProjectId());
			userServiceBean.setReturnId(retur.getReturnId());
			
			
			
			response.add(userServiceBean);
		}
		return response;
	}
	
	
	
	
	
	@Transactional
	public Creator getCreator(int userId){

		Creator creator = userDAO.getCreator(userId);
		return creator;
	}
	
	

	
	
	
	
	
	@Transactional
	public String addService(UserServiceBean userServiceBean){
		
		Return retur = new Return();
		
		retur.setFrom(userServiceBean.getFrom());
		retur.setTo(userServiceBean.getTo());
		retur.setGift(userServiceBean.getGift());
		
		//retur.setProjectProjectId(userServiceBean.getProjectId());
		Project project = userDAO.getProject(userServiceBean.getProjectId());
		
		
		
		retur.setProject(project);
		
		
		
		System.out.println(retur.getFrom());
		System.out.println(retur.getGift());
		System.out.println(retur.getTo());
		String msg ;
		 Boolean m = userDAO.addService(retur);
		
		if(m){
			msg = "Added successfully";
			return msg;
		}else{
		
			return null;
		}
		
	}
	
	

}




