package com.esprit.microservice.services;
import com.esprit.microservice.entities.Team;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esprit.microservice.repositories.TeamRepository;

@Service
public class TeamService {
	@Autowired
	TeamRepository teamRepository;
	public List<Team> AllTeams(){
		List<Team> teams = (List<Team>) teamRepository.findAll();
		return teams;
	}
	
	public Team getTeamById(int id){
		return teamRepository.findById(id).get();
	}
	
	public Team addOrUpdateTeam(Team t){
		teamRepository.save(t);
		return t;
	}
	
	public void deleteTeam(int id){
		teamRepository.deleteById(id);
	}
	

}
