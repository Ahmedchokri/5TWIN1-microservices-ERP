package com.esprit.microservice.entities;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Project")
public class Project implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String description;
	private String estimated_Value;
	private String state;
	private Date date_deb; 
	private Date date_Fin;
	@JsonIgnore
	@ManyToOne
	private Team team;
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getEstimated_Value() {
		return estimated_Value;
	}
	public void setEstimated_Value(String estimated_Value) {
		this.estimated_Value = estimated_Value;
	}
	public Date getDate_deb() {
		return date_deb;
	}
	public void setDate_deb(Date date_deb) {
		this.date_deb = date_deb;
	}
	public Date getDate_Fin() {
		return date_Fin;
	}
	public void setDate_Fin(Date date_Fin) {
		this.date_Fin = date_Fin;
	}
	public Team getTeam() {
		return team;
	}
	public void setTeam(Team team) {
		this.team = team;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public Project(int id, String name, String description, String estimated_Value, String state, Date date_deb,
			Date date_Fin, Team team) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.estimated_Value = estimated_Value;
		this.state = state;
		this.date_deb = date_deb;
		this.date_Fin = date_Fin;
		this.team = team;
	}
	public Project() {
		super();
	} 
	
	
}
