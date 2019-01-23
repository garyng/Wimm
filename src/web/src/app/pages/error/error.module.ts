import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    ThemeModule
  ]
})
export class ErrorModule { }
