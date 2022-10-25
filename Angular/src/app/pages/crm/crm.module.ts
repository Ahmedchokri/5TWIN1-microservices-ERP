import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbTooltipModule, NgbDropdownModule, NgbAccordionModule,  NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Simple bar
import { SimplebarAngularModule } from 'simplebar-angular';

// Ng Select
import { NgSelectModule } from '@ng-select/ng-select';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// Component pages
import { CRMRoutingModule } from './crm-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ContactsComponent } from './contacts/contacts.component';
import { CompaniesComponent } from './companies/companies.component';
import { DealsComponent } from './deals/deals.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { UsersComponent } from './users/users.component';
import { AddLeadComponent } from './leads/add-lead/add-lead.component';
import { LeadProfileComponent } from './leads/lead-profile/lead-profile.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfilDetailsComponent } from './profil-details/profil-details.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [
    ContactsComponent,
    CompaniesComponent,
    DealsComponent,
    LeadsComponent,
    LeadDetailsComponent,
    CompanyDetailsComponent,
    ContactDetailsComponent,
    UsersComponent,
    AddLeadComponent,
    LeadProfileComponent,
    ProfilComponent,
    ProfilDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPaginationModule,
    NgbTypeaheadModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbAccordionModule,
    FlatpickrModule,
    NgSelectModule,
    CRMRoutingModule,
    SharedModule,
    SwiperModule,
    NgbNavModule,
    CKEditorModule,
    SimplebarAngularModule,
    OpportunitiesModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class CrmModule { }
