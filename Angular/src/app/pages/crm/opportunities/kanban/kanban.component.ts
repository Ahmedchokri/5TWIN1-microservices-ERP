
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ListViewService } from '../list-view/list-view.service';
import { QuoteModel } from '../list-view/quote.model';
import { CallModel } from '../list-view/call.model';
import  {format } from "timeago.js";
import { OpportunitiesModel } from '../list-view/list-view.model';
import { Countrymodel } from '../list-view/country.model';
import { ContactsModel } from '../../contacts/contacts.model';
import { opportunityanalysis } from '../list-view/opportunityanalysis.model';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  @ViewChild('content', {
    static: true
  }) sample: ElementRef;
  @ViewChild('content4', {
    static: true
  }) content4: ElementRef;
  @ViewChild('content6', {
    static: true
  }) content6: ElementRef;
  @ViewChild('content7', {
    static: true
  }) content7: ElementRef;
  ordersForm!: FormGroup;
  submitted = false;
  id: string;
affiche =false;
affiche1 =false ;
  live : true ;
  quote$!: Observable<QuoteModel[]>;
  private _total$ = new BehaviorSubject<number>(0);
  total$: Observable<number>;
  callForm: FormGroup;
  calls: CallModel[];
  opportunite : OpportunitiesModel = new OpportunitiesModel();
  country : Countrymodel = new Countrymodel();
  contact: ContactsModel = new ContactsModel();
  quotes: QuoteModel[];
  opporanalysis: FormGroup;
  show =false ;
  Cancurants: FormGroup;
  opportunityanalysis: opportunityanalysis = new opportunityanalysis();
  opp_status: FormGroup;
  constructor(
    public service: ListViewService,
    private activatedroute : ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { 
  }

  /**
   * Open modal
   * @param content1 modal content
   */
   openModal1(content1: any) {
    this.submitted = false;
    this.modalService.open(content1, { size: "lg", centered: true });
  }
markerStep=[true,false,false,false,false] ;
condition = false
  marker () { 
    if(this.markerStep[1]==false && this.markerStep[0]==false && this.markerStep[2]==false && this.markerStep[3]==false && this.markerStep[4]==false){
      this.markerStep[0]=true ;


    } 
    else if(this.markerStep[1]==false && this.markerStep[0] && this.markerStep[2]==false && this.markerStep[3]==false && this.markerStep[4]==false){
      this.markerStep[1]=true ;
      let serializedForm = JSON.stringify("needs_analysis");
      this.service.setstatusoppo(serializedForm,this.id).subscribe((data)=>{
        console.log("status changed")
      })
      this.openmodel(this.content6);

    } 
    else if(this.markerStep[1]==true && this.markerStep[0] == true && this.markerStep[2]==false && this.markerStep[3]==false && this.markerStep[4]==false){
      this.markerStep[2]=true ;
      this.openModel(this.sample)
      let serializedForm = JSON.stringify("proposal_quotes");
      this.service.setstatusoppo(serializedForm,this.id).subscribe((data)=>{
        console.log("status changed")
      })
    } 
    else if(this.markerStep[1]==true && this.markerStep[0] == true && this.markerStep[2]==true && this.markerStep[3]==false && this.markerStep[4]==false){
      this.markerStep[3]=true ;
      let serializedForm = JSON.stringify("negotiation");
      this.service.setstatusoppo(serializedForm,this.id).subscribe((data)=>{
        console.log("status changed")
      })
    } 
    else if(this.markerStep[1]==true && this.markerStep[0] == true && this.markerStep[2]==true && this.markerStep[3]==true && this.markerStep[4]==false){
      this.markerStep[4]=true ;
      let serializedForm = JSON.stringify("closed_win");
 this.openModel(this.content7);
    } 
} 
discussion(){
  this.markerStep[0]=true;
  this.markerStep[1]=false; 
  this.markerStep[2]=false;
  this.markerStep[3]=false
  this.markerStep[4]=false
  this.openmodel(this.content4);
  let serializedForm = JSON.stringify("discussion_Stage");
  this.service.setstatusoppo(serializedForm,this.id).subscribe((data)=>{
  
  })
  }
  needsanalysis(){
    this.markerStep[0]=true;
    this.markerStep[1]=true; 
    this.markerStep[2]=false;
    this.markerStep[3]=false
    this.markerStep[4]=false
    let serializedForm = JSON.stringify("needs_analysis");
    this.openModel(this.content6)
    this.service.setstatusoppo(serializedForm,this.id).subscribe((data)=>{
    
    })
    }
    proposalquote(){
      this.markerStep[0]=true;
      this.markerStep[1]=true; 
      this.markerStep[2]=true; 
      this.markerStep[3]=false
      this.markerStep[4]=false
      this.openModel(this.sample)
      let serializedForm = JSON.stringify("proposal_quotes");
      this.service.setstatusoppo(serializedForm,this.id).subscribe((data)=>{
        console.log("status changed")
      })
    }
    Negociation(){
      this.markerStep[0]=true;
      this.markerStep[1]=true; 
      this.markerStep[2]=true; 
      this.markerStep[3]=true;
      this.markerStep[4]=false;
      let serializedForm = JSON.stringify("negotiation");
      this.service.setstatusoppo(serializedForm,this.id).subscribe((data)=>{
        console.log("status changed")
      })
    }
    Closed(){
      this.markerStep[0]=true;
      this.markerStep[1]=true; 
      this.markerStep[2]=true; 
      this.markerStep[3]=true;
      this.markerStep[4]=true; 
      this.openModel(this.content7);
    }
    changestatus(){
      let opp = new OpportunitiesModel();
      opp.dateclosed=new Date()
      opp.reasonlost =this.opp_status.value['reasonlost']
      opp.status=this.opp_status.value['status']
      let serializedForm = JSON.stringify(opp);
      console.log(serializedForm)
      this.service.setfinalstatusoppo(serializedForm,this.id).subscribe((data)=>{
        console.log("status changed")
      })
    }
confirm() {

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
    
  };
});
 }
 confirm1(data) {

  Swal.fire({
    title: 'You are about to delete a quote ?',
    text: 'Deleting your quote will remove all of your information from our database.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f46a6a',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Close'
  }).then(result => {
    if (result.value) {
      this.service.deletequote(data,this.id).subscribe((data)=>{
        this.service.getopportunity(this.id).subscribe(result => {
          this.opportunite=result;
          this.calls = result.calls;
          this.quotes=result.quotes;
          this.country = result.country;
          this.contact =result.contact;
          if(result.opportunityanalysis!=null){
            this.opportunityanalysis =result.opportunityanalysis;
          }

         })
      })
  };
});
 }
  ngOnInit(): void {
   /// console.log(format)
  
    this.activatedroute.paramMap.subscribe(params => {

      this.id=params.get('id')
     console.log(this.id); 
     });
     this.service.getopportunity(this.id).subscribe(result => {
      this.opportunite=result;
      this.calls = result.calls;
      this.quotes=result.quotes;
      this.country = result.country;
      this.contact =result.contact;
      if(result.opportunityanalysis!=null){
        this.opportunityanalysis =result.opportunityanalysis;
      }
      
      if(result.status=="negotiation"){
        this.Negociation();
      }
      if(result.status=="proposal_quotes"){
        this.proposalquote()
      }
      else if(result.status=="needs_analysis" ){
        this.needsanalysis();
      }
      else if(result.status=="discussion_Stage" ){
        this.discussion();
      }
      else if(result.status=="closed_lost" ){
        this.Closed();
      }
      else if(result.status=="closed_win" ){
        this.Closed();
      }
     })
    this.ordersForm = this.formBuilder.group({
      id: [],
      quoteName: ["", [Validators.required]],
      amount: ["", [Validators.required]],
    });

    this.opporanalysis = this.formBuilder.group({
      id: [],
      chiffre_affaire: ["", [Validators.required]],
      maitrise_sujet: ["", [Validators.required]],
      maitrise_sujet_remarque: new FormArray([]),
      maitrise_client_remarque: [, [Validators.required]],
      maitrise_client: ["", [Validators.required]],
      risque: ["", [Validators.required]],
      cancurants: this.formBuilder.array([
        this.formBuilder.group({
          id: [],
      concurantname: ["", [Validators.required]],
      prix: ["", [Validators.required]],
      reputation: ["", [Validators.required]],
      part_pourcentage: ["", [Validators.required]],
        })
      ]) ,
    });

    this.callForm = this.formBuilder.group({
      id: [],
      subject: ["", [Validators.required]],
      description: ["", [Validators.required]],
      date: [, [Validators.required]],
    });
    this.opp_status=this.formBuilder.group({
      status: ["", [Validators.required]],
      reasonlost: ["", [Validators.required]],
    });
   
  }
  onCheckboxChange(event: any) {
    
    const selectedreasons = (this.opporanalysis.controls['maitrise_sujet_remarque'] as FormArray);
    if (event.target.checked) {
      selectedreasons.push(new FormControl(event.target.value));
    } else {
      const index = selectedreasons.controls
      .findIndex(x => x.value === event.target.value);
      selectedreasons.removeAt(index);
    }
  }
  test(){

  this.affiche=true;

  }
  test1(){

    this.affiche=false;
  
    }
    test2(){

      this.affiche1=false;
    
      }
      test3(){
    
        this.affiche1=true;
      
        }
  newcancurant(): FormGroup {
    
    return this.formBuilder.group({
      id: [],
      concurantname: ["", [Validators.required]],
      prix: ["", [Validators.required]],
      reputation: ["", [Validators.required]],
      part_pourcentage: ["", [Validators.required]],
    })
  }
  cancurant() : FormArray {
    return this.opporanalysis.get("cancurants") as FormArray
  }
  addcancurant() {
    this.cancurant().push(this.newcancurant());
    
  }
  removecancurant(i:number) {
    if(i!=0){
       this.cancurant().removeAt(i);
    }
   
  }
  oppstatus(oppstatus: any) {
    throw new Error('Method not implemented.');
  }
    /**
   * Open modal
   * @param content modal content
   */
  openModel(content: any) {
  
    this.modalService.open(content, { size: "lg", centered: true });
   
  }
    /**
   * Open modal
   * @param content4 modal content
   */
  openmodel(content4: any){
    this.modalService.open(content4, { size: "lg", centered: true });

  }
     /**
   * Open modal
   * @param content5 modal content
   */
      openModel2(content5: any){
        this.modalService.open(content5, { size: "lg", centered: true });
    
      }
  savecall(){
    console.log(this.callForm.value)
    //this.callForm.value['date']=
    let serializedForm = JSON.stringify(this.callForm.value);
    this.service.callasigntoopportunity(serializedForm,this.id).subscribe(data =>{
      console.log("call added")
    })
  }
  get form() {
    return this.ordersForm.controls;
  }
  saveTicket(){
    console.log(this.ordersForm.value)
    let serializedForm = JSON.stringify(this.ordersForm.value);

    this.service.assignquotetoopp(serializedForm,this.id).subscribe((data)=>{
      this.service.getopportunity(this.id).subscribe(result => {
        this.opportunite=result;
        this.calls = result.calls;
        this.quotes=result.quotes;
        this.country = result.country;
        this.contact =result.contact;
        if(result.opportunityanalysis!=null){
          this.opportunityanalysis =result.opportunityanalysis;
        }

       })
    })
  }
  format1 (date){
    return format(date)
  }
  onChange($event){
    //console.log($event.target.value)

if($event.target.value=="proposal_quotes"){
  
  console.log('test')
  this.proposalquote()
}
if($event.target.value=="needs_analysis"){
  console.log('needs_analysis')
  this.needsanalysis()
}
if($event.target.value=="negotiation"){
  this.Negociation()
}
if($event.target.value=="discussion_Stage"){
  this.discussion();
  }
  if($event.target.value=="closed"){
    this.Closed();
  }
  }
  saveoppanalysis(){
    let serializedForm = JSON.stringify(this.opporanalysis.value);
    console.log(serializedForm)
  this.service.affecteroppoanalysistoopp(serializedForm,this.id).subscribe(()=>{
console.log('ok');
  })
  }
  reason(data){
    console.log(data)
   var span =  "<i>"+data+"</i>";
    Swal.fire({
      title: 'Reasons why the client is not metrised',
      html: span,
      icon: 'warning',
      confirmButtonColor: '#bcdefb',
      cancelButtonText: 'Close'
    })
  }
  reason1(data){
    console.log(data)
    var  span="";
    for (var i = 0; i < data.length; i++){
     span =span+"<p>"+data[i]+"</p></br>" 
    }
    Swal.fire({
      title: 'Reasons why the subject is not metrised',
      html: span,
      icon: 'warning',
      confirmButtonColor: '#bcdefb',
      cancelButtonText: 'Close'
    })
  }
  choice($event){
   if($event.target.value=="closed_lost"){
    this.show =true;
   }
   else if($event.target.value=="closed_win"){
    this.show =false;
   }

  }
}