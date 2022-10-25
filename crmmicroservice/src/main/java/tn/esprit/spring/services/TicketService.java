package tn.esprit.spring.services;

import java.util.List;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;

public interface TicketService {

	Ticket creatTicket(Ticket ticket , Long idOpportunity, Long idUser);
	void updateTicket(Ticket ticket , Long idOpportunity, Long idUser);
	Ticket retrieveTicket(Long id);
	void deleteTicket(Long id);
	void closeTicket(Long id);
	List<Ticket> retrieveAllTicket();
	Opportunity getOpportunity (Long idTicket);
	List<Ticket> getticketlist();
	int getTicketsNumber();

}
