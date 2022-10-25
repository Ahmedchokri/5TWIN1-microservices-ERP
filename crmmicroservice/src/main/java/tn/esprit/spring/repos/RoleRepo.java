package tn.esprit.spring.repos;

import tn.esprit.spring.models.*;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends CrudRepository<Role,Long> {

    Role findByName(String name);
}
