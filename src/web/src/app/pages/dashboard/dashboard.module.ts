import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OrdersChartComponent } from './charts/orders-chart.component';
import { ChartPanelSummaryComponent } from './chart-panel-summary/chart-panel-summary.component';
import { ChartPanelHeaderComponent } from './chart-panel-header/chart-panel-header.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ECommerceLegendChartComponent } from './legend-chart/legend-chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfitChartComponent,
    OrdersChartComponent,
    ChartPanelSummaryComponent,
    ChartPanelHeaderComponent,
    ECommerceLegendChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule,
    NgxChartsModule,
    ThemeModule]
})
export class DashboardModule { }
