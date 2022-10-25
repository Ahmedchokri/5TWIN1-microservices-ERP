package tn.esprit.spring.services;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;

@Service
public class TaskServiceImpl implements TaskService{

	@Autowired
	TaskRepo taskRepo;
	
	@Autowired
	UserRepo userRepo;
	
	
	@Override
	public List<Task> getAllTasks() {
		return (List<Task>) taskRepo.findAll();
	}

	@Override
	public List<Task> getTasksByUser(Long id) {
		User u = userRepo.findById(id).get();
		return taskRepo.findByAssignedTo(u);
	}

	@Override
	public List<Task> getTasksBySubject(String subject) {
		return taskRepo.findBySubject(subject);
	}
	
	@Override
	public List<Task> getTasksByOwner(Long id) {
		User u = userRepo.findById(id).get();
		return taskRepo.findByOwner(u);
	}
	
	@Override
	public List<Task> getTasksByStatus(String status) {
		return taskRepo.findByStatus(status);
	}

	@Override
	public Task addTask(Task t) {
	/*	User a = userRepo.findByUserName(t.getAssignedTo().getUserName());
		User o = userRepo.findByUserName(t.getOwner().getUserName());
		t.setAssignedTo(a);
		t.setOwner(o);*/
		return taskRepo.save(t);
	}

	@Override
	public void deleteTask(String id) {
		taskRepo.deleteById(id);
		
	}

	@Override
	public Task updateTask(Task t) {
	/*	User a = userRepo.findByUserName(t.getAssignedTo().getUserName());
		User o = userRepo.findByUserName(t.getOwner().getUserName()); 
		t.setAssignedTo(a);
		t.setOwner(o);*/
		return taskRepo.save(t);
	}

	@Override
	public Optional<Task> getTaskById(String id) {
		return taskRepo.findById(id);
	}



}
