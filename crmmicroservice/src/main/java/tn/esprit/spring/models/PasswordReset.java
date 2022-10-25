package tn.esprit.spring.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordReset implements Serializable{

	@Id
	private String id;
	private String token;
	private String createdAt;
	@OneToOne
	private User user = new User();

}
