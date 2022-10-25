package tn.esprit.microservice.services;
import java.util.List;

import tn.esprit.microservice.entities.*;
public interface IPartenaireService {
	List <Partenaire> afficher();
	Partenaire ajouter(Partenaire P);
	void supprimerPar(Long id);
	Partenaire modifier(Partenaire P);

}
