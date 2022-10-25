package tn.esprit.spring.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;

@Service
//@RequiredArgsConstructor
@Transactional
//@Slf4j
public class ContactServiceImpl implements ContactService {

	 @Autowired
	 private ContactRepo ContactRepo ; 
	 @Autowired
		private AccountRepo accountrepo ;
	
//	@Override
//	public Contact addContact(Contact newContact) {
//		// TODO Auto-generated method stub
//		ContactRepo.save(newContact); 
//		return newContact;
//	}

	@Override
	public List<Contact> FindAllContact() {
		// TODO Auto-generated method stub
		return (List<Contact>) ContactRepo.findAll();
	}

	@Override
	public Contact UpdateContact(Contact newContact, String IdContact, MultipartFile file) throws IOException {
		// TODO Auto-generated method stub
		Contact updatedContact = ContactRepo.findById(IdContact).get();
		//updatedContact.setPicture(new Binary (BsonBinarySubType.BINARY, file.getBytes()));
//		updatedContact.setAccount(newContact.getAccount());
		updatedContact.setEmail(newContact.getEmail());
		updatedContact.setFirstName(newContact.getFirstName());
		updatedContact.setLastName(newContact.getLastName());
		updatedContact.setLinkProfile(newContact.getLinkProfile());
		updatedContact.setPhone(newContact.getPhone());
		updatedContact.setPosition(newContact.getPosition());
		ContactRepo.save(updatedContact); 
		return updatedContact ;
	}

	@Override
	public void DeleteContact(String IdContact) {
		// TODO Auto-generated method stub

		ContactRepo.deleteById(IdContact);
		
	}
	
	
	@Override
	public void assigncontacttocompte(Contact newContact, String accountid, MultipartFile file) throws IOException {
		// List<Chauffeur> chauffeurs = new ArrayList<Chauffeur>();
		/// List <Contact>contacts =  new ArrayList<Contact>();
		
		///newContact.setPicture(new Binary (BsonBinarySubType.BINARY, file.getBytes()));
		newContact.setCreationDate(new Date());
		
		Account account = accountrepo.findById(accountid).get();
		
//		account.setContacts(account.getContacts().add(newContact));
//		newContact.setAccount(account);
//		newContact.setAccount(account);
		ContactRepo.save(newContact); 
		
		List<Contact>  contacts= new ArrayList<Contact>();
		contacts =accountrepo.findById(accountid).get().getContacts();
		contacts.add(newContact);
		account.setContacts(contacts);
		accountrepo.save(account)	;
	}
	
	
	// get all information of Contact
	@Override
	public Contact getcontact(String contactid) {
		return ContactRepo.findById(contactid).get(); 
	}
	
//	
//	@Override
//	public void assigncontacttocompte(Contact newContact, String accountid, MultipartFile file) throws IOException {
//		
//			newContact.setPicture(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
//		
//		Account account = accountrepo.findById(accountid).get();
////		newContact.setAccount(account);
//		ContactRepo.save(newContact); 
//		List<Contact>  contacts= new ArrayList<Contact>();
//		contacts =accountrepo.findById(accountid).get().getContacts();
//		contacts.add(newContact);
//		account.setContacts(contacts);
//		accountrepo.save(account)	;
//	}
//	
//	
//	
//	@Override
//    public Binary getPicture(String id) {
//    	Optional<Contact> Contact1 = ContactRepo.findById(id);
//    	
//       
//        return Contact1.get().getPicture();
//    }
	
	
	

	

	
		


}
