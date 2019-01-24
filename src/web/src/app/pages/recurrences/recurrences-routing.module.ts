import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecurrencesComponent } from './recurrences.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: RecurrencesComponent,
  children: [{
    path: 'add',
    component: AddComponent
  }, {
    path: 'list',
    component: ListComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurrencesRoutingModule { }
