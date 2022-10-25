package tn.esprit.spring.repos;


import org.springframework.data.repository.CrudRepository;

import tn.esprit.spring.models.*;

public interface PhotoRepo extends CrudRepository<Photo,String> {

}
