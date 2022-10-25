package tn.esprit.microservice.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.esprit.microservice.entities.Partenaire;
import tn.esprit.microservice.repository.PartenaireRep;


@Service
public class PartenaireServiceImp implements IPartenaireService {
	@Autowired
	PartenaireRep partenairerep;

	@Override
	public List<Partenaire> afficher() {
		List<Partenaire> partenaires= (List<Partenaire>) partenairerep.findAll();
		for (Partenaire partnaire: partenaires) {
			System.out.println("Partenaire :" + partenaires);
		}
		return partenaires;	}

	@Override
	public Partenaire ajouter(Partenaire P) {
		return partenairerep.save(P);
	}

	@Override
	public void supprimerPar(Long id) {
		partenairerep.deleteById(id);
		
	}

	@Override
	public Partenaire modifier(Partenaire P) {
		// TODO Auto-generated method stub
		return partenairerep.save(P);
	}

}
