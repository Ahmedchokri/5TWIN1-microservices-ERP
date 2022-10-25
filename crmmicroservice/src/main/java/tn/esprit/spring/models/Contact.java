package tn.esprit.spring.models;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.websocket.Decoder.Binary;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;


//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;

@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor

public class Contact implements Serializable{
	
	@Id
	private String id ;
    public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	private String firstName ;
    private String lastName ;
    private String email ;
    @OneToOne()
    private Opportunity opp;
    private Number phone ;
    private String linkProfile ;
    private String position ;
    private String accountId ; 
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date creationDate;
  //  private Account Account ; 


public String getAccountId() {
		return accountId;
	}

	//	public Binary getPicture() {
//	return picture;
//}
//public void setPicture(Binary picture) {
//	this.picture = picture;
//}
	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}
	//	public Account getAccount() {
//		return Account;
//	}
//	public void setAccount(Account account) {
//		Account = account;
//	}
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Number getPhone() {
		return phone;
	}
	public void setPhone(Number phone) {
		this.phone = phone;
	}
	public String getLinkProfile() {
		return linkProfile;
	}
	public void setLinkProfile(String linkProfile) {
		this.linkProfile = linkProfile;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	
    
    
    
}
