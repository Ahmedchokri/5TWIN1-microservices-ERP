import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/account/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

/**
 * Profile Settings Component
 */
export class SettingsComponent implements OnInit {

  @Input() user!: User;
  roleName: any;

  userId: any;

  ImgUrl: any;


  selectedFiles!: File;

  currentFile!: File;

  url: any = "assets/images/users/user-dummy-img.jpg";

  constructor(private authService: AuthService, private userService: UserService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')

    });

    this.getCurrentUser();



  }

  selectFile(event: any) {
    if (event.target.files) {
      this.selectedFiles = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e: any) => {
        this.url = reader.result;
        //console.log(reader.result)
      }
    }
  }

  updateUser() {
    this.currentFile = this.selectedFiles;
    const formData = new FormData();


    formData.append('file', this.currentFile);
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('userName', this.user.userName);
    formData.append('email', this.user.email);
    formData.append('phone', this.user.phone.toString());
    formData.append('country', this.user.country);
    this.userService.updateUser(this.user.id, formData).subscribe(
      (data: any) => {
        console.log(data)
      }
    )
    this.router.navigate(['/pages/profile'])
  }


  getCurrentUser() {
    this.authService.getUserById(this.userId).subscribe(
      (data: any) => {
        this.user = data;
        this.roleName = data.role.name
        this.url = 'data:image/png;base64,' + data.picture.data
        //console.log(this.user?.picture.data)

        this.ImgUrl = 'data:image/png;base64,' + data.picture.data

        console.log(this.user)
        if (this.user.role.name === "ROLE_ADMIN") {
          this.roleName = "Admin"
        } else {
          this.roleName = "Commercial Agent"
        }
      }
    )

  }


}
