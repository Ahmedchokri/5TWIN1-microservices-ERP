package tn.esprit.microservice.entites;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="AgentRH")
public class AgentRH implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name="idAgent")
	private int idAgent;
	
	
	private String nom,prenom,email;
	
	
	
	
	
	public AgentRH() {
		super();
		// TODO Auto-generated constructor stub
	}


	public AgentRH (String nom,String prenom , String email) {
		super();
		this.nom = nom;
		this.prenom=prenom;
		this.email=email;
	}
	

	public int getIdAgent() {
		return idAgent;
	}


	public void setIdAgent(int idAgent) {
		this.idAgent = idAgent;
	}




	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getPrenom() {
		return prenom;
	}


	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}
	
		

}
