package tn.esprit.spring.controllers;

import tn.esprit.spring.models.Account;
import tn.esprit.spring.repos.AccountRepo;
import tn.esprit.spring.repos.LeadRepo;
import tn.esprit.spring.services.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;
@CrossOrigin(origins = "*")
@RestController
public class AccountController {
    @Autowired
    private AccountRepo repository ;
    @Autowired
    private AccountService accountService;
    
    @Autowired
	 private AccountRepo accountRepo ;
	 
	 @GetMapping("/accounts")
	   public long countAccount(){
	   return accountRepo.count(); 
	   
	   }
    
    @PostMapping("/addAccount")
        public String saveAccount(Account Account, @RequestParam("file") MultipartFile image) throws IOException {
        accountService.saveaccount(Account,image);
        return "Added Account with name : " +Account.getAccountName();
    }

    @PutMapping("/updateAccount")
    public String updateAccount(Account Account ,  MultipartFile image) throws IOException {
            accountService.updateaccount(Account,image);
        return "Updated Account with name : " +Account.getAccountName();
    }
    @GetMapping("/findAllAccounts")
    public List<Account> getAccounts(){
        return accountService.getAllAccounts();
    }

    @GetMapping("/findAllAccounts/{id}")
    public Optional<Account> getAccount(@PathVariable String id){
        return accountService.getAccount(id);
    }
    @DeleteMapping("/deleteacc/{id}")
    public String deleteAccount(@PathVariable String id){
      return  accountService.deleteAccount(id);
    }



}
