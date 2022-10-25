package tn.esprit.spring.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Country implements Serializable{

	@Id
	private String id ;
	private String countryName ;
	private String currency;
	@OneToOne
    private Opportunity opp ;
}
