package tn.esprit.spring.repos;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import tn.esprit.spring.models.*;

public interface WeeklyMeetingRepo extends CrudRepository <WeeklyMeeting,String> {
	
	//public String findById(String _Id);

}
