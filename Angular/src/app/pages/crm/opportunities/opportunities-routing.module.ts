import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { KanbanComponent } from './kanban/kanban.component';
import { ListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
  {
    path: "kanban",
    component: KanbanComponent
  },
  {
    path: "liste",
    component: ListViewComponent
  },
  {
    path: "details",
    component: DetailsComponent
  },
  {
    path: "oppoflow/:id",
    component: KanbanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunitiesRoutingModule { }
