import { Component, OnInit, ViewChild } from '@angular/core';
import { tap, flatMap } from 'rxjs/operators';
import { RecordsRepository, UserRepository } from 'src/app/@services/repository-base';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SpinnerService } from 'src/app/@services/spinner.service';
import { ChartData, ChartComponent } from './chart/chart.component';
import { ReplaySubject } from 'rxjs';
import { Record } from 'src/app/@models/record';
import { ErrorsHandler } from 'src/app/@services/errors-handler';

export class ChartSummary {
  public title: string;
  public amount: number;
  public currency: string;
}

interface ChartTempType {
  amount: number;
  date: moment.Moment;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  balanceSummary: ChartSummary[];
  expensesSummary: ChartSummary[];

  weeklyBalance: ChartData;
  monthlyBalance: ChartData;
  yearlyBalance: ChartData;

  weeklyExpenses: ChartData;
  monthlyExpenses: ChartData;
  yearlyExpenses: ChartData;

  allRecords: Record[];
  expenses: Record[];

  @ViewChild('weeklyBalanceChart') weeklyBalanceChart: ChartComponent;
  @ViewChild('monthlyBalanceChart') monthlyBalanceChart: ChartComponent;
  @ViewChild('yearlyBalanceChart') yearlyBalanceChart: ChartComponent;

  @ViewChild('weeklyExpensesChart') weeklyExpensesChart: ChartComponent;
  @ViewChild('monthlyExpensesChart') monthlyExpensesChart: ChartComponent;
  @ViewChild('yearlyExpensesChart') yearlyExpensesChart: ChartComponent;

  load$: ReplaySubject<{}> = new ReplaySubject();

  constructor(private recordsRepo: RecordsRepository,
    private onError: ErrorsHandler,
    public spinner: SpinnerService,
    private userRepo: UserRepository) {

    this.load$
      .pipe(
        tap(__ => this.spinner.show()),
        flatMap(__ => this.recordsRepo.getAll()),
        tap(records => {
          this.allRecords = records;
          this.generateBalances(this.allRecords);

          // take those negative and inverse them
          this.expenses = _.chain(records)
            .filter((record: Record) => record.amount < 0)
            .map((record: Record) => ({
              ...record,
              amount: -record.amount,
              localAmount: -record.localAmount
            }))
            .value();
          this.generateExpenses(this.expenses);
        }),
        flatMap(__ => this.userRepo.get()),
        tap(user => {
          this.balanceSummary = this.generateBalanceSummary(this.allRecords, user.currency);
          this.expensesSummary = this.generateExpensesSummary(this.expenses, user.currency);
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

  generateExpenses(records: Record[]) {
    this.weeklyExpenses = this.aggregateRecords(records, 'w', 'd', 'DD MMM');
    this.monthlyExpenses = this.aggregateRecords(records, 'M', 'w', 'DD MMM');
    this.yearlyExpenses = this.aggregateRecords(records, 'y', 'M', 'DD MMM');
  }

  generateBalances(records: Record[]) {
    this.weeklyBalance = this.aggregateBalances(records, 'w', 'd', 'DD MMM');
    this.monthlyBalance = this.aggregateBalances(records, 'M', 'w', 'DD MMM');
    this.yearlyBalance = this.aggregateBalances(records, 'y', 'M', 'DD MMM');
  }

  // this calculate the accumulative amount at each unit time
  aggregateBalances(records: Record[], period: any, periodUnit: any, dateFormat: string): ChartData {
    const today = moment().endOf('d');

    const partition = _.chain(records)
      .groupBy(record => moment(record.timestamp).diff(today, period) === 0);

    const beforeThisPeriod = partition.get('false');
    const balanceBeforeThisPeriod: number = beforeThisPeriod
      .sumBy(record => record.localAmount)
      .value();

    const duringThisPeriod = partition.get('true');
    const dataDuringThisPeriod = duringThisPeriod
      .groupBy(record => moment(record.timestamp).get(periodUnit))
      .map(rs => <ChartTempType>{
        amount: _.sumBy(rs, r => r.localAmount),
        date: moment(rs[0].timestamp)
      });
    const thisPeriodStart = today.clone().subtract(1, period);

    let currentBalance = balanceBeforeThisPeriod;
    const data: ChartTempType[] = [];
    for (const date = thisPeriodStart; date.isSameOrBefore(today); date.add(1, periodUnit)) {
      const updatedAmount = _.chain(dataDuringThisPeriod)
        .find((d: ChartTempType) => d.date.isSame(date, periodUnit)).get('amount').value() || 0;
      currentBalance += updatedAmount;
      data.push({
        amount: currentBalance,
        date: date.clone()
      });
    }

    return {
      labels: data.map(d => d.date.format(dateFormat)),
      data: data.map(d => d.amount)
    };
  }

  // this calculate the total amount at each unit time
  aggregateRecords(records: Record[], period: any, periodUnit: any, dateFormat: string): ChartData {
    const today = moment().endOf('d');

    const thisPeriodRecords = _.chain(records)
      .groupBy(record => moment(record.timestamp).diff(today, period) === 0)
      .get('true');

    const thisPeriodData = thisPeriodRecords
      .groupBy(record => moment(record.timestamp).get(periodUnit))
      .map((r) => <ChartTempType>{
        amount: _.sumBy(r, record => record.localAmount),
        date: moment(r[0].timestamp)
      });

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

  generateBalanceSummary(records: Record[], currency: string): ChartSummary[] {
    const today = _.chain(records).sumBy(record => record.localAmount).value();
    return [
      {
        title: 'Total',
        amount: today,
        currency
      }
    ];
  }

  generateExpensesSummary(records: Record[], currency: string): ChartSummary[] {
    const today = this.aggregateTotals(records, 'd');
    const thisWeek = this.aggregateTotals(records, 'w');
    const thisMonth = this.aggregateTotals(records, 'M');
    const thisYear = this.aggregateTotals(records, 'y');

    return [
      {
        title: 'Today',
        amount: today,
        currency
      },
      {
        title: 'This Week',
        amount: thisWeek,
        currency
      },
      {
        title: 'This Month',
        amount: thisMonth,
        currency
      },
      {
        title: 'This Year',
        amount: thisYear,
        currency
      }
    ];
  }

  aggregateTotals(records: Record[], period: any): number {
    return _.chain(records)
      .filter(record => moment(record.timestamp).isSame(new Date(), period))
      .sumBy(record => record.localAmount)
      .value();
  }

  onBalanceTabChanged(selectedTab) {
    switch (selectedTab.tabTitle) {
      case 'Weekly':
        this.weeklyBalanceChart.resizeChart();
        break;
      case 'Monthly':
        this.monthlyBalanceChart.resizeChart();
        break;
      case 'Yearly':
        this.yearlyBalanceChart.resizeChart();
        break;
    }
  }

  onExpensesTabChanged(selectedTab) {
    switch (selectedTab.tabTitle) {
      case 'Weekly':
        this.weeklyExpensesChart.resizeChart();
        break;
      case 'Monthly':
        this.monthlyExpensesChart.resizeChart();
        break;
      case 'Yearly':
        this.yearlyExpensesChart.resizeChart();
        break;
    }
  }

  resizeCharts() {
    this.weeklyBalanceChart.resizeChart();
    this.monthlyBalanceChart.resizeChart();
    this.yearlyBalanceChart.resizeChart();
    this.weeklyExpensesChart.resizeChart();
    this.monthlyExpensesChart.resizeChart();
    this.yearlyExpensesChart.resizeChart();
  }

  ngOnInit() {
  }

}
