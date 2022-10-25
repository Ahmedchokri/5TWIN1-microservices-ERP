package tn.esprit.spring.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tn.esprit.spring.models.PasswordReset;
import tn.esprit.spring.models.User;
import tn.esprit.spring.services.PasswordResetService;
import tn.esprit.spring.services.UserService;

@CrossOrigin(origins = "*")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PasswordResetController {
	
	private final PasswordResetService prs;
	
	@PostMapping("/resetPassword")
    public PasswordReset resetPassword(String email){
         return prs.ResetPassword(email);
    }
	
	@PostMapping("/resetPass/{userId}/{token}")
	public String ResetPassword(@PathVariable(value = "userId") Long userId, 
			@PathVariable(value = "token") String token, String password, String confirmPassword) {
		
		return prs.ResetPass(userId, token, password, confirmPassword);
	}
	
	

}
