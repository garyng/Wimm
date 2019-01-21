import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { OrdersProfitChartService } from './orders-profit-chart.service';
import { OrdersChart } from './orders-chart.service';
import { ProfitChart } from './profit-chart.service';
import { RecordsRepository } from 'src/app/@services/repository-base';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SpinnerService } from 'src/app/@services/spinner.service';
import { ChartData } from './chart/chart.component';

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
  expensesChartData: ChartData;

  period = 'week';

  // todo: remove
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  // todo: remove
  // @ViewChild('ordersChart') ordersChart: OrdersChartComponent;
  // @ViewChild('profitChart') profitChart: ProfitChartComponent;

  constructor(private ordersProfitChartService: OrdersProfitChartService,
    private recordsRepo: RecordsRepository,
    public spinner: SpinnerService) {

    // todo: remove
    this.ordersProfitChartService.getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        // this.chartPanelSummary = summary;
      });

    this.getOrdersChartData(this.period);
    this.getProfitChartData(this.period);
  }

  onRefresh() {
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
      const thisWeekRecords = _.chain(records)
      .groupBy(record => moment(record.timestamp).diff(today, 'w') === 0)
      .get('true');


      interface ChartTempType {
        amount: number;
        date: moment.Moment;
      }

      const thisWeekData = thisWeekRecords
      .groupBy(record => moment(record.timestamp).dayOfYear())
      .map((r, k) => <ChartTempType>{
        amount: _.sumBy(r, record => record.localAmount),
        date: moment(r[0].timestamp) // .format('DD/MM')
      });

      // or just path the empty object with the new one?

      const today = moment().endOf('d');
      const lastWeek = today.clone().subtract(1, 'w');
      const data: ChartTempType[] = [];
      for (const day = lastWeek; day.isBefore(today); day.add(1, 'd')) {
        const updatedAmount = _.chain(thisWeekData).find((d: ChartTempType) => d.date.isSame(day, 'd')).get('amount').value() || 0;
        data.push({
          amount: updatedAmount,
          date: day.clone()
        });
      }

      // ({
      //   amount: _.sumBy(r, record => record.localAmount),
      //   date: moment(r[0].timestamp).format('DD/MM')
      // })
      // .map((r, k) => [
      //   moment(r[0].timestamp).format('DD/MM'),
      //   _.sumBy(r, record => record.localAmount),
      // ])
      // const data = new Map<string, number>(thisWeekData.value());



      // todo: still need to fill in the missing dates

      this.expensesChartData = {
        labels: data.map(d => d.date.format('DD/MM')),
        data: data.map(d => d.amount)
      };
    });
  }


  // todo: change period
  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getProfitChartData(value);
  }

  // changeTab(selectedTab) {
  //   if (selectedTab.tabTitle === 'Profit') {
  //     this.profitChart.resizeChart();
  //   } else {
  //     this.ordersChart.resizeChart();
  //   }
  // }

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
