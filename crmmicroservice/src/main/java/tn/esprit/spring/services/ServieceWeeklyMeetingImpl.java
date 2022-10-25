package tn.esprit.spring.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;

@Service

public class ServieceWeeklyMeetingImpl implements ServiceWeeklyMeeting {
	
	@Autowired
	TaskRepo taskRepo;
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	WeeklyMeetingRepo weeklyRepo;

	@Override
	public WeeklyMeeting AddWeeklyMeeting(WeeklyMeeting WeeklyMeeting) {
		/*	List<User> users = new ArrayList<User>() ; 
			List<Task> tasks = new ArrayList<Task>(); 
			for (User participent : WeeklyMeeting.getParticipents()){
				User user = userRepo.findByUserName(participent.getUserName());
				users.add(user); 
			}
//			for (Task task : WeeklyMeeting.getTasks()) {
//				Task taskadd = taskRepo.findById(task.getId()).get();
//				tasks.add(taskadd); 
//			}
			WeeklyMeeting.setParticipents(users);
		//	WeeklyMeeting.setTasks(tasks);
			weeklyRepo.save(WeeklyMeeting); 
			*/
			
		return WeeklyMeeting;
	}

	@Override
	public List<WeeklyMeeting> GetAllWeeklyMeeting() {
		// TODO Auto-generated method stub
		return (List<WeeklyMeeting>) weeklyRepo.findAll();
	}

	@Override
	public WeeklyMeeting GetWeeklyMeeting(String idWeeklyMeeting) {
		// TODO Auto-generated method stub
		return weeklyRepo.findById(idWeeklyMeeting).get();
	}

	@Override
	public WeeklyMeeting updateWeeklyMeeting(WeeklyMeeting weeklyMeeting , String idWeeklyMeeting ) {
		WeeklyMeeting weeklyMeetingUpdate = weeklyRepo.findById(idWeeklyMeeting).get(); 
		/*List<User> users = new ArrayList<User>() ; 
		List<Task> tasks = new ArrayList<Task>(); 
	
		for (User participent : weeklyMeeting.getParticipents()){
			User user = userRepo.findByUserName(participent.getUserName());
			users.add(user); 
		}
		for (Task task : weeklyMeeting.getTasks()) {
			Task taskadd = taskRepo.findById(task.getId()).get();
			tasks.add(taskadd); 
		}
		weeklyMeeting.setParticipents(users);
		weeklyMeeting.setTasks(tasks);
		weeklyMeetingUpdate = weeklyMeeting ; 
		weeklyRepo.save(weeklyMeetingUpdate); */
		return weeklyMeetingUpdate;
		
	}

	@Override
	public void deleteWeeklyMeeting(String idWeeklyMeeting) {
		// TODO Auto-generated method stub
		weeklyRepo.deleteById(idWeeklyMeeting);
		
		
	}
	
	

}
