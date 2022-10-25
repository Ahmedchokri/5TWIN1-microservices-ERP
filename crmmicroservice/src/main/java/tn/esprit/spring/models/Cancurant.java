package tn.esprit.spring.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Cancurant implements Serializable{

	@Id
	private String id ;
    private String concurantname ;
    private String prix ;
    private ReputationStatus reputation ;
    private float part_pourcentage;
    @ManyToOne
    private Opportunityanalysis oppana;
}
