package tn.esprit.spring.services;

import java.util.List;

import org.springframework.stereotype.Service;
import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;
public interface ServiceWeeklyMeeting {
public WeeklyMeeting AddWeeklyMeeting(WeeklyMeeting WeeklyMeeting  ); 
public List<WeeklyMeeting> GetAllWeeklyMeeting (); 
public WeeklyMeeting GetWeeklyMeeting(String idWeeklyMeeting ); 
public WeeklyMeeting updateWeeklyMeeting (WeeklyMeeting weeklyMeeting, String idWeeklyMeeting ) ; 
public void deleteWeeklyMeeting (String idWeeklyMeeting) ; 
}
