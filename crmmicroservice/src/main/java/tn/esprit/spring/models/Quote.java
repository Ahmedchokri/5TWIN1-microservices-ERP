package tn.esprit.spring.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Quote implements Serializable{

	@Id
	private String id ;
	private String quoteName ;
    private float amount ;
@ManyToOne
private Opportunity opp;


}
