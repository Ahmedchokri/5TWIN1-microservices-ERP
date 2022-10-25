package com.esprit.microservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.esprit.microservice.entities.Product;



@Service
public interface ProductService {

	List<Product> getProducts();
	Product getProduct(Long id);
	Product createProduct(Product Product);
	void deleteProduct(Long id);
	Product updateProduct(Product Product);
}
