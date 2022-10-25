package com.esprit.microservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esprit.microservice.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer>{

}
