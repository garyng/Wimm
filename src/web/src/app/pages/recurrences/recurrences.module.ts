import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';

import { RecurrencesRoutingModule } from './recurrences-routing.module';
import { RecurrencesComponent } from './recurrences.component';
import { AddComponent } from './add/add.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ListComponent } from './list/list.component';
import { RecurrenceComponent } from './list/recurrence/recurrence.component';
import { NbBadgeModule } from '@nebular/theme';

@NgModule({
  declarations: [RecurrencesComponent, AddComponent, ListComponent, RecurrenceComponent],
  imports: [
    CommonModule,
    RecurrencesRoutingModule,
    ThemeModule,
    MomentModule,
    NbBadgeModule
  ]
})
export class RecurrencesModule { }
