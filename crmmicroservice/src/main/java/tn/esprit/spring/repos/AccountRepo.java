package tn.esprit.spring.repos;

import tn.esprit.spring.models.Account;

import org.springframework.data.repository.CrudRepository;

public interface AccountRepo extends CrudRepository<Account,String> {

}
