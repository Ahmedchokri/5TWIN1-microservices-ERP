package tn.esprit.spring.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;

public interface ProfilService {

	

	void addprofil(Profile profil	,String id);
	Photo getcv(String id) throws IllegalStateException, IOException;
	List<Profile> getprofils();
	Profile getprofil(Long id );
	void deleteprofil(Long id );
}
