import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecurrencesComponent } from './recurrences.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{
  path: '',
  component: RecurrencesComponent,
  children: [{
    path: 'add',
    component: AddComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurrencesRoutingModule { }
