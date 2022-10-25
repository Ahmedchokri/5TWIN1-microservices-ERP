package com.esprit.microservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esprit.microservice.entities.Product;
import com.esprit.microservice.entities.warehouse;
import com.esprit.microservice.repository.ProductRepository;
import com.esprit.microservice.repository.warehouseRepository;

@Service
public class warehouseServiceImpl implements warehouseService {

	@Autowired
	warehouseRepository wr;
	@Autowired 
	ProductRepository pr;
	
	@Override
	public List<warehouse> getwarehouses() {
		return wr.findAll();
	}

	@Override
	public warehouse getwarehouse(Long id) {
		Optional<warehouse> wareh =  wr.findById(id);
		if(wareh.isPresent()){
			return wareh.get();
		}
		throw new RuntimeException("Product id : "+id+" not found.");
	}

	@Override
	public warehouse createwarehouse(warehouse warehouse) {
		return wr.save(warehouse);
	}

	@Override
	public void deletewarehouse(Long id) {
		wr.deleteById(id);
		
	}

	@Override
	public warehouse updatewarehouse(warehouse warehouse) {
		return wr.save(warehouse);
	}

	@Override
	public void affectProductToWarehouse(long idWarehouse, long idProduct) {
		Optional<warehouse> w= wr.findById(idWarehouse);
		Optional<Product> p = pr.findById(idProduct);
		if(p.isPresent() && w.isPresent()){
			List<Product> fleeting = w.get().getProducts();
			fleeting.add(p.get());
			w.get().setProducts(fleeting);
		}else 
		{
			System.out.println("ONE OF THE IDs GIVEN IS WRONG DUMMY.");
		}
		
	}

}
