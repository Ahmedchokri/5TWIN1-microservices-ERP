package tn.esprit.spring.models;

import java.io.Serializable;

import javax.mail.Address;


import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
public class Mail implements Serializable{
	private String from;
    private Address[] toList;
    private Address[] ccList;
    private String contentType;
    private String subject;
    private String content;
    private String sentDate;
}