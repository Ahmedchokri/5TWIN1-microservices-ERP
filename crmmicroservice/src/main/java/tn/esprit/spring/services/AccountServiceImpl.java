package tn.esprit.spring.services;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;


import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;
@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepo accountRepo;
    @Override
    public Account saveaccount(Account acc, MultipartFile file)throws IOException {
//acc.setPicture(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        return accountRepo.save(acc);
    }

    @Override
    public Account updateaccount(Account acc, MultipartFile file)throws IOException {
       // acc.setPicture(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        return accountRepo.save(acc);
    }

    @Override
    public List<Account> getAllAccounts() {
        return (List<Account>) accountRepo.findAll();
    }

    @Override
    public String deleteAccount(String id) {
         accountRepo.deleteById(id);
        return "Account deleted with id :"+id;

    }

    @Override
    public Optional<Account> getAccount(String id) {
        return accountRepo.findById(id);
    }

}
