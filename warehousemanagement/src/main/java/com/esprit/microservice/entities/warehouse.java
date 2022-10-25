package com.esprit.microservice.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class warehouse {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idWarehouse;
	private String storageLocation;
	private long quantity;
	
	@OneToMany
	List<Product> products;
	
	public List<Product> getProducts() {
		return products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}
	public String getStorageLocation() {
		return storageLocation;
	}
	public void setStorageLocation(String storageLocation) {
		this.storageLocation = storageLocation;
	}
	public long getQuantity() {
		return quantity;
	}
	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
	public long getIdWarehouse() {
		return idWarehouse;
	}
	public void setIdWarehouse(long idWarehouse) {
		this.idWarehouse = idWarehouse;
	}
	
	
	
	
}
