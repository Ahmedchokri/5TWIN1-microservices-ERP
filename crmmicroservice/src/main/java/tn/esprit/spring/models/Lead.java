package tn.esprit.spring.models;

import javax.persistence.Id;


import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Lead implements Serializable{
	
	@Id
	@GeneratedValue
	private Long id ;
	


    private String firstName ;

    private String lastName ;

    private String email ;

    private Number phone ;

    

    private LeadStatus status;

    private LeadSource leadSource;
    


}
