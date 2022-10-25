import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NgbdContactsSortableHeader } from '../contacts/contacts-sortable.directive';
import { ContactsModel } from '../contacts/contacts.model';
import { ContactsService } from '../contacts/contacts.service';
import { Contacts } from '../contacts/data';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProfilService } from './profil.service';
import { profilModel } from './profil';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
spin :boolean = false;
  public Editor = ClassicEditor;


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  ordersForm!: FormGroup;
  CustomersData!: ContactsModel[];
  masterSelected!:boolean;
  checkedList:any;
  profils : profilModel[]
test : any ;
name : string;
surname : string;
skillsInput :any ;
id :any ;
file: File = null; // Variable to store file
dataValue:any;
  // Table data
  profilslist$!: Observable<profilModel[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdContactsSortableHeader) headers!: QueryList<NgbdContactsSortableHeader>;
  word1: any;
  word2: any;
  profilupdate: any;
  idcv: any;
  constructor( @Inject(DOCUMENT) private document5: Document,private activatedroute : ActivatedRoute,private modalService: NgbModal,public service: ContactsService, private formBuilder: FormBuilder, public service2 : ProfilService) {
    this.profilslist$ = service2.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    let x = this.document5.getElementById('SwitchCheck1')
console.log(x);
   this.service2.getlistprofils().subscribe(data => {
    this.profils=data;
   })
     this.breadCrumbItems = [
      { label: 'CRM' },
      { label: 'Contacts', active: true }
    ];

    /**
     * Form Validation
     */
     this.ordersForm = this.formBuilder.group({
      id: [, [Validators.required]],
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      formation: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      skills: [, [Validators.required]],
      cv: [, [Validators.required]],
      workplace : ['', [Validators.required]],
      localisation : ['', [Validators.required]],
      phoneNumber:['', [Validators.required]],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      skillsnotconfirmed:['', [Validators.required]],
    });

    /**
     * fetches data
     */
     this._fetchData();

  }

  /**
  * User grid data fetches
  */
   private _fetchData() {
    this.CustomersData = Contacts;
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
    return this.ordersForm.controls;
  }

  /**
  * Save user
  */
   saveprofil(){
  
    let serializedForm = JSON.stringify(this.ordersForm.value); 
    this.ordersForm.value['fullname'] =this.ordersForm.value['surname'] + ' ' + this.ordersForm.value['name'];
     console.log(serializedForm)
    this.service2.saveprofil(serializedForm,this.dataValue).subscribe(data => {
      this.ngOnInit()
    })
   }

  /**
   * Confirmation mail model
   */
   confirm(id) {
    Swal.fire({
      title: 'You are about to delete a contact ?',
      text: 'Deleting your contact will remove all of your information from our database.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        this.service2.deleteprofil(id).subscribe((result) => {
          Swal.fire("Deleted!", "Order has been deleted.", "success");
          this.ngOnInit();
        });
    };
  });
   }
  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {/*
    for (var i = 0; i < this.CustomersData.length; i++) {
      this.CustomersData[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();*/
  }

  // Get List of Checked Items
  getCheckedItemList(){/*
    this.checkedList = [];
    for (var i = 0; i < this.CustomersData.length; i++) {
      if(this.CustomersData[i].isSelected)
      this.checkedList.push(this.CustomersData[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);*/
  }

  /**
  * Multiple Default Select2
  */


   selectValue = [];

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
  saveFile(){

  }

    /**
   * Open modal
   * @param content5 modal content
   */
     open4(content5: any,data) {
      this.submitted = false;
      this.modalService.open(content5, { size: 'lg', centered: true });
  
      this.profilupdate = data ;
      this.idcv = data['cv']['id']
      console.log( this.idcv)
    }

  onChange(event) {
    this.spin=true ;
    this.file = event.target.files[0];
    const formdata  = new FormData();
    formdata.append('file', this.file);
this.service2.uploadcv(formdata).subscribe(data => {
  console.log(data)
  if(data!=null){
    this.spin=false ;
    this.selectValue=data['data']['skills']
    this.ordersForm.setControl(
      "skillsnotconfirmed",
      new FormControl(data['data']['skills'])
    );
    this.dataValue=data['id']
  this.ordersForm.setControl(
    "email",
    new FormControl(data['data']['email'])
  );
  this.ordersForm.setControl(
    "phoneNumber",
    new FormControl(data['data']['mobile_number'])
  );
  this.ordersForm.setControl(
    "formation",
    new FormControl(data['data']['college_name'])
  );
  this.ordersForm.setControl(
    "fullname",
    new FormControl(data['data']['name'])
  );
  let name = data['data']['name'];
  const words = name.split(' ');
  console.log(words[0]);
  console.log(words[1]);
  this.word1 = words[0];
  this.word2 = words[1];
  this.ordersForm.setControl(
    "surname",
    new FormControl(words[0])
  );
  this.ordersForm.setControl(
    "name",
    new FormControl(words[1])
  );
// expected output: "fox"
  this.ordersForm.setControl(
    "experience",
    new FormControl(data['data']['experience'].toString())
  )
  }
 
});
}
onChange5($event){
  console.log($event)
}
change( event){
  let card = event.target.closest('.lol');
  console.log( card.children)
  const surname = card.children[0].children[1];
  const name = card.children[1].children[1];
 let a = surname.value
  let b = name.value

if(surname.value == a )
{
  name.value =  a
  surname.value = b
  this.ordersForm.setControl(
    "surname",
    new FormControl( surname.value)
  );
  this.ordersForm.setControl(
    "name",
    new FormControl( name.value )
  );
console.log('kol chya fi blastah donc ne3ks')
}
else{
  console.log('kol chya ma3kous donc nrj3h')
surname.value =  a
name.value = b
this.ordersForm.setControl(
  "surname",
  new FormControl( surname.value)
);
this.ordersForm.setControl(
  "name",
  new FormControl( name.value )
);
}

}
updateprofil(){
  this.ordersForm.value['skillsnotconfirmed']= this.profilupdate.skillsnotconfirmed;
  this.ordersForm.value['fullname'] =this.ordersForm.value['surname'] + ' ' + this.ordersForm.value['name'];
  let serializedForm = JSON.stringify(this.ordersForm.value);
  console.log(serializedForm);
  this.service2.saveprofil(serializedForm,this.idcv).subscribe(data => {
   this.ngOnInit()
  })
}
}
