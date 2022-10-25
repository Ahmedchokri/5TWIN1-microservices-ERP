package tn.esprit.spring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tn.esprit.spring.models.WeeklyMeeting;
import tn.esprit.spring.services.ServiceWeeklyMeeting;


@RestController
@RequestMapping("/WeeklyMeeting")
public class WeeklyMeetingController {
	
	@Autowired
	ServiceWeeklyMeeting WeeklyService ; 

		@GetMapping("/GetAllWeelyMeeting")
		public List<WeeklyMeeting> getAllWeeklyMeeting (){
			return WeeklyService.GetAllWeeklyMeeting(); 
		}
		
		@GetMapping("/GetWeeklyMeetiing/{idWeeklyMeeting}")
		public WeeklyMeeting getWeeklyMeeting(@PathVariable("idWeeklyMeeting") String idWeeklyMeeting ) {
			return WeeklyService.GetWeeklyMeeting(idWeeklyMeeting); 
		}
		
		@PostMapping("/AddWeeklyMeeting")
		public WeeklyMeeting addWeeklyMeeting (@RequestBody WeeklyMeeting weeklyMeeting) {
			return WeeklyService.AddWeeklyMeeting(weeklyMeeting); 
		}
		
		@DeleteMapping("/DeleteWeeklyMeetiing/{idWeeklyMeeting}")
		public void deleteWeeklyMeeting (@PathVariable("idWeeklyMeeting") String idWeeklyMeeting) {
			WeeklyService.deleteWeeklyMeeting(idWeeklyMeeting); 
		}
		
		@PutMapping("/UpdateWeeklyMeetiing/{idWeeklyMeeting}")
		public WeeklyMeeting updateWeeklyMeeting (@RequestBody WeeklyMeeting weeklyMeeting, @PathVariable("idWeeklyMeeting") String idWeeklyMeeting){
			return WeeklyService.updateWeeklyMeeting(weeklyMeeting, idWeeklyMeeting); 
		}
		
	}
	

