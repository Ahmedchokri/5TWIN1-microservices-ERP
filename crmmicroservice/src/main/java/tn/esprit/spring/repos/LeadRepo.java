package tn.esprit.spring.repos;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.omg.CORBA.Any;
import tn.esprit.spring.models.*;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LeadRepo extends CrudRepository <Lead,Long>{
 
   
   List<Lead> findByStatusNot(String status);

}
