import { Component, OnInit } from '@angular/core';
import { RecordTypes } from '../../records/add/add.component';
import { Currency } from 'src/app/@models/currency';
import { Category } from 'src/app/@models/category';
import { ReplaySubject } from 'rxjs';
import { NbDateService } from '@nebular/theme';
import { CurrenciesRepository, CategoriesRepository, UserRepository, RecurrencesRepository } from 'src/app/@services/repository-base';
import { ErrorsHandler } from 'src/app/@services/errors-handler';
import { SpinnerService } from 'src/app/@services/spinner.service';
import { SwalService } from 'src/app/@services/swal.service';
import { tap, flatMap } from 'rxjs/operators';
import { swalQuestion, swalAdded } from 'src/app/@common/swal-mixins';
import { Recurrence } from 'src/app/@models/recurrence';
import * as moment from 'moment';

export enum Frequencies {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly'
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  frequency: keyof typeof Frequencies;
  frequencies = Frequencies;

  recordType: keyof typeof RecordTypes = 'expense';
  recordTypes = RecordTypes;

  currencies: Currency[];
  selectedCurrency: string;
  defaultCurrency: string;

  categories: Category[];
  selectedCategory: Category;

  selectedDate: Date;
  description = '';
  amount = 0;

  load$: ReplaySubject<{}> = new ReplaySubject();

  constructor(
    private dateService: NbDateService<Date>,
    private currenciesRepo: CurrenciesRepository,
    private categoriesRepo: CategoriesRepository,
    private userRepo: UserRepository,
    private recurrencesRepo: RecurrencesRepository,
    private onError: ErrorsHandler,
    public spinner: SpinnerService,
    private swalService: SwalService
  ) {
    this.reset();
    this.load$
      .pipe(
        tap(_ => this.spinner.show()),
        flatMap(_ => this.userRepo.get()),
        tap(user => {
          this.defaultCurrency = user.currency;
          this.selectedCurrency = user.currency;
        }),
        flatMap(_ => this.currenciesRepo.getAll()),
        tap(currencies => (this.currencies = currencies)),
        flatMap(_ => this.categoriesRepo.getAll()),
        tap(categories => {
          this.categories = categories;
          this.selectedCategory = categories[0];
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

    this.load$.next();
  }

  ngOnInit() {
  }

  onAdd() {
    let normalizedAmount = Math.abs(this.amount);
    if (this.recordType === RecordTypes.expense) {
      normalizedAmount *= -1;
    }
    const nextTimestamp = this.calculateNextTimestamp(this.selectedDate.valueOf(), Frequencies[this.frequency]);
    const recurrence = Recurrence.create({
      amount: normalizedAmount,
      description: this.description,
      currency: this.selectedCurrency,
      categoryId: this.selectedCategory && this.selectedCategory.id,
      nextTimestamp: nextTimestamp,
      frequency: Frequencies[this.frequency],
      id: 0,
      category: null,
      userId: 0,
      createdAt: null,
      updatedAt: null,
      localAmount: 0
    });
    this.swalService.fire(
      swalQuestion.mixin({
        text: 'Add a new recurring record?'
      }),
      this.recurrencesRepo.add(recurrence),
      _ => this.reset(),
      _ => { },
      () => swalAdded.fire({})
    );
  }

  calculateNextTimestamp(startingTimestamp: number, frequency: Frequencies): number {
    let unit: any;
    switch (frequency) {
      case Frequencies.daily:
        unit = 'd';
        break;
      case Frequencies.weekly:
        unit = 'w';
        break;
      case Frequencies.monthly:
        unit = 'M';
        break;
      case Frequencies.yearly:
        unit = 'y';
        break;
    }
    return moment(startingTimestamp).add(1, unit).valueOf();
  }

  reset() {
    this.amount = 0;
    this.description = '';
    this.selectedDate = this.dateService.today();
    this.recordType = RecordTypes.expense;
    this.frequency = Frequencies.monthly;
  }

}
