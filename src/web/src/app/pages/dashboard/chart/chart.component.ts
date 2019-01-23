import { Component, AfterViewInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from 'src/app/@services/layout.service';
import { takeWhile, delay } from 'rxjs/operators';

export class ChartData {
  public labels: string[];
  public data: number[];
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  @Input()
  chartData: ChartData;

  private alive = true;

  echartsIntance: any;
  option: any;

  ngOnChanges(): void {
    if (this.option) {
      this.updateChartData();
    }
  }

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngAfterViewInit(): void {
    this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {
        const eTheme: any = config.variables.orders;
        this.setChartOptions(eTheme);
        this.updateChartData();
      });
  }

  setChartOptions(chartTheme) {
    this.option = {
      grid: {
        left: 50,
        top: 20,
        right: 40,
        bottom: 40,
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: chartTheme.tooltipLineColor,
            width: chartTheme.tooltipLineWidth,
          },
        },
        textStyle: {
          color: chartTheme.tooltipTextColor,
          fontSize: chartTheme.tooltipFontSize,
          fontWeight: chartTheme.tooltipFontWeight,
        },
        position: 'top',
        backgroundColor: chartTheme.tooltipBg,
        borderColor: chartTheme.tooltipBorderColor,
        borderWidth: 3,
        formatter: (params) => {
          return Math.round(parseInt(params.value, 10));
        },
        extraCssText: chartTheme.tooltipExtraCss,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        offset: 5,
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: chartTheme.axisTextColor,
          fontSize: chartTheme.axisFontSize,
        },
        axisLine: {
          lineStyle: {
            color: chartTheme.axisLineColor,
            width: '2',
          },
        },
        data: [],
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: chartTheme.axisLineColor,
            width: '1',
          },
        },
        axisLabel: {
          color: chartTheme.axisTextColor,
          fontSize: chartTheme.axisFontSize,
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: chartTheme.yAxisSplitLine,
            width: '1',
          },
        },
      },
      series: [{
        type: 'line',
        smooth: true,
        symbolSize: 20,
        itemStyle: {
          normal: {
            opacity: 0,
          },
          emphasis: {
            color: '#ffffff',
            borderColor: chartTheme.itemBorderColor,
            borderWidth: 2,
            opacity: 1,
          },
        },
        lineStyle: {
          normal: {
            width: chartTheme.lineWidth,
            type: chartTheme.lineStyle,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: chartTheme.secondLineGradFrom,
            }, {
              offset: 1,
              color: chartTheme.secondLineGradTo,
            }]),
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: chartTheme.secondAreaGradFrom,
            }, {
              offset: 1,
              color: chartTheme.secondAreaGradTo,
            }]),
          },
        },
        data: []
      }],
    };
  }

  updateChartData() {
    const option = this.option;
    this.option = {
      ...option,
      xAxis: {
        ...option.xAxis,
        data: this.chartData.labels
      },
      // using one series only
      series: [{
        ...option.series[0],
        data: this.chartData.data
      }],
    };
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      // Fix recalculation chart size
      // TODO: investigate more deeply
      setTimeout(() => {
        this.echartsIntance.resize();
      }, 0);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
