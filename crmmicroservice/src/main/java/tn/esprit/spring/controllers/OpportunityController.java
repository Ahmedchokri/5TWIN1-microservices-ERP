package tn.esprit.spring.controllers;

import java.util.Date;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import tn.esprit.spring.models.Contact;
import tn.esprit.spring.models.Country;
import tn.esprit.spring.models.Opportunity;
import tn.esprit.spring.models.OpportunityStatus;
import tn.esprit.spring.models.Opportunityanalysis;
import tn.esprit.spring.models.Profile;
import tn.esprit.spring.repos.OpportunityRepo;
import tn.esprit.spring.repos.ProfilRepo;
import tn.esprit.spring.services.OpportunityService;
import tn.esprit.spring.services.OpportunityServiceImpl;
@CrossOrigin(origins = "**")
@RestController
@RequestMapping(value = "/template")
public class OpportunityController {

	
	@Autowired
	private OpportunityRepo oppr;
	@Autowired
	private OpportunityService oppserv;
	@Autowired
	private OpportunityServiceImpl opps;
	
	

	
	  @PostMapping("addopportunity")
	  public void addNewOpportunity(@RequestBody Opportunity opportunity) {
		  oppr.save(opportunity);
	  }
	  @PostMapping("assignopportunity/{idcontact}/{idcountry}")
	  public void assignopportunity(@RequestBody Opportunity opportunity, @PathVariable("idcontact") String contactid, @PathVariable("idcountry") String idcountry)  {
		  oppserv.Assigncontacttopportunity(opportunity, contactid,idcountry);
	  }
	  @GetMapping("getcontatcfromopp/{idoppo}")
	  public Contact getcontatcfromopp(@PathVariable("idoppo") Long idOppo)  {
		  return oppserv.getcontactofopportunity(idOppo);
	  }
	  @GetMapping("getlistopportunity")
	  public List<Opportunity> getlistopportunity(){
		  return oppserv.getlistopportunity();
	  }
	  @GetMapping("getopportunitybyid/{idoppo}")
	  public Opportunity getopportunitybyid(@PathVariable("idoppo") Long idOppo){
		  return oppserv.getopportunitybyid(idOppo);
	  }
	  @GetMapping("getlistcountry")
	  public List<Country> getlistcountry(){
		  return oppserv.getcountrylist();
	  }
	  @DeleteMapping("deleteopp/{idoppo}")
	  public void deleteopp(@PathVariable("idoppo") Long idOppo){
		  oppserv.deleteopp(idOppo);
	  }

	  @PostMapping("changestatusopportunity/{idoppo}")
	  public void changestatusopportunity(@RequestBody OpportunityStatus oppstatus, @PathVariable("idoppo") Long idoppo)  {
		  oppserv.Changestatusopportunity(oppstatus, idoppo);
	  }
	  @PostMapping("affecteroppoanalysistoopp/{idoppo}")
	  public void affecteroppoanalysistoopp(@RequestBody Opportunityanalysis oppoanalysis, @PathVariable("idoppo") Long idoppo)  {
		  oppserv.affecteroppoanalysistoopp(oppoanalysis, idoppo);
	  }
	  @PostMapping("setfinalstatusoppo/{idoppo}")
	  public void setfinalstatusoppo(@RequestBody Opportunity oppo, @PathVariable("idoppo") Long idoppo){
		  System.out.println(oppo.toString());
		  oppserv.setfinalstatusoppo(oppo, idoppo);
	  }
	  @GetMapping("get_Profil_Opportunities/{idProfile}")
	  public List<Opportunity> get_Profil_Opportunities(@PathVariable("idProfile") String idProfile){
		  return oppserv.get_Profil_Opportunities(idProfile);
	  }
	  
	  
	  @PostMapping("assignCountryToOpp/{idOpp}/{idCountry}")
	  public Opportunity assignCountryToOpp(@PathVariable(value = "idOpp") Long idOpp,@PathVariable(value = "idCountry") String idCountry)  {
		  return opps.assignCountryToOpportunity(idOpp,idCountry);
	  }
	  @PostMapping("addCountry")
	  public Country addCountry(@RequestBody Country country)  {
		  return opps.addCountry(country);
	  }
	  

	
	  
	  @GetMapping("/countOpp")
	  public ResponseEntity countOpp() {

		  return ResponseEntity.ok().body(oppr.count());

	  }
	  
}
