package tn.esprit.spring.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;



@Service
public class TicketServiceImpl implements TicketService{

	@Autowired
	private TicketRepo ticketRepo ;

	@Autowired
	private UserRepo userRepo ;

	@Autowired
	private OpportunityRepo opportunityRepo ;

	@Override
	public Ticket creatTicket(Ticket ticket, Long idOpportunity, Long idUser) {
		ticket.setStatus(TicketStatus.open);
		ticket.setCreateDate(LocalDateTime.now());
		ticket.setOpportunity(opportunityRepo.findById(idOpportunity).get());
		ticket.setUser(userRepo.findById(idUser).get());
		return ticketRepo.save(ticket);
	}

	@Override
	public void updateTicket(Ticket ticket, Long idOpportunity, Long idUser) {
		ticket.setCreateDate(LocalDateTime.now());
		ticket.setOpportunity(opportunityRepo.findById(idOpportunity).get());
		ticket.setUser(userRepo.findById(idUser).get());
		 ticketRepo.save(ticket);
	}




	@Override
	public Opportunity getOpportunity(Long idTicket) {
		return ticketRepo.findById(idTicket).get().getOpportunity();
	}

	@Override
	public Ticket retrieveTicket(Long id) {
		// TODO Auto-generated method stub
		return ticketRepo.findById(id).get();
	}

	@Override
	public void deleteTicket(Long id) {
		// TODO Auto-generated method stub
		 ticketRepo.deleteById(id);
	}

	@Override
	public void closeTicket(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Ticket> retrieveAllTicket() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Ticket> getticketlist() {
		// TODO Auto-generated method stub
		return (List<Ticket>) ticketRepo.findAll();
	}

	@Override
	public int getTicketsNumber() {
		return ((List<Ticket>) ticketRepo.findAll()).size();
	}
}
