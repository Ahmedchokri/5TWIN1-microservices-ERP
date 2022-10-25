package tn.esprit.microservice.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import tn.esprit.microservice.entities.Partenaire;
import tn.esprit.microservice.services.IPartenaireService;

@RestController
@RequestMapping("/Partenaire")
public class PartenaireController {
	@Autowired
	IPartenaireService serv;
	
	@PostMapping("/ajouter")
	@ResponseBody
	Partenaire ajouter(@RequestBody Partenaire P){
		Partenaire partenaire =serv.ajouter(P);
		return partenaire;
		
	}
	@GetMapping("/afficher")
	List<Partenaire> afficher(){
		return serv.afficher();
		
	}
	@DeleteMapping("/supprimer/{idP}")
	@ResponseBody
	public void supprimer(@PathVariable("idP") Long idP){
		serv.supprimerPar(idP);
	}
	@PutMapping("/update/{idP}")
	public Partenaire update(@PathVariable Long idP, @RequestBody Partenaire P){
			P.setIdP(idP);
		return serv.modifier(P);
	}
}


