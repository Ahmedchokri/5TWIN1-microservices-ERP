package tn.esprit.spring.services;



import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;

@Service
public class ProfilServiceImpl implements ProfilService{
	@Autowired
	private PhotoRepo photorepo ; 
	@Autowired
	private ProfilRepo profilrepo ; 
	@Autowired
	private AdresseRepo adressrepo ;

	@Override
	public void addprofil( Profile profil	,String id) {
		System.out.println(profil.toString());
		//profil.setCv(photorepo.findById(id).get());
		profilrepo.save(profil);
		
	}
		@Override
		  public Photo getcv(String id) throws IllegalStateException, IOException { 
	
		       
		        return 	photorepo.findById(id).get() ;
	}
		@Override
		public List<Profile> getprofils() {
			return (List<Profile>) profilrepo.findAll();
		}
		@Override
		public Profile getprofil(Long id) {
			// TODO Auto-generated method stub
			Profile p = profilrepo.findById(id).get();
		///	p.getCv().setTitle(profilrepo.findById(id).get().getFullname());;
			return p ;
		}
		@Override
		public void deleteprofil(Long id) {
			profilrepo.deleteById(id);
			
		}
	

}
