import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule, NgbNavModule, NgbTooltipModule, NgbProgressbarModule, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Simple bar
import { SimplebarAngularModule } from 'simplebar-angular';
//  Drag and drop
import { DndModule } from 'ngx-drag-drop';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// Counter
import { CountToModule } from 'angular-count-to';

// Sorting page
import { NgbdListViewSortableHeader } from './list-view/list-view-sortable.directive';

// Load Icons
import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';

import { SharedModule } from '../../../shared/shared.module';


import { OpportunitiesRoutingModule } from './opportunities-routing.module';
import { ListViewComponent } from './list-view/list-view.component';
import { KanbanComponent } from './kanban/kanban.component';
import { DetailsComponent } from './details/details.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ListViewComponent,
    KanbanComponent,
    DetailsComponent,
    NgbdListViewSortableHeader
  ],
  imports: [
    CommonModule,
    OpportunitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    SimplebarAngularModule,
    DndModule,
    FlatpickrModule,
    CountToModule,
    SharedModule,
    ReactiveFormsModule     ,
    NgSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OpportunitiesModule { 
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
