import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile, tap, flatMap } from 'rxjs/operators';
import { OrdersProfitChartService } from './orders-profit-chart.service';
import { OrdersChart } from './orders-chart.service';
import { ProfitChart } from './profit-chart.service';
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
export class DashboardComponent implements OnInit, OnDestroy {

  private alive = true;

  chartSummary: ChartSummary[];

  weeklyExpenses: ChartData;
  monthlyExpenses: ChartData;
  yearlyExpenses: ChartData;

  // todo: remove
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  // @ViewChild('ordersChart') ordersChart: OrdersChartComponent;
  // @ViewChild('profitChart') profitChart: ProfitChartComponent;

  @ViewChild('weeklyChart') weeklyChart: ChartComponent;
  @ViewChild('monthlyChart') monthlyChart: ChartComponent;
  @ViewChild('yearlyChart') yearlyChart: ChartComponent;

  loadChart$: ReplaySubject<{}> = new ReplaySubject();

  constructor(private ordersProfitChartService: OrdersProfitChartService,
    private onError: ErrorsHandler,
    private recordsRepo: RecordsRepository,
    public spinner: SpinnerService) {

    // todo: remove
    this.ordersProfitChartService.getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        // this.chartPanelSummary = summary;
      });

    // this.getOrdersChartData(this.period);
    // this.getProfitChartData(this.period);

    this.loadChart$
      .pipe(
        tap(_ => this.spinner.show()),
        flatMap(_ => this.recordsRepo.getAll()),
        tap(records => {
          this.weeklyExpenses = this.aggregateRecords(records, 'w', 'd', 'DD MMM');
          this.monthlyExpenses = this.aggregateRecords(records, 'M', 'w', 'DD MMM');
          this.yearlyExpenses = this.aggregateRecords(records, 'y', 'M', 'DD MMM');
        })
      )
      .subscribe(
        _ => {
          this.spinner.hide();
        },
        error => {
          this.onError.notify(error);
          this.spinner.hide();
        }
      );

      this.loadChart$.next();
  }

  onRefresh() {
    this.loadChart$.next();
    this.recordsRepo.getAll().subscribe(records => {
      // const todayTotal = _.chain(records)
      //   .filter(record => moment(record.timestamp).isSame(new Date(), 'day'))
      //   .sumBy(record => record.localAmount)
      //   .value();

      // const thisWeekTotal = _.chain(records)
      //   .filter(record => moment(record.timestamp).isSame(new Date(), 'week'))
      //   .sumBy(record => record.localAmount)
      //   .value();

      // const thisMonthTotal = _.chain(records)
      //   .filter(record => moment(record.timestamp).isSame(new Date(), 'month'))
      //   .sumBy(record => record.localAmount)
      //   .value();
      // // todo: calculate expenses
      // // todo: resize chart after loading data
      // this.chartSummary = [
      //   {
      //     title: 'Today',
      //     amount: todayTotal
      //   },
      //   {
      //     title: 'This Week',
      //     amount: thisWeekTotal
      //   },
      //   {
      //     title: 'This Month',
      //     amount: thisMonthTotal
      //   }
      // ];

      // calculating balances
    });
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
      .map((r, k) => <ChartTempType>{
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


  // todo: change period
  // setPeriodAndGetChartData(value: string): void {
  //   if (this.period !== value) {
  //     this.period = value;
  //   }

  //   this.getOrdersChartData(value);
  //   this.getProfitChartData(value);
  // }

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

  getOrdersChartData(period: string) {
    this.ordersProfitChartService.getOrdersChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(ordersChartData => {
        this.ordersChartData = ordersChartData;
      });
  }

  getProfitChartData(period: string) {
    this.ordersProfitChartService.getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(profitChartData => {
        this.profitChartData = profitChartData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit() {
  }

}
