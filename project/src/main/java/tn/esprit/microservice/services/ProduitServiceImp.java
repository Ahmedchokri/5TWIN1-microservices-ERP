package tn.esprit.microservice.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.esprit.microservice.entities.Partenaire;
import tn.esprit.microservice.entities.Produit;
import tn.esprit.microservice.repository.PartenaireRep;
import tn.esprit.microservice.repository.ProduitRep;


@Service
public class ProduitServiceImp implements IProduitService {
	@Autowired
	ProduitRep produitrep;
	@Autowired
	PartenaireRep partenairerep;

	@Override
	public List<Produit> afficher() {
		List<Produit> produits = (List<Produit>)produitrep.findAll();
		return produits;
	}

	@Override
	public void ajouter(Produit P, Long idP) {
		produitrep.save(P);
		Partenaire partenaire = partenairerep.findById(idP).orElse(null);
		P.setPartenaire(partenaire);
		produitrep.save(P);
		
		
	}

	@Override
	public void supprimer(Long id) {
		produitrep.deleteById(id);
		
	}

	@Override
	public Produit modifier(Produit P) {
		
		return produitrep.save(P);
	}
	@Override
	public int getNbreProduit(long idp){
		int a;
		a=produitrep.getNbrProduit(idp);
		return a;
	}
	

}
