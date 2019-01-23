import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartPanelSummaryComponent } from './chart-panel-summary/chart-panel-summary.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ChartPanelSummaryComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule,
    NgxChartsModule,
    ThemeModule
  ]
})
export class DashboardModule { }
