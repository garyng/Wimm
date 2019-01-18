import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [LoginComponent, CallbackComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule
  ]
})
export class AuthModule { }
