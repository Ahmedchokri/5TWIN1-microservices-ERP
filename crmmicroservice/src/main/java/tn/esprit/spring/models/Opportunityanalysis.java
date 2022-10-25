package tn.esprit.spring.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Opportunityanalysis implements Serializable{

	@Id
	@GeneratedValue
	private Long id ;
    private String chiffre_affaire ;
    private String maitrise_sujet ;
    private String maitrise_client ;
    private String maitrise_client_remarque ;
    private String[] maitrise_sujet_remarque ;
    private String disponibilite_ressoures ;
    private float risque ;
    @OneToMany(mappedBy="oppana")
    private List<Cancurant> cancurants = new ArrayList<Cancurant>();
    @JsonIgnore
    @OneToOne
    private Opportunity opp ;
}
