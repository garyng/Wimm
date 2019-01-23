import { Component, Input } from '@angular/core';
import { UserRepository } from 'src/app/@services/repository-base';
import { ChartSummary } from '../dashboard.component';

@Component({
  selector: 'ngx-chart-panel-summary',
  styleUrls: ['./chart-panel-summary.component.scss'],
  template: `
    <div class="summary-container">
      <div class="summory" *ngFor="let item of summary">
        <div class="title">{{ item.title }}</div>
        <div class="value">{{ item.amount | currency:item.currency }}</div>
      </div>
    </div>
  `,
})
export class ChartPanelSummaryComponent {
  @Input() summary: ChartSummary[];

  constructor() {
  }
}

