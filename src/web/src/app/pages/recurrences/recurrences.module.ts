import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurrencesRoutingModule } from './recurrences-routing.module';
import { RecurrencesComponent } from './recurrences.component';
import { AddComponent } from './add/add.component';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [RecurrencesComponent, AddComponent],
  imports: [
    CommonModule,
    RecurrencesRoutingModule,
    ThemeModule
  ]
})
export class RecurrencesModule { }
