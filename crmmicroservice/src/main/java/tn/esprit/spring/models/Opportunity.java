package tn.esprit.spring.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import javax.persistence.Id;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Opportunity implements Serializable{

	@Id
	@GeneratedValue
	private Long id ;
    private String opportunityName ;
    private String description ;
    private float amount ;
    private Date dateclosed ;
    private String reasonlost ;
    private OpportunityStatus status ;
    private OpportunityType opportunityType ;
    @OneToOne(mappedBy="opp")
    private Country country ;
    @OneToOne(mappedBy="opp")
    private Contact contact ;
    @OneToOne(mappedBy="opp")
    private User user ;
    @OneToMany(mappedBy="opp")
    private List<Profile> profils = new ArrayList<Profile>();
    @OneToMany(mappedBy="opp")
    private List<Quote> quotes = new ArrayList<Quote>();
    @OneToOne(mappedBy="opp")
    private Opportunityanalysis opportunityanalysis ;
    
    private Date creationDate;
}
