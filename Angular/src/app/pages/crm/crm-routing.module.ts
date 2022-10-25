import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ContactsComponent } from "./contacts/contacts.component";
import { CompaniesComponent } from "./companies/companies.component";
import { DealsComponent } from "./deals/deals.component";
import { LeadsComponent } from "./leads/leads.component";
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { UsersComponent } from './users/users.component';
import { LeadProfileComponent } from './leads/lead-profile/lead-profile.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "contacts",
    component: ContactsComponent
  },
  {
    path: "companies",
    component: CompaniesComponent
  },
  {
    path: "deals",
    component: DealsComponent
  },
  {
    path: "leads",
    component: LeadsComponent
  },
  {
    path: "leadDetails",
    component: LeadDetailsComponent
  }
  ,
  {
    path: "profil",
    component: ProfilComponent
  },
  {
    path: "leads/leadDetails/:id",
    component: LeadProfileComponent
  }
  ,
  {
    path: "companyDetails",
    component: CompanyDetailsComponent
  },
  {
    path: "contactDetails",
    component: ContactDetailsComponent
  },
  {
    path: 'opportunities', loadChildren: () => import('./../crm/opportunities/opportunities.module').then(m => m.OpportunitiesModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CRMRoutingModule {}
