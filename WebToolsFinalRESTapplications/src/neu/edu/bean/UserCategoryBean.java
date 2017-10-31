package neu.edu.bean;

import java.util.ArrayList;
import java.util.List;


public class UserCategoryBean {
	
	private Integer categoryId;
	private String categoryName;
	private String categoryDescription;
	
	public UserCategoryBean() {
		// TODO Auto-generated constructor stub
	}

	
	
	
	public Integer getCategoryId() {
		return categoryId;
	}



	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	
	public String getCategoryDescription() {
		return categoryDescription;
	}

	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}
	
}
