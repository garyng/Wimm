import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { LogoutComponent } from './logout/logout.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [LoginComponent, CallbackComponent, LogoutComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule
  ]
})
export class AuthModule { }
