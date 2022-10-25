package tn.esprit.spring.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class WeeklyMeeting implements Serializable{
	
	@Id
	private String _Id ; 
    private Date MeetingDate ;
    @ElementCollection(targetClass=String.class)
    private List<String> comments ;
    private String country;
    private String subject ;
    private Priority Priority ;
    @OneToMany
    private List<User> participents = new ArrayList<>() ;
    @OneToMany
    private List<Task> tasks = new ArrayList<>() ;
	public String get_Id() {
		return _Id;
	}
	public void set_Id(String _Id) {
		this._Id = _Id;
	}
	public Date getMeetingDate() {
		return MeetingDate;
	}
	public void setMeetingDate(Date meetingDate) {
		MeetingDate = meetingDate;
	}
	public List<String> getComments() {
		return comments;
	}
	public void setComments(List<String> comments) {
		this.comments = comments;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public Priority getPriority() {
		return Priority;
	}
	public void setPriority(Priority priority) {
		Priority = priority;
	}
	public List<User> getParticipents() {
		return participents;
	}
	public void setParticipents(List<User> participents) {
		this.participents = participents;
	}
	public List<Task> getTasks() {
		return tasks;
	}
	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
    
    
}
