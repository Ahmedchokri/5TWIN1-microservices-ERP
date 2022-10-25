package tn.esprit.microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.esprit.microservice.entites.AgentRH;

@Repository
public interface agentRHRepository  extends JpaRepository<AgentRH,Long> {

}
