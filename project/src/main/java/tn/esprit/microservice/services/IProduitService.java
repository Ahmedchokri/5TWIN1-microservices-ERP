package tn.esprit.microservice.services;
import java.util.List;

import tn.esprit.microservice.entities.Produit;

public interface IProduitService {
	List<Produit> afficher();
	void ajouter(Produit P,Long idP);
	void supprimer (Long id);
	Produit modifier(Produit P);
	public int getNbreProduit(long idp);

}
