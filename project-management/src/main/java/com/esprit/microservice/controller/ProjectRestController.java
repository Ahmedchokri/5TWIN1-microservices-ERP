package com.esprit.microservice.controller;

import java.util.List;
import java.util.Map;

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

import com.esprit.microservice.entities.Project;
import com.esprit.microservice.services.ProjectService;

@RestController
@RequestMapping("/project")
public class ProjectRestController {
	@Autowired
	private ProjectService ps;
	
	@GetMapping("getAllProjects")
	public List<Project> getAllProjects(){
		return ps.getAllProjects();
	}
	
	@GetMapping("getProject/{project-id}")
	public Project getProjectById(@PathVariable("project-id") int id){
		return ps.getProjectById(id);
	}

	@PostMapping("/add-project")
	@ResponseBody
	public Project addProject(@RequestBody Project p){
		return ps.addOrUpdateProject(p);
	}
	@PutMapping("/edit-project")
	@ResponseBody
	public Project editProject(@RequestBody Project p){
		return ps.addOrUpdateProject(p);
	}
	
	@DeleteMapping("/deleteProject/{project-id}")
	public void deleteProject(@PathVariable("project-id") int id){
		ps.deleteTeam(id);
	}
	@PostMapping("/addAndAssignProject/{team-id}")
	@ResponseBody
	public Project addAndAssignProject(@RequestBody Project p, @PathVariable("team-id") int id){
		return ps.addAndAssignProject(p, id);
	}
	@GetMapping("/getStats")
	@ResponseBody
	public Map<String, Integer>  getStats(){
		return ps.projectsStats();
	}
}
