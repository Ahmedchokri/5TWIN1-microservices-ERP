package tn.esprit.microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.esprit.microservice.entites.Employee;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
