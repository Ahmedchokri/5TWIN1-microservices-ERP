package com.esprit.microservice.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.esprit.microservice.entities.warehouse;

@Service
public interface warehouseService {

	List<warehouse> getwarehouses();
	warehouse getwarehouse(Long id);
	warehouse createwarehouse(warehouse warehouse);
	void deletewarehouse(Long id);
	warehouse updatewarehouse(warehouse warehouse);
	void affectProductToWarehouse(long Idwarehouse,long idProduct);
}
