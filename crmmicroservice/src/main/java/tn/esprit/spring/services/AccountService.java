package tn.esprit.spring.services;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


import tn.esprit.spring.models.*;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface AccountService {
    Account saveaccount(Account acc, MultipartFile file ) throws IOException;

    Account updateaccount(Account acc, MultipartFile file ) throws IOException;
    List<Account> getAllAccounts();
    String deleteAccount(String id);
    Optional<Account> getAccount(String id);
}
