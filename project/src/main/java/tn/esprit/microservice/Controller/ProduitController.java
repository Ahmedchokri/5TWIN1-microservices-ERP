package tn.esprit.microservice.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import tn.esprit.microservice.entities.Produit;
import tn.esprit.microservice.services.IProduitService;

@RestController
@RequestMapping("/Produit")
public class ProduitController {
	@Autowired
	IProduitService serv;
	
	@GetMapping("/afficher")
	List<Produit> afficher(){
		return serv.afficher();
	}
	@DeleteMapping("/supprimer/{idP}")
	@ResponseBody
	public void supprimer(@PathVariable("idPr") Long idPr){
		serv.supprimer(idPr);
		
	}
	@PostMapping("/ajouteretaffecter/{idP}")
	@ResponseBody
	public void ajouter(@RequestBody Produit P,@PathVariable("idP") Long idP){
		serv.ajouter(P, idP);
		
	}
	@GetMapping("/affichernombre/{idp}")
	int affichernbre(@PathVariable("idp") Long idp){
		return serv.getNbreProduit(idp);
		
	}

	
	

}
