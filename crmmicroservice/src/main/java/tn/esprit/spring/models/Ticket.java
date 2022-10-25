package tn.esprit.spring.models;

import java.io.Serializable;
import java.time.LocalDateTime;

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
public class Ticket implements Serializable{
	@Id
	private Long id ;
	private String title ;
	private String description ;
	private LocalDateTime createDate ;
	private TicketStatus status ;
	@OneToOne
	private Opportunity opportunity ;
	@OneToOne
	private User user ;
}
