package tn.esprit.microservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.esprit.microservice.entites.AgentRH;
import tn.esprit.microservice.repository.agentRHRepository;

@Service
public class AgentRHService {
	
	@Autowired
	agentRHRepository ar;

	
	public List<AgentRH> findAllAgent(){
		List<AgentRH> Agents= ar.findAll();
		return Agents;
	}
	public AgentRH addAgent(AgentRH agent) {
		return ar.save(agent);
	}
	
	public AgentRH getAgentbyId(Long id) {
		return ar.findById(id).get();
	}
	
	public void deleteAgent(Long id) {
		ar.deleteById(id);
	}
	
	public void updateAgent(AgentRH agent) {
		 ar.save(agent);
	}

}
