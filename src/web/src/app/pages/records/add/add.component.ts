import { Component, OnInit } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { CurrenciesRepository, UserRepository, CategoriesRepository, RecordsRepository } from 'src/app/@services/repository-base';
import { tap, flatMap } from 'rxjs/operators';
import { Currency } from 'src/app/@models/currency';
import { Category } from 'src/app/@models/category';
import { ReplaySubject } from 'rxjs';
import { ErrorsHandler } from 'src/app/@services/errors-handler';
import { SpinnerService } from 'src/app/@services/spinner.service';
import { Record } from 'src/app/@models/record';
import { swalQuestion, swalAdded } from 'src/app/@common/swal-mixins';
import { SwalService } from 'src/app/@services/swal.service';

enum RecordTypes {
  expense = 'expense',
  income = 'income'
}


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
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
    private recordsRepo: RecordsRepository,
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

  ngOnInit() {}

  onAdd() {
    let normalizedAmount = Math.abs(this.amount);
    if (this.recordType === RecordTypes.expense) {
      normalizedAmount *= -1;
    }
    const record = Record.create({
      amount: normalizedAmount,
      description: this.description,
      currency: this.selectedCurrency,
      categoryId: this.selectedCategory && this.selectedCategory.id,
      timestamp: this.selectedDate.valueOf(), // milliseconds
      id: 0,
      category: null,
      userId: 0,
      createdAt: null,
      updatedAt: null,
      localAmount: 0
    });
    this.swalService.fire(
      swalQuestion.mixin({
        text: 'Add a new record?'
      }),
      this.recordsRepo.add(record),
      _ => this.reset(),
      _ => { },
      () => swalAdded.fire({})
    );
  }

  reset() {
    this.amount = 0;
    this.description = '';
    this.selectedDate = this.dateService.today();
    this.recordType = RecordTypes.expense;
  }
}
