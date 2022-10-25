package tn.esprit.spring.controllers;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import tn.esprit.spring.models.Account;
import tn.esprit.spring.models.Photo;
import tn.esprit.spring.models.Profile;
import tn.esprit.spring.repos.ProfilRepo;
import tn.esprit.spring.services.OpportunityService;
import tn.esprit.spring.services.ProfilService;


@RestController
@RequestMapping(value = "/template")
public class ProfilController {

	@Autowired
	private ProfilRepo profilrepo;
	@Autowired
	private ProfilService profilser;
	@Autowired
	private OpportunityService opportunityservice;
	  @PostMapping("addprofil/{idphoto}")
	  public void addNewprofil(@PathVariable("idphoto") String id,@RequestBody Profile profil) {
		  profilser.addprofil(profil,id);
		
	  }


	  @PostMapping("assignprofiltoopportunity/{opportunityid}")
	  public void Assignprofiltoopportunity(@RequestBody Profile profil, @PathVariable("opportunityid") Long opportunityid){
		  opportunityservice.Assignprofiltoopportunity(profil, opportunityid);
	  }
	  @GetMapping("getallprofil")
	  public List <Profile> getallprofil(){
		  return profilser.getprofils();
	  }
	  @GetMapping("getprofil/{idprofil}")
	  public Profile getprofil(@PathVariable("idprofil") Long id){
		  return profilser.getprofil(id);
	  }
	  @DeleteMapping("deleteprofil/{idprofil}")
	  public void deleteprofil(@PathVariable("idprofil") Long id){
		   profilser.deleteprofil(id);
	  }
	
	  
}
