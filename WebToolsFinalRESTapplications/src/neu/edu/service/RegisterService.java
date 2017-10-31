package neu.edu.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neu.edu.bean.UserCardBean;
import neu.edu.bean.UserRegistrationBean;
import neu.edu.dao.UserDAO;
import neu.edu.entity.Creator;
import neu.edu.entity.Creditcard;
import neu.edu.entity.Funder;
import neu.edu.entity.User;

@Service
public class RegisterService {

	@Autowired
	private UserDAO userDao;

	public Integer createUser(UserRegistrationBean userRegistrationBean) {

		User user = new User();
		Creator creator = null;
		Funder funder = null;
		String password = userRegistrationBean.getPassword();
		Integer pass = password.hashCode();
		
		
		user.setFirstName(userRegistrationBean.getFirstName());
		user.setLastName(userRegistrationBean.getLastName());
		user.setTitle(userRegistrationBean.getTitle());
		System.out.println(userRegistrationBean.getFirstName());
		
		user.setUserName(userRegistrationBean.getUsername());
		user.setPassword(pass);
		user.setEmail(userRegistrationBean.getEmail());
		user.setPhone(userRegistrationBean.getPhone());
		user.setRole(userRegistrationBean.getRole());
		// 2017-12-31
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		if (userRegistrationBean.getDob() != null) {
			try {
				user.setDob(sdf.parse(userRegistrationBean.getDob()));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		user = userDao.createUser(user);
		if(user!=null){
			if(user.getRole().equals("Creator")){
				creator = new Creator();
				creator.setCreatorName(user.getFirstName()+user.getLastName());
				creator.setUserUserId(user.getUserId());
			}else{
				funder = new Funder();
				funder.setFunderName(user.getFirstName()+user.getLastName());
				funder.setUser(user);
			}
			Integer Id = userDao.createFunderCreator(creator,funder);
			
			
			return Id;
		}else{
			return null;
		}

	}
	
	public Integer getFunder(User user){
		Integer funderId = userDao.getFunder(user);
		
		
		
		return funderId;
	}

	public String addCard(UserCardBean userCardBean) {
		// TODO Auto-generated method stub
		Creditcard credit = new Creditcard();
		
		credit.setCardNumber(userCardBean.getCardNumber());
		credit.setCvv(userCardBean.getCvv());
		credit.setExpDate(userCardBean.getDox());
		credit.setFirstName(userCardBean.getFirstName());
		credit.setFunderFunderId(userCardBean.getFunder_FunderId());
		credit.setLastName(userCardBean.getLastName());
		credit.setType(userCardBean.getType());
		
		
		System.out.println(credit.getCardNumber());
		String msg = userDao.addCard(credit);
		
		return msg;
	}
	
}
