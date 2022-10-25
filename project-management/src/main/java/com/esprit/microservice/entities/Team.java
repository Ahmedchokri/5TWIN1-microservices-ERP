package com.esprit.microservice.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "Team")
public class Team implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String disponibility;
	private String secteur;
	@OneToMany(cascade = CascadeType.ALL, mappedBy="team", fetch = FetchType.LAZY)
	private List<Project> projects;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDisponibility() {
		return disponibility;
	}
	public void setDisponibility(String disponibility) {
		this.disponibility = disponibility;
	}
	public String getSecteur() {
		return secteur;
	}
	public void setSecteur(String secteur) {
		this.secteur = secteur;
	}
	public List<Project> getProjects() {
		return projects;
	}
	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}
	public Team(int id, String name, String disponibility, String secteur, List<Project> projects) {
		super();
		this.id = id;
		this.name = name;
		this.disponibility = disponibility;
		this.secteur = secteur;
		this.projects = projects;
	}
	public Team() {
		super();
	}
	
	

}
