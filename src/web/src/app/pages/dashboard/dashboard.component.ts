import { Component, OnInit, ViewChild } from '@angular/core';
import { tap, flatMap } from 'rxjs/operators';
import { RecordsRepository } from 'src/app/@services/repository-base';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SpinnerService } from 'src/app/@services/spinner.service';
import { ChartData, ChartComponent } from './chart/chart.component';
import { ReplaySubject } from 'rxjs';
import { Record } from 'src/app/@models/Record';
import { ErrorsHandler } from 'src/app/@services/errors-handler';

export class ChartSummary {
  public title: string;
  public amount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartSummary: ChartSummary[];

  weeklyExpenses: ChartData;
  monthlyExpenses: ChartData;
  yearlyExpenses: ChartData;

  @ViewChild('weeklyChart') weeklyChart: ChartComponent;
  @ViewChild('monthlyChart') monthlyChart: ChartComponent;
  @ViewChild('yearlyChart') yearlyChart: ChartComponent;

  load$: ReplaySubject<{}> = new ReplaySubject();

  constructor(private recordsRepo: RecordsRepository,
    private onError: ErrorsHandler,
    public spinner: SpinnerService) {

    this.load$
      .pipe(
        tap(__ => this.spinner.show()),
        flatMap(__ => this.recordsRepo.getAll()),
        tap(records => {
          this.weeklyExpenses = this.aggregateRecords(records, 'w', 'd', 'DD MMM');
          this.monthlyExpenses = this.aggregateRecords(records, 'M', 'w', 'DD MMM');
          this.yearlyExpenses = this.aggregateRecords(records, 'y', 'M', 'DD MMM');
          this.generateSummary(records);
        }),
        tap(__ => this.spinner.hide())
      )
      .subscribe(__ => {
        this.resizeCharts();
       }, error => {
        this.onError.notify(error);
      });

    this.load$.next();
  }

  onRefresh() {
    this.load$.next();
  }

  aggregateRecords(records: Record[], period: any, periodUnit: any, dateFormat: string): ChartData {
    const thisPeriodRecords = _.chain(records)
      .groupBy(record => moment(record.timestamp).diff(today, period) === 0)
      .get('true');
    interface ChartTempType {
      amount: number;
      date: moment.Moment;
    }

    const thisPeriodData = thisPeriodRecords
      .groupBy(record => moment(record.timestamp).get(periodUnit))
      .map((r) => <ChartTempType>{
        amount: _.sumBy(r, record => record.localAmount),
        date: moment(r[0].timestamp)
      });

    const today = moment().endOf('d');
    const lastPeriod = today.clone().subtract(1, period);
    const data: ChartTempType[] = [];
    for (const date = lastPeriod; date.isSameOrBefore(today); date.add(1, periodUnit)) {
      const updatedAmount = _.chain(thisPeriodData)
        .find((d: ChartTempType) => d.date.isSame(date, periodUnit)).get('amount').value() || 0;
      data.push({
        amount: updatedAmount,
        date: date.clone()
      });
    }
    return {
      labels: data.map(d => d.date.format(dateFormat)),
      data: data.map(d => d.amount)
    };
  }

  generateSummary(records: Record[]) {
    const today = this.aggregateTotals(records, 'd');
    const thisWeek = this.aggregateTotals(records, 'w');
    const thisMonth = this.aggregateTotals(records, 'M');
    const thisYear = this.aggregateTotals(records, 'y');

    this.chartSummary = [
      {
        title: 'Today',
        amount: today
      },
      {
        title: 'This Week',
        amount: thisWeek
      },
      {
        title: 'This Month',
        amount: thisMonth
      },
      {
        title: 'This Year',
        amount: thisYear
      }
    ];
  }

  aggregateTotals(records: Record[], period: any): number {
    return _.chain(records)
      .filter(record => moment(record.timestamp).isSame(new Date(), period))
      .sumBy(record => record.localAmount)
      .value();
  }

  onTabChanged(selectedTab) {
    switch (selectedTab.tabTitle) {
      case 'Weekly':
        this.weeklyChart.resizeChart();
        break;
      case 'Monthly':
        this.monthlyChart.resizeChart();
        break;
      case 'Yearly':
        this.yearlyChart.resizeChart();
        break;
    }
  }

  resizeCharts() {
    this.weeklyChart.resizeChart();
    this.monthlyChart.resizeChart();
    this.yearlyChart.resizeChart();
  }

  ngOnInit() {
  }

}
