import { Component, Input } from '@angular/core';
import { UserRepository } from 'src/app/@services/repository-base';

@Component({
  selector: 'ngx-chart-panel-summary',
  styleUrls: ['./chart-panel-summary.component.scss'],
  template: `
    <div class="summary-container">
      <div class="summory" *ngFor="let item of summary">
        <div class="title">{{ item.title }}</div>
        <div class="value">{{ item.amount | currency:defaultCurrency }}</div>
      </div>
    </div>
  `,
})
export class ChartPanelSummaryComponent {
  @Input() summary: {title: string; amount: number}[];

  defaultCurrency: string;
  constructor(private userRepo: UserRepository) {
    userRepo.get().subscribe(user => this.defaultCurrency = user.currency);
  }
}

