import { Component } from '@angular/core';


import { LeadsModel } from './leads.model';
import { LeadService } from 'src/app/services/lead.service';
import { Lead } from 'src/app/models/Lead';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
/**
  Leads Component
 */
export class LeadsComponent {

  breadCrumbItems!: Array<{}>;
  masterSelected!: boolean;
  CustomersData!: LeadsModel[];
  checkedList: any;
  submitted = false;

  constructor(private modalService: NgbModal, private leadservice: LeadService) { }

  leads!: Lead[];
  inputLead!: Lead;
  searchText: any;
  p: number = 1;
  ImgUrl: Array<String> = new Array();
  images: any;
  currentFile!: File;
  doUpdate: Boolean = false ;


  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'CRM' },
      { label: 'Leads', active: true }
    ];

    this.getLeads();

  }



  getLeads() {
    this.leadservice.retrieveNonConvertedLeads().subscribe(
      data => {
        this.leads = data;
        data.map((i: any) => {
          this.ImgUrl.push('data:image/png;base64,' + i.picture?.data)
        })

      }
    );
  }

//author Ilyes

  save(formData : FormData): void {
    console.log(this.doUpdate)
    if (this.doUpdate == true) {
      //Update
      //console.log(formData.get('file'))
      ///formData.append('file', formData.get('file'));
      console.log('before')
       this.leadservice.updateLead(formData).subscribe(data =>{
        console.log('updt')
       }
       );
    } else {
      //Add   
      console.log('add')
      this.leadservice.addLead(formData).subscribe((data : any) => {
       this.leads.push(data);
       this.ImgUrl.push('data:image/png;base64,' + data.picture.data)
      });
     }
    this.doUpdate = false;
  }

  delete(lead: Lead): void {
    Swal.fire({
      title: 'You are about to delete a lead ?',
      text: 'Deleting your lead will remove all of your information from our database.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        let i = this.leads.indexOf(lead);
        this.leadservice.deleteLead(lead.id).subscribe(data => {
          this.leads.splice(i, 1)
        });
        Swal.fire('Deleted!', 'Leads has been deleted.', 'success');
      }
    });
  }


  update(lead: Lead, content: any): void {
    this.doUpdate = true;
    this.inputLead = lead;
    //this.ImgUrl.push('data:image/png;base64,' + lead.picture.data)
    this.modalService.open(content, { size: 'md', centered: true });
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
    this.inputLead = new Lead();
  }


  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.CustomersData.length; i++) {
      if (this.CustomersData[i].isSelected)
        this.checkedList.push(this.CustomersData[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }


  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (var i = 0; i < this.CustomersData.length; i++) {
      this.CustomersData[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

}

