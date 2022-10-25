import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { first } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  user = new User();

  fieldTextType!: boolean;

  form: any = {};

  username! : string;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService) {

  }

  ngOnInit(): void {
    //this.tokenStorage.clear();

    


  }



  onSubmit(): void {
    console.log(this.form.username, this.form.password)
    this.authService.login(this.form.username, this.form.password).subscribe(
      (data: any) => {
        console.log("aaaa" + JSON.stringify(data))
        this.tokenStorage.saveToken(data.access_token);
        //this.tokenStorage.saveUser(data);

     

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.tokenStorage.isLoggedIn();

        localStorage.setItem('isMailLoggedIn',""+false)


        this.authService.setRole();


        this.authService.getUser().subscribe(
          (data: any) => {
            console.log(data)
          }
        )

        this.router.navigate(['/crm'])

     
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Credentials!',
        })
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
        this.isLoginFailed = true;
      }
    );
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
