import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Budget } from 'src/app/@models/budget';
import { Record } from 'src/app/@models/record';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, OnChanges {
  @Input()
  budget: Budget;

  @Input()
  allRecords: Record[];

  @Input()
  userCurrency: string;

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  title: string;
  used: number;
  ratio: number;
  localLimitPerDay: number;
  isOverlimit: boolean;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.title = this.budget.category.name;
    this.localLimitPerDay = this.budget.localAmount;
    this.used = this.calculateUsed();
    this.ratio = this.used / this.localLimitPerDay;
    this.isOverlimit = this.used >= this.localLimitPerDay;
  }

  calculateUsed() {
    const today = moment();
    return Math.abs(
      _.chain(this.allRecords)
        .filter(
          (record: Record) =>
            moment(record.timestamp).isSame(today, 'd') &&
            record.localAmount < 0 &&
            record.categoryId === this.budget.categoryId
        )
        .sumBy((record: Record) => record.localAmount)
        .value()
    );
  }

  onDelete() {
    this.delete.emit(this.budget.id);
  }
}
