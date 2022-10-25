import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordResetService } from 'src/app/services/password-reset.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})

/**
 * Pass-Reset Basic Component
 */
export class BasicComponent implements OnInit {

  // Login Form
  passresetForm!: FormGroup;
  submitted = false;
  exist: Boolean=false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private passwordResetService: PasswordResetService) { }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
     this.passresetForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.passresetForm.controls; }

  /**
   * Form submit
   */
   onSubmit() {
    this.submitted = true;
    console.log(this.passresetForm.value.email)
    this.checkUser();
    this.passwordReset();
    // stop here if form is invalid
    if (this.passresetForm.invalid) {
      return;
    }
  }

  passwordReset(){
    const formData=new FormData();
    formData.append('email',this.passresetForm.value.email)
    this.passwordResetService.passwordReset(formData).subscribe(
      (data:any) => {
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Email sent successfully!',
        })
        localStorage.setItem('ResetPassToken',""+data.token)
        localStorage.setItem('ResetPassUser',""+data.user.id)

      }
    )
  }

  checkUser(){
    this.authService.getUserByEmail(this.passresetForm.value.email).subscribe(
      data => {
        console.log(data)
        if(data == null){
          this.exist = false
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email adress does not exist!',
          })
          
        }
        if(data != null){
          this.exist = true
        }
      }
    )
  }

}
