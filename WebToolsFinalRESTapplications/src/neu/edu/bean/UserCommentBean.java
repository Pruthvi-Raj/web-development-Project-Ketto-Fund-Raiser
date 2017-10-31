package neu.edu.bean;

import java.util.Date;

public class UserCommentBean {
	
	private int commentId;
	private int funderId;
	private int like;
	private int projectId;
	
	public UserCommentBean() {
		// TODO Auto-generated constructor stub
	}
	
	
	
	public UserCommentBean(int commentId, 
							int funderId, int like, int projectId) {
		super();
		this.commentId = commentId;
		this.like = like;
		this.projectId = projectId;
		this.funderId = funderId;
	}



	public int getCommentId() {
		return commentId;
	}



	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}



	public int getFunderId() {
		return funderId;
	}



	public void setFunderId(int funderId) {
		this.funderId = funderId;
	}



	public int getLike() {
		return like;
	}



	public void setLike(int like) {
		this.like = like;
	}



	public int getProjectId() {
		return projectId;
	}



	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}



	



	



}
