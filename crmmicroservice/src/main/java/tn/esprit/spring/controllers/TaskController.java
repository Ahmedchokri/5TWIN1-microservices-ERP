package tn.esprit.spring.controllers;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tn.esprit.spring.models.Lead;
import tn.esprit.spring.models.Task;
import tn.esprit.spring.services.TaskServiceImpl;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/task")
public class TaskController {
	
	@Autowired
	TaskServiceImpl ts ;
	
	@GetMapping("/displayall")
	public List<Task> getAllTasksC() {
		return ts.getAllTasks();
	}
	
	@GetMapping("/displaybyuser/{idUser}")
	public List<Task> getTasksByUserC(@PathVariable(value = "idUser") Long idUser) {
		return ts.getTasksByUser(idUser);
	}
	
	@GetMapping("/displaybysubject/{subject}")
	public List<Task> getTasksBySubjectC(@PathVariable(value = "subject") String subject) {
		return ts.getTasksBySubject(subject);
	}
	
	@GetMapping("/displaybystatus/{status}")
	public List<Task> getTasksByStatusC(@PathVariable(value = "status") String status) {
		return ts.getTasksByStatus(status);
	}
	
	@GetMapping("/displaybyowner/{idUser}")
	public List<Task> getTasksByOwnerC(@PathVariable(value = "idUser") Long idUser) {
		return ts.getTasksByOwner(idUser);
	}
	
	@PostMapping("/add")
	public Task addTaskC(@RequestBody Task t) {
			return ts.addTask(t);
	}
	
	@DeleteMapping("/delete/{idTask}")
	public void deleteTaskC(@PathVariable(value = "idTask") String idTask) throws NoSuchElementException {
		ts.deleteTask(idTask);
	}
	
	
	@PutMapping("/update")
	public Task updateTaskC(@RequestBody Task t) {
		return ts.updateTask(t);
	} 
	
	
	@GetMapping("/retrive/{idTask}")
	public Optional<Task> retrieveTaskC(@PathVariable(value = "idTask") String idTask) throws NoSuchElementException{
		return ts.getTaskById(idTask) ;
	}

}