package tn.esprit.spring.models;


import java.io.InputStream;
import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.OneToOne;

import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Profile implements Serializable{

	@Id
	@GeneratedValue
	private Long id ;
    private String email ;
    private String fullname ;
    private String name ;
    private String surname ;
    private String formation ;
    private String degree ;
    private String phoneNumber ;
    private String Localisation ;
    private String workplace ;
    private String[] universite ;
    private String experience ;
    private String[] skills ;
    private String[] skillsnotconfirmed ;
    @OneToOne
    private Photo cv ;
  @ManyToOne
private Opportunity opp ;


}
