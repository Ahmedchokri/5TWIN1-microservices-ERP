import {
  Component,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from "@angular/core";

import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from "@angular/forms";
import { OpportunitiesModel } from "./list-view.model";
import { COUNTRIES } from "./data";
import { ListViewService } from "./list-view.service";
import {
  NgbdListViewSortableHeader,
  SortEvent,
} from "./list-view-sortable.directive";
import { ContactsModel } from "../../contacts/contacts.model";
import { ContactsService } from "../../contacts/contacts.service";
import { Countrymodel } from "./country.model";
import { DetailsComponent } from "src/app/pages/tasks/details/details.component";
import { ProfilService } from "../../profil/profil.service";
import { profilModel } from "../../profil/profil";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"],
})
export class ListViewComponent implements OnInit {
 
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  selectValue: any;
  skillsInput:any;
  ordersForm!: FormGroup;
  CustomersData!: OpportunitiesModel[];
  checkedList: any;
  masterSelected!: boolean;
  contacts: ContactsModel[];
  // Table data
  listViewList$!:  Observable<OpportunitiesModel[]>;
  listopp!:  OpportunitiesModel[];
  countries: Countrymodel[];
  total$: Observable<number>;
  opp: OpportunitiesModel = new OpportunitiesModel();
  opptoupdate: OpportunitiesModel = new OpportunitiesModel();
  oppdetail :OpportunitiesModel;
  @ViewChildren(NgbdListViewSortableHeader)
  headers!: QueryList<NgbdListViewSortableHeader>;
  skills: string[];
  profils: profilModel[];
  inputskills: any;
  x=[];
  tab=[];
  tess: any;
  ///profils: profilModel[] ;

  constructor(
    private modalService: NgbModal,
    public service: ListViewService,
    public servicecontact: ContactsService,
    private formBuilder: FormBuilder,
    private profilservice :ProfilService ,
  ) {
    this.total$ = service.total$;
  
    console.log( this.total$)
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.skills = ['python','php','angular','nodejs','reactjs','javascript','crm','spring','Java','.net']
     this.ordersForm = this.formBuilder.group({
      id: [this.opptoupdate.id],
      opportunityName: ["", [Validators.required]],
      description: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      opportunityType: ["", [Validators.required]],
      contact: [, [Validators.required]],
      country: ["", [Validators.required]],
      status :["", [Validators.required]],
      profils:[ ,[Validators.required]],
    });

   this.service.allopportunities().subscribe((data)=>{
this.listopp=data;
   })
     this.listViewList$ = this.service.countries$;
    // console.log(this.listViewList$);
    this.service.allcountries().subscribe((data) => {
      this.countries = data;
    });
    this.servicecontact.allcontacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
   /* this.service.allopportunities().subscribe((result) => {
      this.listViewList$ = result;
    });*/
    this.breadCrumbItems = [
      { label: "Tasks" },
      { label: "Tasks List", active: true },
    ];
 

   
    /**
     * fetches data
     */
    this._fetchData();
  }
  deleteopp(id: String) {
    this.service.deleteopportunity(id).subscribe((data)=>{
      this.ngOnInit()
    });
  }
 
  /**
   * User grid data fetches
   */
  private _fetchData() {
   /// this.CustomersData = COUNTRIES;
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });
  }
 /**
   * Open modal
   * @param content2 modal content
   */
  openModal2(content2: any,data) {
    this.submitted = false;
    this.modalService.open(content2, { size: "md", centered: true });
    this.oppdetail=data
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
  saveopportunity() {
  
      this.opp.amount = this.ordersForm.value["amount"];
      this.opp.description = this.ordersForm.value["description"];
      this.opp.opportunityName = this.ordersForm.value["opportunityName"];
      this.opp.opportunityType = this.ordersForm.value["opportunityType"];
      let serializedForm = JSON.stringify(this.opp);
      this.service.createOpportinity(
          serializedForm,
          this.ordersForm.value["contact"],
          this.ordersForm.value["country"]).subscribe(() => {
          this.ngOnInit();
        });
    }
  

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    /*
   for (var i = 0; i < this.CustomersData.length; i++) {
     this.CustomersData[i].isSelected = this.masterSelected;
   }
   this.getCheckedItemList();*/
  }

  // Get List of Checked Items
  getCheckedItemList() {
    /*
   this.checkedList = [];
   for (var i = 0; i < this.CustomersData.length; i++) {
     if(this.CustomersData[i].isSelected)
     this.checkedList.push(this.CustomersData[i]);
   }
   this.checkedList = JSON.stringify(this.checkedList);*/
  }

  /**
   * Open modal
   * @param content1 modal content
   */
  openModal1(content1: any, data ) {
    this.opptoupdate=data ;
    this.submitted = false;
    this.modalService.open(content1, { size: "lg", centered: true });
    this.ordersForm.setControl(
      "opportunityName",
      new FormControl(this.opptoupdate.opportunityName, [Validators.required])
    );
    this.ordersForm.setControl(
      "description",
      new FormControl(this.opptoupdate.description, [Validators.required])
    );
    this.ordersForm.setControl(
      "amount",
      new FormControl(this.opptoupdate.amount)
    );
    this.ordersForm.setControl(
      "opportunityType",
      new FormControl(this.opptoupdate.opportunityType)
    );
    this.ordersForm.setControl(
      "contact",
      new FormControl(this.opptoupdate.contact)
    );
    this.ordersForm.setControl(
      "country",
      new FormControl(this.opptoupdate.country)
    );
  }
  update() {
    ///  console.log(this.ordersForm.value);
 
      this.opp.id = this.opptoupdate.id;
      this.opp.amount = this.ordersForm.value["amount"];
      this.opp.description = this.ordersForm.value["description"];
      this.opp.opportunityName = this.ordersForm.value["opportunityName"];
      this.opp.opportunityType = this.ordersForm.value["opportunityType"];
      let serializedForm = JSON.stringify(this.opp);
      console.log(serializedForm);
      this.service
        .createOpportinity(
          serializedForm,
          this.ordersForm.value["contact"],
          this.ordersForm.value["country"]
        )
        .subscribe((f) => {
          this.ngOnInit();
    
  })
}
 keyword = 'skills';
 onChange5(event){

console.log("event")

 }
 onChange(data){
this.inputskills=data
////console.log(this.inputskills);

this.profilservice.getlistprofils().subscribe((data) => {
 /// console.log(data[1]['skills'])
  let tab =[]
  this.selectValue=data[1]['skills']
  data.filter((profil)=>{
    ///console.log(profil)
  for(var i = 0; i < profil['skills'].length; i++){
    for(var j = 0; j < this.inputskills.length; j++){
        if(this.inputskills[j] == profil['skills'][i]){
  /// console.log(profil)
    tab.push(profil)
  ///  console.log(tab)
  };  
    }
    // return profil['skills'][i].toLowerCase().mat(this.inputskills[0]);

  }
  ///console.log(tab)
  return tab
  }
 
  
  )
this.profils=tab/// this.ordersForm['profils']=data[1]['skills']
///console.log(this.profils)


////console.log(this.profils.sort())

this.occ(this.profils)
//console.log( this.profils)
//console.log(tab)
  ///this.ordersForm.value['profils']= data[1]['skills'];
// this.ordersForm.setControl(
 //  "profils",
//new FormControl(['ee','r'])
//  );
})
 }
  occ(tableu){ 
    var occ =0;
///this.profils.sort()
let test ={
  id : '',
  nbocc : 0,

}

var tab2=[];
///console.log(tableu)
var bool =false ;
let i =0;
while(i<tableu.length){
  this.tess=tableu[i]['id']
  ///console.log(this.tab)
  
for(var j = 0; j < tableu.length; j++){

    if(tableu[i]['id']==tableu[j]['id'] ){
      occ=occ+1;

    } 
    else{
     tab2.push(tableu[j])
    
    } 
    bool =false
    //console.log(tableu[i]['id'] )
    

 
 }

   test.id = tableu[i]['id'] 
    test.nbocc=occ 
    occ=0
    this.tab.push(test)   
    console.log(test)
    console.log(this.tab )
 
  i=i+1;
 
  


 }
 /*
if(tab2==tableu){
  this.occ(tab2) 
}
else
return null
  */
}

}