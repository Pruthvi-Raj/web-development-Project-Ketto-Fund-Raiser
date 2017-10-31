package neu.edu.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import neu.edu.bean.UserPayementBean;
import neu.edu.bean.UserProjectBean;
import neu.edu.bean.UserSessionInfo;
import neu.edu.controller.input.UserLoginBean;
import neu.edu.dao.UserDAO;
import neu.edu.entity.Funder;
import neu.edu.entity.Payement;
import neu.edu.entity.User;

@Service
public class PayementService {
	
	@Autowired
	private UserDAO userDao;
	
//	@Transactional
//	public Integer validateUser(UserLoginBean loginBean){
//		System.out.println("Service is called ");
//		String username = loginBean.getUsername();
//		String password = loginBean.getPassword();
//		User user = userDao.validateUser(username,password);
//		
//		if (user == null) {
//			System.out.println("User Not Found");
//			return null;
//		} else {
//			System.out.println("User  Found");
//			return user.getUserId();
//		}
//	}
//	@Transactional
//	public UserSessionInfo fetchUserAccountDetails(Integer userId) {
//		// TODO Auto-generated method stub
//		UserSessionInfo userSessionInfo=null;
//		
//		User user = userDao.fetchUserAccount(userId);
//		if(user!=null){
//			userSessionInfo = new UserSessionInfo(user.getUserId());
//			userSessionInfo.setName(user.getFirstName()+user.getLastName());
//			userSessionInfo.getUserInformationBean().setUserName(user.getUserName()); 
//			userSessionInfo.setRole(user.getRole());
//		}
//		
//		System.out.println(user.getFirstName()+user.getLastName());
////		for(UserProject userProject:userAccount.getUserProjects()){
////			UserProjectBean userProjectBean = new UserProjectBean(userProject.getId().getName(), userProject.getDescription());
////			userSessionInfo.getUserProjectBeans().add(userProjectBean);
////			System.out.println(userProject.getId().getName());
////		}
//		return userSessionInfo;
//	}
//
//	public User getUser(int userId) {
//		// TODO Auto-generated method stub
//		User user = userDao.getUser(userId);
//		
//		
//		return user;
//	}
//	
//	public Integer fetchFunder(Integer userId){
//		
//		User user = userDao.fetchUserAccount(userId);
//		Funder funder = userDao.fetchFunder(user);
//		
//		
//		return funder.getFunderId();
//	}
	public Integer addPayement(UserPayementBean userPayementBean) {
		
		Payement payement = new Payement();
		
		payement.setAmount(userPayementBean.getAmount());
		payement.setCity(userPayementBean.getCity());
		payement.setName(userPayementBean.getName());
		payement.setFunderFunderId(userPayementBean.getFunderId());
		payement.setProjectProjectId(userPayementBean.getProjectId());
		
		Integer payementId = userDao.addPayement(payement);
		
		return payementId;
	}
	
	
	public List<UserPayementBean> getAllPayements(Integer projId){
	
		List<UserPayementBean> response = new ArrayList<>();
		List<Payement> payements = userDao.getAllPayements(projId);
		
		for(Payement payement : payements){
			UserPayementBean userPayementBean = new UserPayementBean();
			userPayementBean.setAmount(payement.getAmount());
			userPayementBean.setCity(payement.getCity());
			userPayementBean.setName(payement.getName());
			userPayementBean.setProjectId(payement.getProjectProjectId());
			response.add(userPayementBean);
		}
		return response;
	}

	
}
