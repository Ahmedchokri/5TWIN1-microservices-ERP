import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { User } from 'src/app/account/models/user';
import { AuthService } from 'src/app/services/auth.service';

import { document } from './data';
import { projectListModel, documentModel } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Profile Component
 */
export class ProfileComponent implements OnInit {

  user!: User;
  roleName: any;
  username: any;

  userId:any;

  ImgUrl: any;

  isCurrent: Boolean = true;

  connectedId: any;


  projectList!: projectListModel[];
  document!: documentModel[];

  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;


  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /**
     * Fetches the data
     */
     this.fetchData();

     this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')
      
    });

    
     this.getCurrentUser()

     this.getConnectedUser()



  }

  /**
   * Fetches the data
   */
   private fetchData() {
    
    this.document = document;
  }

  getCurrentUser(){
    this.authService.getUserById(this.userId).subscribe(
      (data: any) => {
        this.user = data;
        this.roleName = data.role.name

        this.ImgUrl = 'data:image/png;base64,' + data.picture.data

        console.log(this.user)
        if(this.user.role.name === "ROLE_ADMIN"){
          this.roleName="Admin"
         } else {
          this.roleName="Commercial Agent"
         }
      }
     )
    
  }

  getConnectedUser(){
    this.authService.getUser().subscribe(
      (data: any) => {
        //console.log(data.id)

        this.connectedId = data.id;
        if(this.userId===this.connectedId){
          this.isCurrent = false
         }
      }
     )
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
