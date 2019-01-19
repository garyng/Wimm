import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordsComponent } from './records.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: RecordsComponent,
  children: [
    {
      path: 'add',
      component: AddComponent
    },
    {
      path: 'list',
      component: ListComponent
    },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
