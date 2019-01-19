import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordsComponent } from './records.component';
import { AddComponent } from './add/add.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { ButtonGroupsComponent } from './button-groups/button-groups.component';
import { DatepickerComponent } from './datepicker/datepicker.component';

const routes: Routes = [{
  path: '',
  component: RecordsComponent,
  children: [
    {
      path: 'add',
      component: AddComponent
    },
    {
      path: 'input',
      component: FormInputsComponent
    },
    {
      path: 'button',
      component: ButtonGroupsComponent
    },
    {
      path: 'date',
      component: DatepickerComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
