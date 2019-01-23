import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records.component';
import { AddComponent } from './add/add.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbCardModule, NbDatepickerModule } from '@nebular/theme';
import { ListComponent } from './list/list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [RecordsComponent, AddComponent, ListComponent],
  entryComponents: [AddComponent],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    ThemeModule,
    Ng2SmartTableModule
  ]
})
export class RecordsModule { }
