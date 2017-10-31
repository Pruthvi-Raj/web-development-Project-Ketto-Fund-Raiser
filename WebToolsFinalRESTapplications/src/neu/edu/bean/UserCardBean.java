package neu.edu.bean;

import java.util.Date;

public class UserCardBean {

	private String type;
	private String firstName;
	private String lastName;
	private int cardNumber;
	private int cvv;
	private Date dox;
	private int funder_FunderId;
	
	
	
	
	public int getFunder_FunderId() {
		return funder_FunderId;
	}
	public void setFunder_FunderId(int funder_FunderId) {
		this.funder_FunderId = funder_FunderId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public int getCardNumber() {
		return cardNumber;
	}
	public void setCardNumber(int cardNumber) {
		this.cardNumber = cardNumber;
	}
	public int getCvv() {
		return cvv;
	}
	public void setCvv(int cvv) {
		this.cvv = cvv;
	}
	public Date getDox() {
		return dox;
	}
	public void setDox(Date dox) {
		this.dox = dox;
	}
}
