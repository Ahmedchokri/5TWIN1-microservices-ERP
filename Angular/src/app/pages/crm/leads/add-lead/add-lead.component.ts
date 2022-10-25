import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lead } from 'src/app/models/Lead';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss']
})
export class AddLeadComponent implements OnInit {

  @Input() lead!: Lead;
  @Output() addEvent = new EventEmitter();
  url: any = "assets/images/users/user-dummy-img.jpg";
  selectedFiles!: File;
  currentFile!: File;



  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.url='data:image/png;base64,'+this.lead?.picture.data;
  }

  save() {
    this.currentFile = this.selectedFiles;
    console.log(this.currentFile)
    const formData = new FormData();
    formData.append('file', this.currentFile);
    formData.append('firstName', this.lead.firstName+'');
    formData.append('lastName', this.lead.lastName+'');
    formData.append('email', this.lead.email+'');
    formData.append('phone', this.lead.phone);
    formData.append('leadSource', this.lead.leadSource+'');
    
    if (this.lead.id ){ 
      formData.append('id', this.lead.id+'');
      formData.append('status', this.lead.status+'');
    }else{
      formData.append('status', 'New');
    }
    this.addEvent.emit(formData);
    this.modalService.dismissAll();
    
  }

  selectFile(event: any) {
    if (event.target.files) {
      this.selectedFiles = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e: any) => {
        this.url = reader.result;
      }
    }
  }


}
