package tn.esprit.spring.models;

import java.io.Serializable;

import javax.persistence.Entity;

import javax.persistence.Id;
import javax.websocket.Decoder.Binary;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Photo implements Serializable{

	    @Id
	    private String id;
	    
	    private String title;

}
