package tn.esprit.spring.services;

import java.io.IOException;
import java.time.Month;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.data.domain.Sort.Direction;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;

@Service
public class LeadServiceImpl implements LeadService{
	
	@Autowired
	LeadRepo leadRepo;

	@Override
	public List<Lead> getAllLeads() {
		return (List<Lead>) leadRepo.findAll();
	}
	
	@Override
	public List<Lead> getNonConvertedLeads(String status) {
		return leadRepo.findByStatusNot(status);
	}

	@Override
	public Lead addLead(Lead l)throws IOException {
		//l.setPicture(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
		//l.setCreationDate(new Date());
		return leadRepo.save(l);
	}
	
  
	@Override
	public Lead updateLead(Lead l, MultipartFile file)throws IOException {
		if(file != null) {
		//l.setPicture(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
		}else {
		//	l.setPicture(new Binary(BsonBinarySubType.BINARY, getPicture(l.getId()).getData()));
		}
		//l.setPicture(getPicture(l.getId()));
		return leadRepo.save(l); 
	}


	@Override
	public Lead updateLeadStatus(Lead l, MultipartFile file)throws IOException {
		//l.setPicture(new Binary(BsonBinarySubType.BINARY, getPicture(l.getId()).getData()));
		return leadRepo.save(l);
	}

	@Override
	public void deleteLead(Long id) {
		// TODO Auto-generated method stub
		leadRepo.existsById(id);
	}

}
