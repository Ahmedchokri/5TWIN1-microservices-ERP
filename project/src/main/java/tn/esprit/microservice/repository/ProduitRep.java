package tn.esprit.microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tn.esprit.microservice.entities.Produit;



@Repository
public interface ProduitRep extends JpaRepository<Produit,Long>  {
	@Query(value="Select count(*) from produit where partenaire_idp=:idp" , nativeQuery= true)
	int getNbrProduit(@Param("idp") long idp);

}
