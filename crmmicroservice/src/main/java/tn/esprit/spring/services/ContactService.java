package tn.esprit.spring.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import tn.esprit.spring.models.Contact;

public interface ContactService {
//	public Contact addContact(Contact newContact ); 
	public List<Contact> FindAllContact(); 
	public Contact UpdateContact(Contact newContact , String IdContact, MultipartFile file) throws IOException ; 
	public void DeleteContact(String IdContact);
	public void assigncontacttocompte(Contact newContact, String accountid, MultipartFile file) throws IOException ; 
	public Contact getcontact(String contactid); 
	
	
	
}
