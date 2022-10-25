package tn.esprit.microservice.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name="Produit")
public class Produit implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="idPr")
	  private long  idPr ;
	  private String libele;
	  private String prixUni;
	  @ManyToOne
	  Partenaire partenaire;
	  
	public long getIdPr() {
		return idPr;
	}
	public void setIdPr(long idPr) {
		this.idPr = idPr;
	}
	public String getLibele() {
		return libele;
	}
	public void setLibele(String libele) {
		this.libele = libele;
	}
	public String getPrixUni() {
		return prixUni;
	}
	public void setPrixUni(String prixUni) {
		this.prixUni = prixUni;
	}
	public Partenaire getPartenaire() {
		return partenaire;
	}
	public void setPartenaire(Partenaire partenaire) {
		this.partenaire = partenaire;
	}
	public Produit(String libele, String prixUni, Partenaire partenaire) {
		super();
		this.libele = libele;
		this.prixUni = prixUni;
		this.partenaire = partenaire;
	}
	public Produit() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	  

}
