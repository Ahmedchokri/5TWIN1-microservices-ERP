package tn.esprit.microservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import tn.esprit.microservice.entites.AgentRH;
import tn.esprit.microservice.service.AgentRHService;

@RestController
@RequestMapping("/agentRH")
public class AgentRestController {

	
	@Autowired
	public AgentRHService ar;
	
	
	@GetMapping("/retrieve-all-agents")
	public List<AgentRH> getAgents() {
		List<AgentRH> list = ar.findAllAgent();
		return list;
	}

	
	@GetMapping("/retrieve-employee/{agent-id}")
	public AgentRH getAgentbyId(@PathVariable("agent-id") Long id) {
		 return ar.getAgentbyId(id);
	}
	
	@PostMapping("/add-agent")
	@ResponseBody
	public AgentRH addAgent(@RequestBody AgentRH a) {
		ar.addAgent(a);
		return a;
	}
	
	@PutMapping("/edit-agent")
	@ResponseBody
	public AgentRH update(@RequestBody AgentRH a) {
		ar.updateAgent(a);
		return a;
	}
	
	@DeleteMapping("/delete-agent/{agent-id}")
	public void removeAgent(@PathVariable("agent-id") Long id) {
		ar.deleteAgent(id);
	}

}
