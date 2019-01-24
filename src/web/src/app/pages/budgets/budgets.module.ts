import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetsComponent } from './budgets.component';
import { AddComponent } from './add/add.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ListComponent } from './list/list.component';
import { BudgetComponent } from './list/budget/budget.component';
import { NbBadgeModule } from '@nebular/theme';

@NgModule({
  declarations: [BudgetsComponent, AddComponent, ListComponent, BudgetComponent],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    ThemeModule,
    NbBadgeModule
  ]
})
export class BudgetsModule { }
