package tn.esprit.spring.services;

import java.util.Date;
import java.util.Optional;
import java.util.Properties;
import java.util.stream.Collectors;

import javax.annotation.processing.SupportedSourceVersion;
import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PasswordResetService {

	private final UserRepo userRepo;
	private final PasswordResetRepo passRepo;
	private final PasswordEncoder passwordEncoder;
	private final MailService mailService;

	public PasswordReset ResetPassword(String email) {
		User user1 = userRepo.findByEmail(email);
		if (user1 == null) {
			log.error("user not found in db");
			throw new UsernameNotFoundException("user not found exception");
		}

		Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
		String token = JWT.create().withSubject(user1.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis() + 200 * 60 * 1000)).sign(algorithm);

		PasswordReset pr = new PasswordReset();
		pr.setToken(token);
		pr.setUser(user1);
		pr.setCreatedAt(new Date().toString());

		Optional<PasswordReset> pr1 = passRepo.findByUser(user1);
		if (!pr1.isPresent()) {
			passRepo.save(pr);
		}

		String link = "http://localhost:4200/auth/pass-create/basic";

		String body = "<div class=\"content\" style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px; background-color: #F5F5F5;\">\n"
				+ "                                            <table class=\"main\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" itemprop=\"action\" itemscope=\"\" itemtype=\"http://schema.org/ConfirmAction\" style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; margin: 0; border: none;\">\n"
				+ "                                                <tbody><tr style=\"font-family: 'Roboto', sans-serif; font-size: 14px; margin: 0;\">\n"
				+ "                                                    <td class=\"content-wrap\" style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; color: #495057; font-size: 14px; vertical-align: top; margin: 0;padding: 30px; box-shadow: 0 3px 15px rgba(30,32,37,.06); ;border-radius: 7px; background-color: #fff;\" valign=\"top\">\n"
				+ "                                                        <meta itemprop=\"name\" content=\"Confirm Email\" style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n"
				+ "                                                        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n"
				+ "                                                            <tbody><tr style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n"
				+ "                                                                <td class=\"content-block\" style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;\" valign=\"top\">\n"
				+ "                                                                    <div style=\"text-align: center;\">\n"
				+ "                                                                        <img src=\"https://www.shareicon.net/data/256x256/2017/05/09/885775_green_512x512.png\" alt=\"lock\" style=\"width: 60px; height: 60px;\">"
				+ "                                                                    </div>\n"
				+ "                                                                </td>\n"
				+ "                                                            </tr>\n"
				+ "                                                            <tr style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n"
				+ "                                                                <td class=\"content-block\" style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 24px; vertical-align: top; margin: 0; padding: 0 0 10px;  text-align: center;\" valign=\"top\">\n"
				+ "                                                                    <h4 style=\"font-family: 'Roboto', sans-serif; margin-bottom: 0px;font-weight: 500; line-height: 1.5;\">Change or reset your password</h4>\n"
				+ "                                                                </td>\n"
				+ "                                                            </tr>\n"
				+ "                                                            <tr style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n"
				+ "                                                                <td class=\"content-block\" style=\"font-family: 'Roboto', sans-serif; color: #878a99; box-sizing: border-box; font-size: 15px; vertical-align: top; margin: 0; padding: 0 0 12px; text-align: center;\" valign=\"top\">\n"
				+ "                                                                    <p style=\"margin-bottom: 13px; line-height: 1.5;\"> Mr "
				+ user1.getLastName() + "&nbsp;" + user1.getLastName()
				+ ", <br> Forgot your password? <br> You can change it for security reasons or reset it if you forget it. Your Account password is mandatory to access to the website.</p>\n"
				+ "                                                                </td>\n"
				+ "                                                            </tr>\n"
				+ "                                                            <tr style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n"
				+ "                                                                <td class=\"content-block\" itemprop=\"handler\" itemscope=\"\" itemtype=\"http://schema.org/HttpActionHandler\" style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 22px; text-align: center;\" valign=\"top\">\n"
				+ "                                                                    <a href=\"" + link
				+ "\" itemprop=\"url\" style=\"font-family: 'Roboto', sans-serif; box-sizing: border-box; font-size: .8125rem; color: #FFF; text-decoration: none; font-weight: 400; text-align: center; cursor: pointer; display: inline-block; border-radius: .25rem; text-transform: capitalize; background-color: #405189; margin: 0; border-color: #405189; border-style: solid; border-width: 1px; padding: .5rem .9rem;\">Reset Password</a>\n"
				+ "                                                                </td>\n"
				+ "                                                            </tr>\n" + "\n"

				+ "                                                        </tbody></table>\n"
				+ "                                                    </td>\n"
				+ "                                                </tr>\n"
				+ "                                            </tbody></table>\n"
				+ "                                            <div style=\"text-align: center; margin: 28px auto 0px auto;\">\n"
				+ "                                                <h4>Need Help ?</h4>\n"
				+ "                                                <p style=\"color: #878a99;\">Please send and feedback or bug info to <a href=\"\" style=\"font-weight: 500px;\">info@kripton.fr</a></p>\n"
				+ "                                            </div>\n"
				+ "                                        </div>";

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
				return new PasswordAuthentication("a.barketi@sapres.de", "Achref@99");
			}
		};
		Session session = Session.getInstance(props, auth);
		mailService.sendEmail(session, "a.barketi@sapres.de", email, "Reset password", body);

		return pr;
	}
	
	public String ResetPass( Long userId, String token, String password, String confirmPassword) {
		Optional<User> user = userRepo.findById(userId);
		if (!user.isPresent()) {
			return "Invalid link or expired";
		}
		
		PasswordReset passr = passRepo.findByToken(token);
		if(passr == null) {
			return "Invalid link or expireddd";
		}
		System.out.println(password);
		System.out.println(confirmPassword);

		
		if(password.equals(confirmPassword)) {
			System.out.println("done");
			user.get().setPassword(passwordEncoder.encode(password));
			userRepo.save(user.get());
			passRepo.delete(passr);
		}
		return "password reset sucessfully";
	}

}
