package tn.esprit.microservice.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table (name="Partenaire")
public class Partenaire implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="idP")
	  private long  idP ;
	  private String nom;
	  private String email;
	  private String tel;
	  @OneToMany(cascade=CascadeType.ALL,mappedBy="partenaire")
	  @JsonIgnore
	  private Set<Produit> produit;
	
	  public long getIdP() {
		return idP;
	}
	public void setIdP(long idP) {
		this.idP = idP;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public Set<Produit> getProduit() {
		return produit;
	}
	public void setProduit(Set<Produit> produit) {
		this.produit = produit;
	}
	public Partenaire(String nom, String email, String tel, Set<Produit> produit) {
		super();
		this.nom = nom;
		this.email = email;
		this.tel = tel;
		this.produit = produit;
	}
	public Partenaire() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
