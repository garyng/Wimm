import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './@services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      },
      {
        path: 'app',
        canActivate: [AuthGuard],
        loadChildren: './pages/pages.module#PagesModule'
      },
      {
        path: '',
        loadChildren: './landing/landing.module#LandingModule'
      }
    ]
  }
];
// todo: not found component
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
