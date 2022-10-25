package tn.esprit.spring.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


import org.omg.CORBA.Any;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tn.esprit.spring.models.Lead;
import tn.esprit.spring.models.LeadSource;
import tn.esprit.spring.models.LeadStatus;
import tn.esprit.spring.repos.ContactRepo;
import tn.esprit.spring.repos.LeadRepo;
import tn.esprit.spring.services.LeadServiceImpl;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/lead")
public class LeadController {

	@Autowired
	LeadServiceImpl ls;

	@Autowired
	private LeadRepo leadRepo;


	
	
	

	@GetMapping("/display")
	public List<Lead> retrieveAllLeadsC() {
		return ls.getAllLeads();
	}
	
	@GetMapping("/displayNonConverted")
	public List<Lead> retrieveNonConvertedLeadsC() {
		return ls.getNonConvertedLeads("Converted") ;
	}
	
//	@GetMapping("/picture/{id}")
//    public String getPicture(@PathVariable(value = "id") ObjectId id ){
//    	Binary pic = ls.getPicture(id);
//    	//model.addAttribute("picture",Base64.getEncoder().encodeToString(u1.getPicture().getData()));  	
//        return Base64.getEncoder().encodeToString(pic.getData());
//    }
	@PostMapping("/add")
	public Lead addLeadC( @RequestBody Lead l) throws IOException {
			return ls.addLead(l);
	}
/*
	@DeleteMapping("/delete/{idLead}")
	public void deleteLeadC(@PathVariable(value = "idLead") ObjectId idLead) throws NoSuchElementException {
		ls.deleteLead(idLead);
	}*/

	@PutMapping("/update")
	public Lead updateLeadC(Lead l, MultipartFile file)throws IOException {
		return ls.updateLead(l,file);
	} 
	
	@PutMapping("/updateStatus")
	public Lead updateLeadStatusC(Lead l, MultipartFile file)throws IOException{
		return ls.updateLeadStatus(l,file);
	} 
	/*
	@GetMapping("/retrive/{idLead}")
	public Optional<Lead> getLeadDetailsC(@PathVariable(value = "idLead") ObjectId idLead) throws NoSuchElementException{
		return ls.getLeadDetails(idLead) ;
	}
*/

}
