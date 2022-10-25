package com.esprit.microservice.services;

import com.esprit.microservice.entities.Project;
import com.esprit.microservice.entities.Team;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esprit.microservice.repositories.ProjectRepository;
import com.esprit.microservice.repositories.TeamRepository;

@Service
public class ProjectService {
	@Autowired
	ProjectRepository projectRepository;
	@Autowired
	TeamRepository teamRepository;
	
	public List<Project> getAllProjects(){
			List<Project> projects = (List<Project>) projectRepository.findAll();
			return projects;		
	}
	
	public Project getProjectById(int id){
		return projectRepository.findById(id).get();
	}
	
	public Project addOrUpdateProject(Project p){
		projectRepository.save(p);
		return p;
	}
	
	public void deleteTeam(int id){
		projectRepository.deleteById(id);
	}
	
	public Project addAndAssignProject(Project p, int id){
		Team t = teamRepository.getById(id);
		p.setTeam(t);
		projectRepository.save(p);
		return p;
	}
	
	public Map<String, Integer>  projectsStats() {
		int plan =0,prog=0,stall=0,done =0;
		List<Project> allprojects = (List<Project>) projectRepository.findAll();
		for (Project project : allprojects) {
			if (project.getState().equals("PLANNING")) {
				plan++;
			}else if (project.getState().equals("DONE")) {
				done++;
			} else if (project.getState().equals("STALLED")) {
				stall++;
			} else{
				prog++;
			}
		}
		HashMap<String, Integer> map = new HashMap<>();
		map.put("planning", plan);
		map.put("Done", done);
		map.put("stalled", stall);
		map.put("in_progress", prog);
		map.put("total", allprojects.size());
		return map;
	}
}
