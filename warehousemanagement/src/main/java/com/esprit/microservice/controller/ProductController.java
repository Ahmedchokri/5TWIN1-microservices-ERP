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

import com.esprit.microservice.entities.Product;
import com.esprit.microservice.service.ProductService;



@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired 
	ProductService prodserv;
	
	@PostMapping("/add-product")
	public void ajouterProduit(@RequestBody Product p){
		prodserv.createProduct(p);
	}
	@GetMapping("/show")
	public List<Product> getProducts(){
		return prodserv.getProducts();
	}
	
	@GetMapping("/show/{idProduct}")
	public Product getProductId(@PathVariable Long idProduct){
		return prodserv.getProduct(idProduct);
	}
	
	
	@DeleteMapping("/delete")
	public void deleteProduct(@RequestParam Long idProduct){
			prodserv.deleteProduct(idProduct);
	}
	
	@PostMapping("/")
	public Product saveProduct(@RequestBody Product product){
		return prodserv.createProduct(product);
		
	}
	@PutMapping("/update/{idProduct}")
	public Product updateProduct(@PathVariable Long idProduct, @RequestBody Product product){
			product.setIdProduct(idProduct);
		return prodserv.updateProduct(product);
	}
	
}
