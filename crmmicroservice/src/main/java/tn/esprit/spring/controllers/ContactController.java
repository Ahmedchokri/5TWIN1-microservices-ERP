package tn.esprit.spring.controllers;

import java.io.IOException;
import java.net.URI;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.AccountRepo;
import tn.esprit.spring.repos.ContactRepo;
import tn.esprit.spring.services.*;
//import lombok.RequiredArgsConstructor;
@CrossOrigin(origins="**")
@RestController
//@RequiredArgsConstructor
@RequestMapping("/api")
public class ContactController {
	@Autowired
	ContactServiceImpl cs ;
	 @Autowired
	 private ContactService ContactService ; 
	 
	 @Autowired
	 private AccountRepo accountRepo ; 
	 
	 @Autowired
	 private ContactRepo contactRepo ;
	 
	 @GetMapping("/contacts")
	   public long countContact(){
	   return contactRepo.count(); 
	   
	   }
	 
	
	 
	 @GetMapping("FindAll")
	   public List<Contact> getContact(){
	   return ContactService.FindAllContact(); 
	   
	   }
	 
	 @PutMapping("/AddContact/{AccountId}")
	   @ResponseBody
	   public void assigncontacttocompte( @PathVariable("AccountId") String AccountId,Contact newContact,@RequestParam("file") MultipartFile image) throws IOException{
		 Account Account = accountRepo.findById(AccountId).get(); 
		 newContact.setAccountId(Account.getAccountName()); 
	     ContactService.assigncontacttocompte(newContact,AccountId,image); 
		   
	   }
	 
	 
	 @DeleteMapping("/RemoveContact/{ContactId}")
	   public void RemoveContact(@PathVariable("ContactId") String ContactId){
		    ContactService.DeleteContact(ContactId);
	   }
	 
	 @PutMapping("/updateContact/{ContactId}")
	   @ResponseBody
	   public Contact modifyClient(@RequestBody Contact newContact, @PathVariable("ContactId") String ContactId,@RequestParam("file") MultipartFile image) throws IOException{
		   return  ContactService.UpdateContact(newContact, ContactId, image); 
		   
		   
	   }
	 
	 
	 	@GetMapping("GetContact/{idContact}")
	 	public Contact getContact(@PathVariable("idContact") String idContact) {
	 		return ContactService.getcontact(idContact); 
	 	}
	 	
//	 	
//	 	@GetMapping("/picture/{id}")
//	 	public String getPicture(@PathVariable(value = "id") String id ){
//	 		Binary pic = ContactService.getPicture(id);
//	 		//model.addAttribute("picture",Base64.getEncoder().encodeToString(u1.getPicture().getData()));
//	 		
//	 	    return Base64.getEncoder().encodeToString(pic.getData());
//	 	}
//	 	 @PutMapping("/AddContact/{AccountId}")
//		   @ResponseBody
//		   public void assigncontacttocompte( @PathVariable("AccountId") String AccountId,@RequestBody Contact newContact, @RequestParam("file") MultipartFile image) throws IOException{
//			 Account Account = accountRepo.findById(AccountId).get(); 
//			 newContact.setAccountId(Account.getAccountName()); 
//		     ContactService.assigncontacttocompte(newContact,AccountId,image); 
//			   
//		   }
}



