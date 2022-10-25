package tn.esprit.spring.services;

import java.util.List;
import java.util.Optional;



import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;
public interface TaskService {

	List<Task> getAllTasks();
	List<Task> getTasksByUser( Long idUser );
	List<Task> getTasksBySubject( String subject );
	List<Task> getTasksByOwner( Long idUser );
	List<Task> getTasksByStatus( String status );
	Task addTask( Task t );
	void deleteTask( String id );
	Task updateTask( Task t );
	Optional<Task> getTaskById( String id );
}