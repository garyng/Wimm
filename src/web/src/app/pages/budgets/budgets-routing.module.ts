import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetsComponent } from './budgets.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: BudgetsComponent,
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
export class BudgetsRoutingModule { }
