package com.esprit.microservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esprit.microservice.entities.Team;

public interface TeamRepository extends JpaRepository<Team, Integer>{

}
