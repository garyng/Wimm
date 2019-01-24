import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetsComponent } from './budgets.component';
import { AddComponent } from './add/add.component';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [BudgetsComponent, AddComponent],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    ThemeModule
  ]
})
export class BudgetsModule { }
