package neu.edu.bean;

import java.util.Date;

public class UserProjectBean {
	
	private int projectId;
	private String projectName;
	private String projectDescription;
	private int projectFundingExpectation;
	private int categoryId;
	private int creatorId;
	private Date projectStartDate;
	private Date projectDeadLine;
	
	public UserProjectBean() {
		// TODO Auto-generated constructor stub
	}
	
	
	
	public UserProjectBean(String projectName, String projectDescription, 
							int projectId, int projectFundingExpectation, int categoryId,
							int creatorId,Date projectStartDate, Date projectDeadLine) {
		super();
		this.projectName = projectName;
		this.projectDescription = projectDescription;
		this.projectId = projectId;
		this.projectFundingExpectation = projectFundingExpectation;
		this.categoryId = categoryId;
		this.creatorId = creatorId;
		this.projectStartDate = projectStartDate;
		this.projectDeadLine = projectDeadLine;
	}



	


	public int getCreatorId() {
		return creatorId;
	}



	public void setCreatorId(int creatorId) {
		this.creatorId = creatorId;
	}



	public Date getProjectStartDate() {
		return projectStartDate;
	}



	public void setProjectStartDate(Date projectStartDate) {
		this.projectStartDate = projectStartDate;
	}



	public Date getProjectDeadLine() {
		return projectDeadLine;
	}



	public void setProjectDeadLine(Date projectDeadLine) {
		this.projectDeadLine = projectDeadLine;
	}



	public int getCategoryId() {
		return categoryId;
	}



	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}



	public int getProjectId() {
		return projectId;
	}



	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}



	public int getProjectFundingExpectation() {
		return projectFundingExpectation;
	}



	public void setProjectFundingExpectation(int projectFundingExpectation) {
		this.projectFundingExpectation = projectFundingExpectation;
	}



	public String getProjectName() {
		return projectName;
	}



	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}



	public String getProjectDescription() {
		return projectDescription;
	}



	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}


}
