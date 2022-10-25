package tn.esprit.microservice.controller;

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

import tn.esprit.microservice.entites.Employee;
import tn.esprit.microservice.service.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeRestController {
	
	@Autowired
	public EmployeeService es;

	
	@GetMapping("/retrieve-all-employees")
	public List<Employee> getEmployees() {
		List<Employee> listEmployees = es.findAllEmployee();
		return listEmployees;
	}

	
	@GetMapping("/retrieve-employee/{employee-id}")
	public Employee getEmployeebyId(@PathVariable("employee-id") Long id) {
		 return es.getEmployeebyId(id);
	}
	
	@PostMapping("/add-employee")
	@ResponseBody
	public Employee addEmployee(@RequestBody Employee p) {
		es.addEmployee(p);
		return p;
	}
	
	@PutMapping("/edit-employee")
	@ResponseBody
	public Employee update(@RequestBody Employee e) {
		es.updateEmployee(e);;
		return e;
	}
	
	@DeleteMapping("/delete-employee/{employee-id}")
	public void removeProduct(@PathVariable("employee-id") Long id) {
		es.deleteEmployee(id);
	}

	


	
}
