import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetsComponent } from './budgets.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{
  path: '',
  component: BudgetsComponent,
  children: [{
    path: 'add',
    component: AddComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetsRoutingModule { }
