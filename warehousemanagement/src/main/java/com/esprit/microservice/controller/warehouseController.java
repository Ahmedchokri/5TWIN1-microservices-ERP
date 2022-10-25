package com.esprit.microservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.esprit.microservice.entities.warehouse;
import com.esprit.microservice.service.warehouseService;

@RestController
@RequestMapping("/warehouse")
public class warehouseController {
	@Autowired
	warehouseService wares;
	
	@PostMapping("/add-warehouse")
	public void addWarehouse(@RequestBody warehouse w){
		wares.createwarehouse(w);
	}
	@GetMapping("/show")
	public List<warehouse> getwarehouses(){
		return wares.getwarehouses();
	}
	
	@GetMapping("/show/{idwarehouse}")
	public warehouse getwarehouseId(@PathVariable Long idwarehouse){
		return wares.getwarehouse(idwarehouse);
	}
	
	
	@DeleteMapping("/delete")
	public void deletewarehouse(@RequestParam Long idwarehouse){
			wares.deletewarehouse(idwarehouse);
	}
	
	@PostMapping("/")
	public warehouse savewarehouse(@RequestBody warehouse warehouse){
		return wares.createwarehouse(warehouse);
		
	}
	@PutMapping("/update/{idwarehouse}")
	public warehouse updatewarehouse(@PathVariable Long idwarehouse, @RequestBody warehouse w){
			w.setIdWarehouse(idwarehouse);
		return wares.updatewarehouse(w);
	}
	
	
	
}
