package tn.esprit.spring.services;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    User saveUser (User user ,MultipartFile file) throws IOException;
    Role saveRole (Role role);
    void assignRoleAdminToUser (String userName);
    void assignRoleUserToUser(String userName);
    User getUser (String username);
    Optional<User> getUserById (Long id);    
    List<User> getAllUsers();
    User updateUser(Long id, User user,MultipartFile file ) throws IOException;
    void deleteUser(Long id);
   
    User getUserByEmail (String email);

 }
