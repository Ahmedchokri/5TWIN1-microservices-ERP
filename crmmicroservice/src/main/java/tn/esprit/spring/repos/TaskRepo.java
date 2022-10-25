package tn.esprit.spring.repos;

import java.util.List;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tn.esprit.spring.models.*;


@Repository
public interface TaskRepo extends CrudRepository <Task,String>{

	List<Task> findByAssignedTo(User assignedTo);
	List<Task> findBySubject(String subject);
	List<Task> findByOwner(User owner);
	List<Task> findByStatus(String status);
	
}