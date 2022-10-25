package tn.esprit.microservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.esprit.microservice.entites.Employee;
import tn.esprit.microservice.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	EmployeeRepository er;
	
	
	public List<Employee> findAllEmployee(){
		List<Employee> Employees= er.findAll();
		return Employees;
	}
	public Employee addEmployee(Employee employee) {
		return er.save(employee);
	}
	
	public Employee getEmployeebyId(Long id) {
		return er.findById(id).get();
	}
	
	public void deleteEmployee(Long id) {
		er.deleteById(id);
	}
	
	public void updateEmployee(Employee employee) {
		er.save(employee);
	}



}
