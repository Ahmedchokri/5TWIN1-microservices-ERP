package tn.esprit.spring.services;

import java.time.Month;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;




@Service
public class OpportunityServiceImpl implements OpportunityService{

	
	@Autowired 
	private OpportunityRepo opprepo;
	@Autowired 
	private ContactRepo contactrepo;
	@Autowired 
	private ProfilRepo profilrepo;
	@Autowired 
	private Countryrep countryrepo;

	@Autowired
	private OpportunityanalysisRepo oppanalysisrepo ;

	
	@Override
	public void Assigncontacttopportunity(Opportunity opp, String contactid,String cuntryid) {
		
		Contact c = contactrepo.findById(contactid).get();
		System.out.print(c.toString());
		opp.setStatus(OpportunityStatus.discussion_Stage);
		opp.setContact(c);
		opp.setCountry(countryrepo.findById(cuntryid).get());
		opprepo.save(opp);
		
	}




	@Override
	public Contact getcontactofopportunity(Long idopportuni) {
		return opprepo.findById(idopportuni).get().getContact();

	}
	
	public Country addCountry(Country country) {

		return countryrepo.save(country);

	}

	
	public Opportunity assignCountryToOpportunity(Long idopportuni, String cuntryid) {
		Opportunity opportunity = opprepo.findById(idopportuni).get();
		opportunity.setCountry(countryrepo.findById(cuntryid).get());
		opprepo.save(opportunity);

		return opportunity;

	}




	@Override
	public void Assignprofiltoopportunity(Profile profil, Long opportunityid) {
		profilrepo.save(profil);
		List<Profile>  profils= new ArrayList<Profile>();
		profils =opprepo.findById(opportunityid).get().getProfils();
		profils.add(profil);
		Opportunity opportunity = opprepo.findById(opportunityid).get();
		opportunity.setProfils(profils);
		opprepo.save(opportunity)	;
		
	}




	@Override
	public List<Opportunity> getlistopportunity() {
		
		return (List<Opportunity>) opprepo.findAll();
	}




	@Override
	public List<Country> getcountrylist() {	
		return (List<Country>) countryrepo.findAll();
	}




	@Override
	public void deleteopp(Long opportunityid) {
		opprepo.deleteById(opportunityid);
		
	}





	@Override
	public Opportunity getopportunitybyid(Long opportunityid) {
		// TODO Auto-generated method stub
		return opprepo.findById(opportunityid).get();
	}




	@Override
	public void Changestatusopportunity(OpportunityStatus oppstatus, Long opportunityid) {
		Opportunity opportunity= opprepo.findById(opportunityid).get();
		opportunity.setStatus(oppstatus);
		opprepo.save(opportunity);
	}




	@Override
	public void affecteroppoanalysistoopp(Opportunityanalysis oppoanalysis, Long opportunityid) {
		// TODO Auto-generated method stub
		oppanalysisrepo.save(oppoanalysis);
		Opportunity opportunity=opprepo.findById(opportunityid).get();
		oppoanalysis.setOpp(opportunity);
		oppanalysisrepo.save(oppoanalysis);
	}




	@Override
	public void setfinalstatusoppo(Opportunity opp, Long idopportuni) {
		Opportunity opportunity=opprepo.findById(idopportuni).get();
		opportunity.setDateclosed(opp.getDateclosed());
		opportunity.setStatus(opp.getStatus());
		opportunity.setReasonlost(opp.getReasonlost());
		opprepo.save(opportunity);
	}

	public List<Opportunity> get_Profil_Opportunities(String idProfile) {
		return (List<Opportunity>) opprepo.findAll();
	}
	
	
	
	

}
