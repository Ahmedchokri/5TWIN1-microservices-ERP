package tn.esprit.spring.services;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService , UserDetailsService {
    private final UserRepo userRepo ;
    private final RoleRepo roleRepo ;
    private final PasswordEncoder passwordEncoder ;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findAppUserByUserName(username);
        if(user == null){
            log.error("user not found in db");
            throw new UsernameNotFoundException("user not found exception");

        }else{
            log.info("user found in db : {}",username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().getName()));
        return new org.springframework.security.core.userdetails.User(user.getUserName(),user.getPassword(),authorities);
    }


    @Override
    public User saveUser(User user,MultipartFile file) throws IOException {
        User user1 = userRepo.findByUserName(user.getUserName());
        if(user1 != null) {
        	log.info("Existing username"); 
        	return user;
        }else {
            log.info("saving user :{} to db",user.getUserName());
            user.setRole(null);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
          //  user.setPicture(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
            return userRepo.save(user);
        }
        
        
    }

    @Override
    public Role saveRole(Role role) {
        log.info("saving role :{} to db",role.getName());
        return roleRepo.save(role);
    }

    @Override
    public void assignRoleAdminToUser(String userName) {
        log.info("assigning role {} to user {} to database","admin",userName);
        User user = userRepo.findAppUserByUserName(userName);
        Role role = roleRepo.findByName("ROLE_ADMIN");
        user.setRole(role);
        userRepo.save(user);
    }
    @Override
    public void assignRoleUserToUser(String userName) {
        log.info("assigning role {} to user {} to database","user",userName);
        User user = userRepo.findAppUserByUserName(userName);
        Role role = roleRepo.findByName("ROLE_USER");
        user.setRole(role);
        userRepo.save(user);
    }

    @Override
    public User getUser(String username) {
    	User user1 = userRepo.findByUserName(username);
    	
        log.info("getting user {}",user1);
        return userRepo.findByUserName(username);
    }
    

	@Override
	public Optional<User> getUserById(Long id) {
		Optional<User> user1 = userRepo.findById(id);
		return user1;
	}
    
    
 
    @Override
    public List<User> getAllUsers() {
        log.info("getting all users");
        return (List<User>) userRepo.findAll();
    }


	@Override
	public User updateUser(Long id, User user, MultipartFile file) throws IOException {
		Optional<User> user1 = userRepo.findById(id);

		if (user1.isPresent()) {
			User _user = user1.get();
			_user.setFirstName(user.getFirstName());
			_user.setLastName(user.getLastName());
			_user.setUserName(user.getUserName());
			_user.setEmail(user.getEmail());
			_user.setPhone(user.getPhone());
			_user.setCountry(user.getCountry());
			//_user.setPicture(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
//			_user.setPicture(user.getPicture());
			log.info("updating user {}",_user);
			return userRepo.save(_user);
		} else {
			log.info("updating user {}",user);
			return userRepo.save(user);
		}
	}


	@Override
	public void deleteUser(Long id) {
		userRepo.deleteById(id);
		
	}


	@Override
	public User getUserByEmail(String email) {
		 log.info("Finding user with email: "+email);
		return userRepo.findByEmail(email);
	}



}
