package tn.esprit.spring.repos;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tn.esprit.spring.models.Contact;

@Repository

public interface ContactRepo extends CrudRepository<Contact,String> {

}
