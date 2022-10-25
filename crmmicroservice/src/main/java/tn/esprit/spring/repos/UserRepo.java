package tn.esprit.spring.repos;

import tn.esprit.spring.models.*;

import java.util.List;
import java.util.Optional;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends CrudRepository <User,Long> {

    User findAppUserByUserName(String userName);
    User findUserByUserName(String userName);
    User findByUserName(String userName);
    User findByEmail(String email);
}
