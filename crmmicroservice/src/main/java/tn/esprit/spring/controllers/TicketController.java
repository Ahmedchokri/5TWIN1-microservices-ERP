package tn.esprit.spring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import tn.esprit.spring.models.Opportunity;
import tn.esprit.spring.models.Ticket;
import tn.esprit.spring.services.TicketService;

@CrossOrigin(origins="**")
@RestController
@RequestMapping(value = "/template")
public class TicketController {

	@Autowired
	private TicketService ticketService ;

	  @PostMapping("addticket/{idopportunity}/{iduser}")
	  public void addNewticket(@RequestBody Ticket ticket,@PathVariable("idopportunity") Long idopportunity,@PathVariable("iduser") Long iduser) {
		  ticketService.creatTicket(ticket, idopportunity, iduser);
	  }
	  @GetMapping("getopportunity/{ticketid}")
	  public Opportunity getopportunity(@PathVariable("ticketid") Long ticketid){
		  return ticketService.getOpportunity(ticketid);
	  }
	  @PutMapping("updateticket/{idopportunity}/{iduser}")
	  public void updateticket(@RequestBody Ticket ticket,@PathVariable("idopportunity") Long idopportunity,@PathVariable("iduser") Long iduser){
		   ticketService.updateTicket(ticket, idopportunity, iduser);
	  }
	  @GetMapping("getticket")
	  public List<Ticket> getticket(){
		  return ticketService.getticketlist();
	  }



	@GetMapping("getticket/{id}")
	public Ticket gettOneicket(@PathVariable("id")Long id){
		return ticketService.retrieveTicket(id);
	}
	  @DeleteMapping("deleteticket/{idticket}")
	  public void deleteticket(@PathVariable("idticket") Long ticketid){
		  ticketService.deleteTicket(ticketid);
	  }

	@GetMapping("getticketNumber")
	public int getTicketNumber() {
		return ticketService.getTicketsNumber();
	}
}
