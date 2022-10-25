package tn.esprit.microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.esprit.microservice.entities.Partenaire;


@Repository
public interface PartenaireRep extends JpaRepository<Partenaire,Long> {

}
