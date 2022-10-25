package tn.esprit.microservice.entites;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Employee")
public class Employee implements Serializable {
	
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="idEmployee")
	private int idEmployee;
	
	private String nom,prenom;
	private float salaire;
	private int telephone;
	
	
	public Employee (String nom,String prenom , float salaire, int telephone) {
		super();
		this.nom=nom;
		this.prenom=prenom;
		this.salaire=salaire;
		this.telephone=telephone;
	}
	
	
	
	
	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}




	public int getIdEmployee() {
		return idEmployee;
	}


	public void setIdEmployee(int idEmployee) {
		this.idEmployee = idEmployee;
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
	public float getSalaire() {
		return salaire;
	}
	public void setSalaire(float salaire) {
		this.salaire = salaire;
	}
	public int getTelephone() {
		return telephone;
	}
	public void setTelephone(int telephone) {
		this.telephone = telephone;
	}
	
	

}
