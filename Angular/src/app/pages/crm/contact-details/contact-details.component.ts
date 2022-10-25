import { Component, OnInit, ViewChild } from '@angular/core';

import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';

import { projectList, document } from '../lead-details/data';
import { projectListModel, documentModel } from './contacts.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  projectList!: projectListModel[];
  document!: documentModel[];

  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  constructor() { }

  ngOnInit(): void {
    /**
     * Fetches the data
     */
     this.fetchData();
  }

  /**
   * Fetches the data
   */
   private fetchData() {
    this.projectList = projectList;
    this.document = document;
  }

  /**
   * Swiper setting
   */
   config = {
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 25,
    breakpoints:{
      768:{
        slidesPerView: 2, 
      },
      1200:{
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


}
