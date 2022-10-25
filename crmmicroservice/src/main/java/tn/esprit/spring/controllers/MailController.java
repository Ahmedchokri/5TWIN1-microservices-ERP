package tn.esprit.spring.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tn.esprit.spring.models.Mail;
import tn.esprit.spring.services.MailService;

@CrossOrigin("*")
@RestController
@RequestMapping("/mail")
public class MailController {

	@Autowired
	private MailService emailService;

	@PostMapping("/sendSimpleMail")
	public void sendMail(String from, String password, String to, String subject, String body)
			throws MessagingException {

		System.out.println("SSLEmail Start");
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.ionos.de"); // SMTP Host
		props.put("mail.smtp.socketFactory.port", "465"); // SSL Port
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory"); // SSL Factory Class
		props.put("mail.smtp.auth", "true"); // Enabling SMTP Authentication
		props.put("mail.smtp.port", "465"); // SMTP Port

		// create Authenticator object to pass in Session.getInstance argument
		Authenticator auth = new Authenticator() {
			// override the getPasswordAuthentication method
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(from, password);
			}
		};
		Session session = Session.getInstance(props, auth);

		emailService.sendEmail(session, from, to, subject, body);

	}
	

	@PostMapping("/sendAttachmentMail")
	public void sendAttachmentMail(String from, String password, String to, String subject, String body,
			MultipartFile attachment) throws MessagingException, IOException {

		System.out.println("SSLEmail Start");
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.ionos.de"); // SMTP Host
		props.put("mail.smtp.socketFactory.port", "465"); // SSL Port
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory"); // SSL Factory Class
		props.put("mail.smtp.auth", "true"); // Enabling SMTP Authentication
		props.put("mail.smtp.port", "465"); // SMTP Port

		// create Authenticator object to pass in Session.getInstance argument
		Authenticator auth = new Authenticator() {
			// override the getPasswordAuthentication method
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(from, password);
			}
		};
		Session session = Session.getInstance(props, auth);

		emailService.sendAttachmentEmail(session, from, to, subject, body, attachment);

	}


	@GetMapping("/getMailsInbox/{username}/{password}")
	public ArrayList<tn.esprit.spring.models.Mail> getMailInbox(@PathVariable(value = "username") String userName,
			@PathVariable(value = "password") String password) throws MessagingException, IOException {
		return emailService.readInboxEmails(userName, password);
	}

	@GetMapping("/getMailsSent/{username}/{password}")
	public ArrayList<tn.esprit.spring.models.Mail> getMailSent(@PathVariable(value = "username") String userName,
			@PathVariable(value = "password") String password) throws MessagingException, IOException {
		return emailService.readSentEmails(userName, password);
	}

	@GetMapping("/getMailsTrash/{username}/{password}")
	public ArrayList<tn.esprit.spring.models.Mail> getMailTrash(@PathVariable(value = "username") String userName,
			@PathVariable(value = "password") String password) throws MessagingException, IOException {
		return emailService.readTrashEmails(userName, password);
	}

	@GetMapping("/getMailsDraft/{username}/{password}")
	public ArrayList<tn.esprit.spring.models.Mail> getMailDraft(@PathVariable(value = "username") String userName,
			@PathVariable(value = "password") String password) throws MessagingException, IOException {
		return emailService.readDraftEmails(userName, password);
	}

	@GetMapping("/getMailsSpam/{username}/{password}")
	public ArrayList<tn.esprit.spring.models.Mail> getMailSpam(@PathVariable(value = "username") String userName,
			@PathVariable(value = "password") String password) throws MessagingException, IOException {
		return emailService.readSpamEmails(userName, password);
	}

	@GetMapping("/getMailsArchive/{username}/{password}")
	public ArrayList<tn.esprit.spring.models.Mail> getMailArchive(
			@PathVariable(value = "username") String userName, @PathVariable(value = "password") String password)
			throws MessagingException, IOException {
		return emailService.readArchiveEmails(userName, password);
	}
}
