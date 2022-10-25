package tn.esprit.spring.services;

import java.util.List;




import tn.esprit.spring.models.*;


public interface OpportunityService {

	void Assignprofiltoopportunity(Profile profil , Long opportunityid );
	void Assigncontacttopportunity(Opportunity opp , String contactid ,String idcountry);
	Contact getcontactofopportunity(Long idopportuni);
	List<Opportunity> getlistopportunity();
	List<Country> getcountrylist();
	void deleteopp(Long opportunityid);
	Opportunity getopportunitybyid(Long opportunityid);
	void Changestatusopportunity(OpportunityStatus oppstatus,Long opportunityid);
	void affecteroppoanalysistoopp(Opportunityanalysis oppoanalysis , Long opportunityid );
	void setfinalstatusoppo(Opportunity opp,Long idopportuni );
	public List<Opportunity> get_Profil_Opportunities(String idProfile);

}
