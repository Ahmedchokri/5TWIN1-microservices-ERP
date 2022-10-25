package com.esprit.microservice.controller;

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

import com.esprit.microservice.entities.Team;
import com.esprit.microservice.services.TeamService;

@RestController
@RequestMapping("/team")
public class TeamRestController {
	@Autowired
	private TeamService ts;
	
	//http://localhost:8761/team/getAllTeams
	@GetMapping("/getAllTeams")
	public List<Team> getAllTeams(){
		return ts.AllTeams();
	}

	@GetMapping("/getTeam/{team-id}")
	public Team getTeamById(@PathVariable("team-id") int id){
		return ts.getTeamById(id);
	}
	@PostMapping("/add-team")
	@ResponseBody
	public Team addTeam(@RequestBody Team t){
		return ts.addOrUpdateTeam(t);
	}
	@PutMapping("/edit-team")
	@ResponseBody
	public Team editTeam(@RequestBody Team t){
		return ts.addOrUpdateTeam(t);
	}
	@DeleteMapping("/deleteTeam/{team-id}")
	public void deleteTeam(@PathVariable("team-id") int id){
		ts.deleteTeam(id);
	}
}
