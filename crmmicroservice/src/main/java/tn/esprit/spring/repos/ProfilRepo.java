package tn.esprit.spring.repos;


import org.springframework.data.repository.CrudRepository;


import tn.esprit.spring.models.*;

public interface ProfilRepo extends CrudRepository<Profile,Long> {

}