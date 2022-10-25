package tn.esprit.spring.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import tn.esprit.spring.models.Lead;

public interface LeadService {

	List<Lead> getAllLeads();
	List<Lead> getNonConvertedLeads(String Status);
	Lead addLead( Lead l) throws IOException;
	//public Binary getPicture(String id);
	void deleteLead(Long id );
	Lead updateLead( Lead l, MultipartFile file)throws IOException;
	Lead updateLeadStatus( Lead l, MultipartFile file)throws IOException;
	//Optional<Lead> getLeadDetails( String id );
	
}
