import { Component, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {of} from 'rxjs';

// Sweet Alert
import Swal from 'sweetalert2';

import { User } from '../../../account/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from './users.service';
import { NgbdUsersSortableHeader } from './users-sortable.directive';
import { __values } from 'tslib';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService, DecimalPipe]
})
/**
 * Leads Component
 */
export class UsersComponent implements OnInit {

  public Editor = ClassicEditor;

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  usersForm!: FormGroup;
  usersData!: User[];
  masterSelected!: boolean;
  checkedList: any;

  users: any;

  user = new User();

  ImgUrl: Array<String> = new Array();

  images: any;

  selectedFiles!: File;

  currentFile!: File;

  url: any = "assets/images/users/user-dummy-img.jpg";

  role: any;

  p: number = 1;

  searchText: any;

 

  usersList$!: Observable<User[]>;
  total$: Observable<number>

  @ViewChildren(NgbdUsersSortableHeader) headers!: QueryList<NgbdUsersSortableHeader>;


  constructor(private modalService: NgbModal, private userService: UserService,
    private authService: AuthService, private formBuilder: FormBuilder, public service: UsersService) {
    this.usersList$ = service.countries$;
    this.total$ = service.total$;
  }

 
  

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'CRM' },
      { label: 'Users', active: true }
    ];


    //this.getUser();
   // console.log(this.invoiceList$)
    // this.invoiceList$.subscribe(
    //   (data: any) => {
    //     console.log(data)
    //     //this.users = data
    //   }
    // )


    /**
     * Form Validation
     */
    this.usersForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      role: ['', [Validators.required]],
      picture: ['', []]


    });

    //console.log(this.users.picture)



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
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  /**
   * Form data get
   */
  get form() {
    return this.usersForm.controls;
  }

  hexToBase64(str: any) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
  }

  /**
   * All users
   */
  // getUser() {
  //   this.authService.getUsers().subscribe(
  //     (data: any) => {
  //       this.users = data
  //       this.images = data.picture;

  //       //console.log(data)

  //       data.map((i: any) => {
  //         this.ImgUrl.push('data:image/png;base64,' + i.picture.data)
  //       })


  //       if (this.usersForm.value.role === "User") {
  //         this.userService.assignRoleAgent(this.usersForm.value.userName).subscribe();
  //       }
  //       if (this.usersForm.value.role === "Admin") {
  //         this.userService.assignRoleAdmin(this.usersForm.value.userName).subscribe();
  //       }

  //     }
  //   )
  // }

  getRole(data: any) {
    if (data.role.name === null) {
      this.role = ""
      return;
    }
    else if (data.role.name === "ROLE_USER") {
      this.role = "USER"
    }
    else {
      this.role = "ADMIN"
    }
  }

  /**
  * Save user
  */
  saveUser() {
    this.currentFile = this.selectedFiles;
    console.log(this.currentFile.name)

    const formData = new FormData();


    formData.append('file', this.currentFile);
    formData.append('firstName', this.usersForm.value.firstName);
    formData.append('lastName', this.usersForm.value.lastName);
    formData.append('userName', this.usersForm.value.userName);
    formData.append('email', this.usersForm.value.email);
    formData.append('phone', this.usersForm.value.phone);
    formData.append('country', this.usersForm.value.country);
    formData.append('password', this.usersForm.value.password);


    this.userService.saveUser(formData).subscribe(
      (data: any) => {
        console.log(data);
        this.users.push(data)
        this.ImgUrl.push('data:image/png;base64,' + data.picture.data)
        Swal.fire('Added!', 'User has been added.', 'success');
        this.modalService.dismissAll();
      }
    )

    setTimeout(() => this.assignRole(), 2000)



  }

  assignRole() {
    if (this.usersForm.value.role === "User") {
      this.userService.assignRoleAgent(this.usersForm.value.userName).subscribe();
    }
    if (this.usersForm.value.role === "Admin") {
      this.userService.assignRoleAdmin(this.usersForm.value.userName).subscribe();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.user.firstName = this.usersForm.value.firstName;
    this.user.lastName = this.usersForm.value.lastName;
    this.user.userName = this.usersForm.value.userName;
    this.user.email = this.usersForm.value.email;
    this.user.password = this.usersForm.value.password;
    this.user.phone = this.usersForm.value.phone;
    this.user.country = this.usersForm.value.country;


    this.saveUser()
  }

  /**
   * Confirmation mail model
   */
  deleteUser(user: any) {
    Swal.fire({
      title: 'You are about to delete this user ?',
      text: 'Deleting your user will remove all of your information from our database.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        //let i = this.users.indexOf(user);
        this.userService.deleteUser(user.id).subscribe(data => {
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          this.usersList$.subscribe(data=>{
            let i = data.indexOf(user)
            data.splice(i,1)
          })
        });
      } else {
        Swal.fire("User is safe!");
      }
    });
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (var i = 0; i < this.usersData.length; i++) {
      this.usersData[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.usersData.length; i++) {
      if (this.usersData[i].isSelected)
        this.checkedList.push(this.usersData[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  /**
  * Multiple Default Select2
  */
  selectValue = ['Tunisia', 'Germany', 'France'];


  /**
  * Open modal
  * @param content1 modal content
  */
  open(content1: any) {
    this.modalService.open(content1, { size: 'lg', centered: true });
  }
  /**
  * Open modal
  * @param content2 modal content
  */
  open2(content2: any) {
    this.modalService.open(content2, { size: 'lg', centered: true });
  }


  clickOffCanvas() {
    document.getElementById('offcanvasExample')!.setAttribute("style", "visibility: visible;");
  }
  closeOffCanvas(){
    document.getElementById('offcanvasExample')!.setAttribute("style", "visibility: hidden;");
    
  }
}
