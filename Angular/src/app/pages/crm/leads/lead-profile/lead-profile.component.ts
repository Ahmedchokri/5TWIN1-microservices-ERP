import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { User } from 'src/app/core/models/auth.models';
import { Lead } from 'src/app/models/Lead';
import { LeadSource } from 'src/app/models/LeadSource';
import { LeadStatus } from 'src/app/models/LeadStatus';
import { data } from 'src/app/pages/charts/Apexcharts/area/area.component';
import { LeadService } from 'src/app/services/lead.service';
import { projectListModel, documentModel } from '../../lead-details/lead.model';

@Component({
  selector: 'app-lead-profile',
  templateUrl: './lead-profile.component.html',
  styleUrls: ['./lead-profile.component.scss']
})
export class LeadProfileComponent implements OnInit {

  lead !: Lead;

  leadId: any;

  ImgUrl: any;
  pic:any;

  markerStep = [false, false, false, false, false];


  projectList!: projectListModel[];
  document!: documentModel[];

  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;


  constructor(private route: ActivatedRoute, private leadservice: LeadService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.leadId = params.get('id')
      this.getLead(this.leadId);

    });
  }

  getLead(leadId: any) {
    this.leadservice.findLead(this.leadId).subscribe((data: any) => {
      this.lead = data
      this.ImgUrl = 'data:image/png;base64,' + data.picture.data
      this.pic= data.picture.data;
      if(data.status == 'Appointment')
      {
        this.Appointment();
      }
      if(data.status == 'New')
      {
        this.New();
      }
      if(data.status == 'Working')
      {
        this.Working();
      }
      if(data.status == 'Unqualified')
      {
        this.Unqualified();
      }
      if(data.status == 'Converted')
      {
        this.Convert();
      }
    }
    );
  }



  /**
   * Swiper setting
   */
  config = {
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 25,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      }
    }
  };

  /**
   * Swiper card previous set
   */
  previousSlideComp() {
    this.componentRef!.directiveRef!.prevSlide();
  }

  /**
   * Swiper card next set
   */
  nextSlideComp() {
    this.componentRef!.directiveRef!.nextSlide();
  }

  New(){
    this.markerStep[0]=true;
    this.markerStep[1]=false; 
    this.markerStep[2]=false; 
    this.markerStep[3]=false;
    this.markerStep[4]=false;
    const formData = new FormData();
    formData.append('file', this.pic);
    formData.append('firstName', this.lead.firstName+'');
    formData.append('lastName', this.lead.lastName+'');
    formData.append('email', this.lead.email+'');
    formData.append('phone', this.lead.phone);
    formData.append('leadSource', this.lead.leadSource+'');
    formData.append('status', 'New');
    formData.append('id', this.lead.id+'');
    this.leadservice.updateLeadStatus(formData).subscribe();
  }

  Working(){
    this.markerStep[0]=false;
    this.markerStep[1]=true; 
    this.markerStep[2]=false; 
    this.markerStep[3]=false;
    this.markerStep[4]=false;
    const formData = new FormData();
    formData.append('file', this.pic);
    formData.append('firstName', this.lead.firstName+'');
    formData.append('lastName', this.lead.lastName+'');
    formData.append('email', this.lead.email+'');
    formData.append('phone', this.lead.phone);
    formData.append('leadSource', this.lead.leadSource+'');
    formData.append('status', 'Working');
    formData.append('id', this.lead.id+'');
    this.leadservice.updateLeadStatus(formData).subscribe();
  }

  Unqualified(){
    this.markerStep[0]=false;
    this.markerStep[1]=false; 
    this.markerStep[2]=true; 
    this.markerStep[3]=false;
    this.markerStep[4]=false;
    const formData = new FormData();
    formData.append('file', this.pic);
    formData.append('firstName', this.lead.firstName+'');
    formData.append('lastName', this.lead.lastName+'');
    formData.append('email', this.lead.email+'');
    formData.append('phone', this.lead.phone);
    formData.append('leadSource', this.lead.leadSource+'');
    formData.append('status', 'Unqualified');
    formData.append('id', this.lead.id+'');
    this.leadservice.updateLeadStatus(formData).subscribe();
  }

  Appointment(){
    this.markerStep[0]=false;
    this.markerStep[1]=false; 
    this.markerStep[2]=false; 
    this.markerStep[3]=true;
    this.markerStep[4]=false;
    const formData = new FormData();
    formData.append('file', this.pic);
    formData.append('firstName', this.lead.firstName+'');
    formData.append('lastName', this.lead.lastName+'');
    formData.append('email', this.lead.email+'');
    formData.append('phone', this.lead.phone);
    formData.append('leadSource', this.lead.leadSource+'');
    formData.append('status', 'Appointment');
    formData.append('id', this.lead.id+'');
    this.leadservice.updateLeadStatus(formData).subscribe();
  }

  Convert(){
    this.markerStep[0]=false;
    this.markerStep[1]=false; 
    this.markerStep[2]=false; 
    this.markerStep[3]=false;
    this.markerStep[4]=true;
    const formData = new FormData();
    formData.append('file', this.pic);
    formData.append('firstName', this.lead.firstName+'');
    formData.append('lastName', this.lead.lastName+'');
    formData.append('email', this.lead.email+'');
    formData.append('phone', this.lead.phone);
    formData.append('leadSource', this.lead.leadSource+'');
    formData.append('status', 'Converted');
    formData.append('id', this.lead.id+'');
    this.leadservice.updateLeadStatus(formData).subscribe();
  }




}
