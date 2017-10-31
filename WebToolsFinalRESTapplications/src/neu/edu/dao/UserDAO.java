package neu.edu.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import neu.edu.bean.UserCardBean;
import neu.edu.bean.UserCommentBean;
import neu.edu.bean.UserProjectBean;
import neu.edu.bean.UserRegistrationBean;
import neu.edu.entity.Category;
import neu.edu.entity.Comments;
import neu.edu.entity.Creator;
import neu.edu.entity.Creditcard;
import neu.edu.entity.Funder;
import neu.edu.entity.Payement;
import neu.edu.entity.Project;
import neu.edu.entity.Return;
import neu.edu.entity.User;


@Repository
public class UserDAO {

	@Autowired
	private SessionFactory sessionFactory;

	@Transactional
	public User validateUser(String username, String password) {
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("from User where userName=:username and password=:password");
		query.setString("username", username);
		query.setString("password", password.hashCode()+"");
		
		User user = (User) query.uniqueResult();

		return user;

	}
	
	@Transactional
	public User createUser(User user) {
		Session session = sessionFactory.getCurrentSession();
		
		
		Query query = session.createQuery("from User where userName=:username ");
		query.setString("username", user.getUserName());
		
		
		User user1 = (User) query.uniqueResult();
		if(user1==null){
			session.save(user);
			session.flush();
			return user;
		}else{
			return null;
		}
	}
	
	@Transactional
	public Integer createFunderCreator(Creator creator, Funder funder) {
		Session session = sessionFactory.getCurrentSession();
		//session.save(user);
		Integer Id = null;
		if(creator!= null && funder == null){
			session.save(creator);
			Id = creator.getCreatorId();
		}
		else if(creator == null && funder != null){
			session.save(funder);
			Id = funder.getFunderId();
		}
		
		session.flush();
		return Id;
	}
	
	@Transactional
	public User fetchUserAccount(Integer userId) {
		Session session = sessionFactory.getCurrentSession();
		return session.load(User.class, userId);
	}
	
	@Transactional
	public Category fetchCategory(Integer categoryId) {
		Session session = sessionFactory.getCurrentSession();
		return session.load(Category.class, categoryId);
	}
	
	@Transactional
	public Category fetchProject(Integer projectId) {
		Session session = sessionFactory.getCurrentSession();
		return session.load(Category.class, projectId);
	}
	
	
	@Transactional
	public Creator getCreator(Integer userId){
		Session session = sessionFactory.getCurrentSession();
		
		Query query = session.createQuery("from Creator where userUserId=:userId ");
		query.setInteger("userId", userId);
		
		Creator creator = (Creator) query.uniqueResult();
		return creator;
		
	}
	
	@Transactional
	public Funder fetchFunder(User user){
		Session session = sessionFactory.getCurrentSession();
		
		Query query = session.createQuery("from Funder where user=:user ");
		query.setParameter("user",user);
		
		Funder funder = (Funder) query.uniqueResult();
		return funder;
		
	}
	
	@Transactional
	public Funder getFunder(int funderId){
		Session session = sessionFactory.getCurrentSession();
		
		Query query = session.createQuery("from Funder where funderId=:funderId ");
		query.setParameter("funderId",funderId);
		
		Funder funder = (Funder) query.uniqueResult();
		return funder;
		
	}
	
	
	
	
	@Transactional
	public Integer fetchProject(Project project){
		Session session = sessionFactory.getCurrentSession();
		
		Query query = session.createQuery("from Project where projectName=:projectName ");
		query.setParameter("projectName",project.getProjectName());
		
		Project proj = (Project) query.uniqueResult();
		Integer projId = proj.getProjectId();
		return projId;
		
	}
	
	@Transactional
	public Project getProject(Integer projId){
		Session session = sessionFactory.getCurrentSession();
		
		Query query = session.createQuery("from Project where projectId=:projId");
		query.setParameter("projId",projId);
		
		Project proj = (Project) query.uniqueResult();
		
		return proj;
		
	}
	
	
	
	@Transactional
	public Integer addPayement(Payement payement){
		Session session = sessionFactory.getCurrentSession();
		
		
		session.save(payement);
		Integer payId = payement.getPayementId();
		
		return payId;
	}
	
	
	
	
	@Transactional
	public boolean addProject(Project project) {
		
		// TODO Auto-generated method stub
		System.out.println("im am here");
		Session session = sessionFactory.getCurrentSession();
		
//		UserProjectId userProjectId = new UserProjectId(userId, userProjectBean.getName());
//		UserProject userProject = new UserProject();
		
//		userProjectBean.setId(userProjectId);
//		userProject.setDescription(userProjectBean.getDesc());
		
		session.save(project);
		session.flush();
		return true;
	}
	
	
	@Transactional
	public boolean addService(Return retur) {
		
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		
		session.save(retur);
		session.flush();
		return true;
	}

//	@Transactional
//	public boolean updateProject(UserProjectBean userProjectBean, Integer userId) {
//		// TODO Auto-generated method stub
//		Session session = sessionFactory.openSession();
//		
//		UserProjectId userProjectId = new UserProjectId(userId, userProjectBean.getName());
//		UserProject userProject = new UserProject();
//		userProject.setId(userProjectId);
//		userProject.setDescription(userProjectBean.getDesc());
//		
//		session.saveOrUpdate(userProject);
//		session.flush();
//
//		return true;
//	}
	
	
	
	
	
	@SuppressWarnings("unchecked")
	@Transactional
	public Integer getPopularity() {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		//System.out.println(projId);
		Query query = session.createQuery(" projectProjectId from Comments group by projectProjectId order by sum(comments) LIMIT 1");
		 
		Comments com = (Comments) query.uniqueResult();
		Integer projectId = com.getProjectProjectId();
		return projectId;
	}
	
	
	@SuppressWarnings("unchecked")
	@Transactional
	public Integer getPayementTotal(int projId) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		//System.out.println(projId);
		Query query = session.createQuery("count(Amount) from Payement where projectProjectId = projId")
				.setParameter("projId", projId);
		System.out.println(query);
		int i =  (int) query.uniqueResult();
		 return i;		
//		Comments com = (Comments) query.uniqueResult();
//		Integer projectId = com.getProjectProjectId();
//		return projectId;
	}
	
	
	
	
	
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Payement> getAllPayements(int projId) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		System.out.println(projId);
		return session.createQuery(" from Payement where projectProjectId = :projId")
			    .setParameter("projId", projId)
			    .list();
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Payement> getAllCity(int projId) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		System.out.println(projId);
		return session.createQuery(" distinct city from Payement where projectProjectId = :projId")
			    .setParameter("projId", projId)
			    .list();
	}
	
	
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Project> getAllProjects(Integer catId) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		System.out.println(catId);
		return session.createQuery(" from Project where categoryCategoryId = :catId")
			    .setParameter("catId", catId)
			    .list();
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public Integer getAllProjectsDisable(Integer catId) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		System.out.println(catId);
		List<Project> list = session.createQuery(" from Project where categoryCategoryId = :catId")
			    .setParameter("catId", catId)
			    .list();
		int i = list.size();
		if(i == 0){
			return 0;
		}else{
			return i;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Return> getAllServices(Project project) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		//System.out.println(projId);
		return session.createQuery(" from Return where project = :project")
			    .setParameter("project", project)
			    .list();
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Project> getAllProject() {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		
		return session.createQuery(" from Project")
			    .list();
	}
	
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Return> getAllService() {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		
		return session.createQuery(" from Return")
			    .list();
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Category> getAllCategory() {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		return session.createQuery(" from Category ")
			    .list();

	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Category> getfilteredFunderCategory() {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		return session.createQuery(" from Category where isDeleted='0'")
			    .list();

	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Category> getfilteredCreatorCategory() {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		return session.createQuery(" from Category where isEnable='1' and isDeleted='0'")
			    .list();

	}

	@Transactional
	public Category addCategory(Category category) {
		
		// TODO Auto-generated method stub
		System.out.println("im am adding");
		Session session = sessionFactory.getCurrentSession();
		String categoryName = category.getCategoryName();
		Query query = session.createQuery("from Category where categoryName=:categoryname ");
		query.setString("categoryname", categoryName);
		
		Category category1 = (Category) query.uniqueResult();
		if(category1==null){
			session.save(category);
			session.flush();
			return category;
		}else{
			return null;
		}
		
	}
	
//	@Transactional
//	public String disableCategory(Integer category) {
//		// TODO Auto-generated method stub
//		System.out.println("I'm am deleting");
//		Session session = sessionFactory.getCurrentSession();
//		
//		session.update(category);
//		session.flush();
//		String msg = null;
//		
//			msg = "Deleted Successfully";
//			return msg;
//		
//	}
	
	@Transactional
	public int likeProject(Comments comment) {
		System.out.println("reached DAO");
		Session session = sessionFactory.getCurrentSession();
		
		session.save(comment);
		int comments = 1;
		return comments;
	}
	
	
	
	
	@Transactional
	public Integer disableCategory(Integer catId) {
		System.out.println("reached DAO");
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("update Category set isEnable = '0' WHERE categoryId = :catId");
		query.setInteger("catId", catId);
		int result = query.executeUpdate();
		return result;
		
//		
//		String query = "insert into table(remarks,quantity,startTime,endTime) values (?,?,?,?) "
//		         currentCon = ConnectionManager.getConnection();
//		         ps = currentCon.prepareStatement(query);
//		         rs = ps.executeQuery();
	}
	
	@Transactional
	public Integer enableCategory(Integer catId) {
		System.out.println("reached DAO");
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("update Category set isEnable = '1' WHERE categoryId = :catId");
		query.setInteger("catId", catId);
		int result = query.executeUpdate();
		return result;
	}
	
	@Transactional
	public Integer deleteCategory(Integer catId) {
		System.out.println("reached DAO");
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("update Category set isDeleted = '1' WHERE categoryId = :catId");
		query.setInteger("catId", catId);
		int result = query.executeUpdate();
		return result;
	}
	
	
	@Transactional
	public Integer deleteProject(Integer projId) {
		System.out.println("reached DAO");
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("update Project set isDeleted = '1' WHERE projectId = :projId");
		query.setInteger("projId", projId);
		int result = query.executeUpdate();
		return result;
	}
	
	
	
	
	

	public Integer getFunder(User user) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("from Funder where user=:user ");
		query.setEntity("user", user);
		
		Funder funder = (Funder) query.uniqueResult();
		int funderId = funder.getFunderId();
		
		return funderId;
	}
	
	@Transactional
	public String addCard( Creditcard credit) {
		// TODO Auto-generated method stub
		
		Session session = sessionFactory.getCurrentSession();
		
		session.save(credit);
		
		String msg;
		msg = "Card saved";
		return msg;
	}

	public User getUser(int userId) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery("from User where userId=:userId ");
		query.setInteger("userId", userId);
		
		User user = (User) query.uniqueResult();
		
		return user;
	}

}
