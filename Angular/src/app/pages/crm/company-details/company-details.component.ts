import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { projectListWidgets } from './data';
import { projectListModel, TeamModel } from './overview.model';
import { TeamService } from './overview.service';
import { NgbdTeamSortableHeader, SortEvent } from './overview-sortable.directive';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
  providers: [TeamService, DecimalPipe]
})

/**
 * Overview Component
 */
export class CompanyDetailsComponent implements OnInit {

  projectListWidgets!: projectListModel[];
  submitted = false;

  // Table data
  teamOverviewList$!: Observable<TeamModel[]>;
  total$: Observable<number>;

  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  @ViewChildren(NgbdTeamSortableHeader) headers!: QueryList<NgbdTeamSortableHeader>;

  constructor(private modalService: NgbModal,public service: TeamService) {
    this.teamOverviewList$ = service.countries$;
    this.total$ = service.total$;
  }

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
    this.projectListWidgets = projectListWidgets;
  }

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
   onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
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
      this.modalService.open(content, { size: 'md', centered: true });
    }

/**
   * Lunch modal
   * @param content modal content
   */
 LunchModal(content: any) {
  this.modalService.open(content);
}

/**
  /**
   * 
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
