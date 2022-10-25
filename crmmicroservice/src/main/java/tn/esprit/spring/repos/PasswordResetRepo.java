package tn.esprit.spring.repos;

import java.util.Optional;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import tn.esprit.spring.models.*;


@Repository
public interface PasswordResetRepo extends CrudRepository <PasswordReset,String> {
	
	Optional<PasswordReset> findByUser(User user);
	PasswordReset findByToken(String token);


}
