package tn.esprit.spring.services;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.AuthenticationFailedException;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Flags;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.NoSuchProviderException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;
import org.springframework.integration.dsl.context.IntegrationFlowContext;
import org.springframework.integration.mail.dsl.Mail;
import org.springframework.integration.mail.support.DefaultMailHeaderMapper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sun.mail.imap.IMAPFolder;

//import kripton.kriptonbackcrm.models.Mail;

@Service

public class MailService {

//	@Autowired
//	private JavaMailSender emailSender;
	
	
	/**
	 * Utility method to send simple HTML email
	 * @param session
	 * @param toEmail
	 * @param subject
	 * @param body
	 */
	public void sendEmail(Session session, String from, String toEmail, String subject, String body){
		try
	    {
	      MimeMessage msg = new MimeMessage(session);
	      //set message headers
	      msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
	      msg.addHeader("format", "flowed");
	      msg.addHeader("Content-Transfer-Encoding", "8bit");

	      msg.setFrom(new InternetAddress(from));

	     // msg.setReplyTo(InternetAddress.parse("no_reply@example.com", false));

	      msg.setSubject(subject, "UTF-8");

	      //msg.setText(body, "text/html");
	      
	      msg.setContent(body, "text/html");

	      msg.setSentDate(new Date());

	      msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
	      
	      System.out.println("Message is ready");
    	  Transport.send(msg);  

	      System.out.println("EMail Sent Successfully!!");
	    }
	    catch (Exception e) {
	      e.printStackTrace();
	    }
	}
	
	public ArrayList<File> convert1(MultipartFile[] file) throws IOException
	 {    
		 ArrayList<File> files = new ArrayList<>();
		 for(int i=0;i<file.length;i++) {
			 File convFile = new File(file[i].getOriginalFilename());
			   convFile.createNewFile(); 
			   FileOutputStream fos = new FileOutputStream(convFile); 
			   fos.write(file[i].getBytes());
			   fos.close(); 
			   files.add(convFile);
			   
		 }
		 return files;
	 }
	
	 public File convert(MultipartFile file) throws IOException
	 {    
	   File convFile = new File(file.getOriginalFilename());
	   convFile.createNewFile(); 
	   FileOutputStream fos = new FileOutputStream(convFile); 
	   fos.write(file.getBytes());
	   fos.close(); 
	   return convFile;
	 }
	
	/**
	 * Utility method to send email with attachment
	 * @param session
	 * @param toEmail
	 * @param subject
	 * @param body
	 * @throws IOException 
	 */
	public void sendAttachmentEmail(Session session, String from, String toEmail, String subject,
			String body,  MultipartFile attachment) throws IOException{
		try{
	         MimeMessage msg = new MimeMessage(session);
	         msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
		     msg.addHeader("format", "flowed");
		     msg.addHeader("Content-Transfer-Encoding", "8bit");
		      
		     msg.setFrom(new InternetAddress(from));

		     //msg.setReplyTo(InternetAddress.parse("no_reply@example.com", false));

		     msg.setSubject(subject, "UTF-8");

		     msg.setSentDate(new Date());

		     msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
		     
		     // Convert multipartFile to File
		     File file = convert(attachment);
		     System.out.println(file.getAbsolutePath()+file.getPath());
		  
	         // Create the message body part
	         BodyPart messageBodyPart = new MimeBodyPart();

	         // Fill the message
	         messageBodyPart.setContent(body, "text/html");
	         
	         // Create a multipart message for attachment
	         Multipart multipart = new MimeMultipart();

	         // Set text message part
	         multipart.addBodyPart(messageBodyPart);
	         
	         
	         
	      // Second part is attachment
	         messageBodyPart = new MimeBodyPart();
	         String filename = file.getAbsolutePath();
	         DataSource source = new FileDataSource(filename);
	         messageBodyPart.setDataHandler(new DataHandler(source));
	         messageBodyPart.setFileName(attachment.getOriginalFilename());
	         multipart.addBodyPart(messageBodyPart);

	         // Send the complete message parts
	         msg.setContent(multipart);

	         // Send message
	         Transport.send(msg);
	         System.out.println("EMail Sent Successfully with attachment!!");
	      }catch (MessagingException e) {
	         e.printStackTrace();
	      }
	}
	
	
	
	
	
	
	
	
	
	
	
	

	public void sendSimpleMessage(String from,  String to, String subject, String body) throws MessagingException {
		
//		Session session = this.getImapSession();
//		// try {
//		// connect to message store
//		Store store = session.getStore("smtp");
//		store.connect("smtp.ionos.de", 143, from, password);
//		
		//System.out.println("TLSEmail Start");
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.ionos.de"); //SMTP Host
		props.put("mail.smtp.port", "25"); //TLS Port
		props.put("mail.smtp.auth", "true"); //enable authentication
		props.put("mail.smtp.starttls.enable", "true"); //enable STARTTLS
		
                //create Authenticator object to pass in Session.getInstance argument
		Authenticator auth = new Authenticator() {
			//override the getPasswordAuthentication method
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(from, "Achref@99");
			}
		};
		Session session = Session.getInstance(props, auth);
		
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setSubject(subject);
		message.setText(body);
		message.setTo(to);
		message.setFrom(from);

	//	emailSender.send(message);
	}

	public void sendMessageWithAttachment(String from, String to, String subject, String body, MultipartFile attachment)
			throws MessagingException {
		//MimeMessage message = emailSender.createMimeMessage();
		//MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
//		messageHelper.setSubject(subject);
//		messageHelper.setText(body);
//		messageHelper.setTo(to);
//		messageHelper.setFrom(from);
//
//		messageHelper.addAttachment("file", attachment);

		//emailSender.send(messageHelper.getMimeMessage());
	}
	
	
	
	
	// Smtp session config
		private Session getSmtpSession() {
			Properties props = new Properties();
			props.setProperty("mail.store.protocol", "imap");
			props.setProperty("mail.debug", "true");
			props.setProperty("mail.smtp.host", "smtp.ionos.de");
			props.setProperty("mail.smtp.port", "25");
			// props.setProperty("mail.imap.ssl.enable","true");
			Session session = Session.getDefaultInstance(props, null);
			session.setDebug(true);
			return session;
		}

	@Autowired
	private IntegrationFlowContext flowContext;

//	public void startMail() {
//		IntegrationFlow flow = IntegrationFlows.from(Mail.imapIdleAdapter(imapUrl()).javaMailProperties(p -> {
//			p.put("mail.debug", "true");
//			p.put("mail.imap.starttls.enable", "true");
//			p.put("mail.store.protocol", "imap");
//			p.put("mail.imap.auth", "true");
//			p.put("mail.imap.host", "imap.ionos.de");
//		}).userFlag("testSIUserFlag") // needed by the SI test server - not needed if server supports /SEEN
//				.headerMapper(new DefaultMailHeaderMapper())).handle(System.out::println).get();
//		this.flowContext.registration(flow).register();
//	}
//
//	private String imapUrl() {
//		return "imap://a.barketi%40sapres.de:Achref%4099@imap.ionos.de:143/INBOX";
//	}

	private static final Logger logger = LoggerFactory.getLogger(MailService.class);

	public ArrayList<tn.esprit.spring.models.Mail> readInboxEmails(String userName, String password)
			throws MessagingException, IOException {
		// create session object
		Session session = this.getImapSession();
		// try {
		// connect to message store
		Store store = session.getStore("imap");
		store.connect("imap.ionos.de", 143, userName, password);
		// open the inbox folder
		IMAPFolder inbox = (IMAPFolder) store.getFolder("Inbox");
		IMAPFolder trash = (IMAPFolder) store.getFolder("Papierkorb");

		// IMAPFolder inbox = (IMAPFolder) store.getFolder("Gesendete Objekte");
		Folder[] folders = store.getDefaultFolder().list("*");

		inbox.open(Folder.READ_WRITE);
		trash.open(Folder.READ_WRITE);

		// fetch messages
		Message[] messages = inbox.getMessages();

		ArrayList<tn.esprit.spring.models.Mail> mails = new ArrayList<>();

		// read messages
		for (int i = 0; i < messages.length; i++) {
			Message msg = messages[i];
			Address[] fromAddress = msg.getFrom();
			// System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+fromAddress[0]);
			String from = fromAddress[0].toString();
			String subject = msg.getSubject();
			Address[] toList = msg.getRecipients(RecipientType.TO);
			Address[] ccList = msg.getRecipients(RecipientType.CC);
			String contentType = msg.getContentType();
			String sentDate = msg.getSentDate().toLocaleString().substring(0, 12);

			tn.esprit.spring.models.Mail m = new tn.esprit.spring.models.Mail();
			m.setFrom(from);
			m.setCcList(ccList);
			m.setToList(toList);
			m.setSubject(subject);
			m.setContentType(contentType);
			m.setContent(getTextFromMessage(messages[i]));
			m.setSentDate(sentDate);

			mails.add(0, m);
		}

		// inbox.copyMessages(messages, trash);

		// messages[0].setFlag(Flags.Flag.DELETED, true);
		// inbox.close(true);
		return mails;

	}

	public ArrayList<tn.esprit.spring.models.Mail> readSentEmails(String userName, String password)
			throws MessagingException, IOException {
		// create session object
		Session session = this.getImapSession();
		// try {
		// connect to message store
		Store store = session.getStore("imap");
		store.connect("imap.ionos.de", 143, userName, password);
		// open the Sent messages folder
		IMAPFolder inbox = (IMAPFolder) store.getFolder("Gesendete Objekte");
		Folder[] folders = store.getDefaultFolder().list("*");

		inbox.open(Folder.READ_WRITE);

		// fetch messages
		Message[] messages = inbox.getMessages();

		ArrayList<tn.esprit.spring.models.Mail> mails = new ArrayList<>();

		// read messages
		for (int i = 0; i < messages.length; i++) {
			Message msg = messages[i];
			Address[] fromAddress = msg.getFrom();
			// System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+fromAddress[0]);
			String from = fromAddress[0].toString();
			String subject = msg.getSubject();
			Address[] toList = msg.getRecipients(RecipientType.TO);
			Address[] ccList = msg.getRecipients(RecipientType.CC);
			String contentType = msg.getContentType();
			String sentDate = msg.getSentDate().toLocaleString().substring(0, 12);
			String content = msg.getContent().toString();
			content = content.replaceAll("\\<.*?\\>", "");

			tn.esprit.spring.models.Mail m = new tn.esprit.spring.models.Mail();
			m.setFrom(from);
			m.setCcList(ccList);
			m.setToList(toList);
			m.setSubject(subject);
			m.setContentType(contentType);
			m.setContent(content);
			m.setSentDate(sentDate);

			mails.add(0, m);
		}
		return mails;

	}

	public ArrayList<tn.esprit.spring.models.Mail> readTrashEmails(String userName, String password)
			throws MessagingException, IOException {
		// create session object
		Session session = this.getImapSession();
		// try {
		// connect to message store
		Store store = session.getStore("imap");
		store.connect("imap.ionos.de", 143, userName, password);
		// open the inbox folder
		IMAPFolder inbox = (IMAPFolder) store.getFolder("Papierkorb");
		Folder[] folders = store.getDefaultFolder().list("*");

		inbox.open(Folder.READ_WRITE);

		// fetch messages
		Message[] messages = inbox.getMessages();

		ArrayList<tn.esprit.spring.models.Mail> mails = new ArrayList<>();

		// read messages
		for (int i = 0; i < messages.length; i++) {
			Message msg = messages[i];
			Address[] fromAddress = msg.getFrom();
			// System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+fromAddress[0]);
			String from = fromAddress[0].toString();
			String subject = msg.getSubject();
			Address[] toList = msg.getRecipients(RecipientType.TO);
			Address[] ccList = msg.getRecipients(RecipientType.CC);
			String contentType = msg.getContentType();
			String sentDate = msg.getSentDate().toLocaleString().substring(0, 12);

			tn.esprit.spring.models.Mail m = new tn.esprit.spring.models.Mail();
			m.setFrom(from);
			m.setCcList(ccList);
			m.setToList(toList);
			m.setSubject(subject);
			m.setContentType(contentType);
			m.setContent(getTextFromMessage(messages[i]));
			m.setSentDate(sentDate);

			mails.add(0, m);
		}
		return mails;

	}

	public ArrayList<tn.esprit.spring.models.Mail> readSpamEmails(String userName, String password)
			throws MessagingException, IOException {
		// create session object
		Session session = this.getImapSession();
		// try {
		// connect to message store
		Store store = session.getStore("imap");
		store.connect("imap.ionos.de", 143, userName, password);
		// open the inbox folder
		IMAPFolder inbox = (IMAPFolder) store.getFolder("Spam");
		Folder[] folders = store.getDefaultFolder().list("*");

		inbox.open(Folder.READ_WRITE);

		// fetch messages
		Message[] messages = inbox.getMessages();

		ArrayList<tn.esprit.spring.models.Mail> mails = new ArrayList<>();

		// read messages
		for (int i = 0; i < messages.length; i++) {
			Message msg = messages[i];
			Address[] fromAddress = msg.getFrom();
			// System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+fromAddress[0]);
			String from = fromAddress[0].toString();
			String subject = msg.getSubject();
			Address[] toList = msg.getRecipients(RecipientType.TO);
			Address[] ccList = msg.getRecipients(RecipientType.CC);
			String contentType = msg.getContentType();
			String sentDate = msg.getSentDate().toLocaleString().substring(0, 12);

			tn.esprit.spring.models.Mail m = new tn.esprit.spring.models.Mail();
			m.setFrom(from);
			m.setCcList(ccList);
			m.setToList(toList);
			m.setSubject(subject);
			m.setContentType(contentType);
			m.setContent(getTextFromMessage(messages[i]));
			m.setSentDate(sentDate);

			mails.add(0, m);
		}
		return mails;

	}

	public ArrayList<tn.esprit.spring.models.Mail> readDraftEmails(String userName, String password)
			throws MessagingException, IOException {
		// create session object
		Session session = this.getImapSession();
		// try {
		// connect to message store
		Store store = session.getStore("imap");
		store.connect("imap.ionos.de", 143, userName, password);
		// open the inbox folder
		IMAPFolder inbox = (IMAPFolder) store.getFolder("Entwürfe");
		Folder[] folders = store.getDefaultFolder().list("*");

		inbox.open(Folder.READ_WRITE);

		// fetch messages
		Message[] messages = inbox.getMessages();

		ArrayList<tn.esprit.spring.models.Mail> mails = new ArrayList<>();

		// read messages
		for (int i = 0; i < messages.length; i++) {
			Message msg = messages[i];
			Address[] fromAddress = msg.getFrom();
			// System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+fromAddress[0]);
			String from = fromAddress[0].toString();
			String subject = msg.getSubject();
			Address[] toList = msg.getRecipients(RecipientType.TO);
			Address[] ccList = msg.getRecipients(RecipientType.CC);
			String contentType = msg.getContentType();
			String sentDate = msg.getSentDate().toLocaleString().substring(0, 12);

			tn.esprit.spring.models.Mail m = new tn.esprit.spring.models.Mail();
			m.setFrom(from);
			m.setCcList(ccList);
			m.setToList(toList);
			m.setSubject(subject);
			m.setContentType(contentType);
			m.setContent(getTextFromMessage(messages[i]));
			m.setSentDate(sentDate);

			mails.add(0, m);
		}
		return mails;

	}

	public ArrayList<tn.esprit.spring.models.Mail> readArchiveEmails(String userName, String password)
			throws MessagingException, IOException {
		// create session object
		Session session = this.getImapSession();
		// try {
		// connect to message store
		Store store = session.getStore("imap");
		store.connect("imap.ionos.de", 143, userName, password);
		// open the inbox folder
		IMAPFolder inbox = (IMAPFolder) store.getFolder("Archive");
		Folder[] folders = store.getDefaultFolder().list("*");

		inbox.open(Folder.READ_WRITE);

		// fetch messages
		Message[] messages = inbox.getMessages();

		ArrayList<tn.esprit.spring.models.Mail> mails = new ArrayList<>();

		// read messages
		for (int i = 0; i < messages.length; i++) {
			Message msg = messages[i];
			Address[] fromAddress = msg.getFrom();
			// System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+fromAddress[0]);
			String from = fromAddress[0].toString();
			String subject = msg.getSubject();
			Address[] toList = msg.getRecipients(RecipientType.TO);
			Address[] ccList = msg.getRecipients(RecipientType.CC);
			String contentType = msg.getContentType();
			String sentDate = msg.getSentDate().toLocaleString().substring(0, 12);

			tn.esprit.spring.models.Mail m = new tn.esprit.spring.models.Mail();
			m.setFrom(from);
			m.setCcList(ccList);
			m.setToList(toList);
			m.setSubject(subject);
			m.setContentType(contentType);
			m.setContent(getTextFromMessage(messages[i]));
			m.setSentDate(sentDate);

			mails.add(0, m);
		}
		return mails;

	}

	// Imap session config
	private Session getImapSession() {
		Properties props = new Properties();
		props.setProperty("mail.store.protocol", "imap");
		props.setProperty("mail.debug", "true");
		props.setProperty("mail.imap.host", "imap.ionos.de");
		props.setProperty("mail.imap.port", "143");
		// props.setProperty("mail.imap.ssl.enable","true");
		Session session = Session.getDefaultInstance(props, null);
		session.setDebug(true);
		return session;
	}

	// Convert message to text
	private String getTextFromMessage(Message message) throws MessagingException, IOException {
		String result = "";
		if (message.isMimeType("text/plain")) {
			result = message.getContent().toString();
		} else if (message.isMimeType("multipart/*")) {
			MimeMultipart mimeMultipart = (MimeMultipart) message.getContent();
			result = getTextFromMimeMultipart(mimeMultipart);
		}
		return result;
	}

	// Convert mimeMultipart to text
	private String getTextFromMimeMultipart(MimeMultipart mimeMultipart) throws MessagingException, IOException {
		String result = "";
		int count = mimeMultipart.getCount();
		for (int i = 0; i < count; i++) {
			BodyPart bodyPart = mimeMultipart.getBodyPart(i);
			if (bodyPart.isMimeType("text/plain")) {
				result = result + "\n" + bodyPart.getContent();
				break; // without break same text appears twice in my tests
			} else if (bodyPart.isMimeType("text/html")) {
				String html = (String) bodyPart.getContent();
				result = result + "\n" + org.jsoup.Jsoup.parse(html).text();
			} else if (bodyPart.getContent() instanceof MimeMultipart) {
				result = result + getTextFromMimeMultipart((MimeMultipart) bodyPart.getContent());
			}
		}
		return result;
	}

}
