package com.esprit.microservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esprit.microservice.entities.Product;
import com.esprit.microservice.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	ProductRepository prodS;
	
	@Override
	public List<Product> getProducts() {
		return prodS.findAll();
	}



	@Override
	public Product createProduct(Product Product) {
		return prodS.save(Product);
	}

	@Override
	public void deleteProduct(Long id) {
		prodS.deleteById(id);
	}

	@Override
	public Product updateProduct(Product Product) {
		return prodS.save(Product);
	}



	@Override
	public Product getProduct(Long id) {
		Optional<Product> product =  prodS.findById(id);
		if(product.isPresent()){
			return product.get();
		}
		throw new RuntimeException("Product id : "+id+" not found.");
	}
	

	

}
