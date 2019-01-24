import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'records',
      loadChildren: './records/records.module#RecordsModule'
    },
    {
      path: 'recurrences',
      loadChildren: './recurrences/recurrences.module#RecurrencesModule'
    },
    {
      path: 'budgets',
      loadChildren: './budgets/budgets.module#BudgetsModule'
    },
    {
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
      path: 'profile',
      loadChildren: './profile/profile.module#ProfileModule'
    },
    {
      path: 'error',
      loadChildren: './error/error.module#ErrorModule'
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
