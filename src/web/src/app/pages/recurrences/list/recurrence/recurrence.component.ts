import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Recurrence } from 'src/app/@models/recurrence';
import * as moment from 'moment';
import { Frequencies } from '../../add/add.component';

@Component({
  selector: 'app-recurrence',
  templateUrl: './recurrence.component.html',
  styleUrls: ['./recurrence.component.scss']
})
export class RecurrenceComponent implements OnInit, OnChanges {
  @Input()
  record: Recurrence;

  @Input()
  userCurrency: string;

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  update: EventEmitter<Recurrence> = new EventEmitter<Recurrence>();

  title: string;
  amount: number;
  currency: string;
  localAmount: number;
  nextTimestamp: number;
  description: string;
  percentage: number;
  frequency: string;
  isOutdated: boolean;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    const now = new Date().valueOf();
    this.title = this.record.category.name;
    this.amount = this.record.amount;
    this.currency = this.record.currency;
    this.localAmount = this.record.localAmount;
    this.nextTimestamp = this.record.nextTimestamp;
    this.description = this.record.description;
    this.frequency = this.record.frequency;
    const ratio = this.calculateRatio(
      now,
      this.nextTimestamp,
      Frequencies[this.frequency]
    );
    this.percentage = (1 - ratio) * 100;
    this.isOutdated = now > this.nextTimestamp;
  }

  calculateRatio(now: number, total: number, frequency: Frequencies) {
    switch (frequency) {
      case Frequencies.daily:
        return moment(total).diff(moment(now), 'h') / 24;
      case Frequencies.weekly:
        return moment(total).diff(moment(now), 'd') / 7;
      case Frequencies.monthly:
        return moment(total).diff(moment(now), 'w') / 4;
      case Frequencies.yearly:
        return moment(total).diff(moment(now), 'M') / 12;
    }
  }

  onDelete() {
    this.delete.emit(this.record.id);
  }

  onUpdate() {
    this.update.emit(this.record);
  }
}
