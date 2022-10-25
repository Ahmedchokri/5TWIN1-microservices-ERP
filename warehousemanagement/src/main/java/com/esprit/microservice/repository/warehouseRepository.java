package com.esprit.microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.esprit.microservice.entities.warehouse;

@Repository
public interface warehouseRepository extends JpaRepository<warehouse, Long> {

}
