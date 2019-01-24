import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/@models/currency';
import { Category } from 'src/app/@models/category';
import { ReplaySubject } from 'rxjs';
import { SpinnerService } from 'src/app/@services/spinner.service';
import {
  CurrenciesRepository,
  UserRepository,
  CategoriesRepository,
  BudgetsRepository
} from 'src/app/@services/repository-base';
import { tap, flatMap } from 'rxjs/operators';
import { ErrorsHandler } from 'src/app/@services/errors-handler';
import { Budget } from 'src/app/@models/budget';
import { SwalService } from 'src/app/@services/swal.service';
import { swalQuestion, swalAdded } from 'src/app/@common/swal-mixins';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  currencies: Currency[];
  selectedCurrency: string;
  defaultCurrency: string;

  categories: Category[];
  selectedCategory: Category;

  selectedDate: Date;
  description = '';
  limitPerDay = 0;

  load$: ReplaySubject<{}> = new ReplaySubject();

  constructor(
    public spinner: SpinnerService,
    private currenciesRepo: CurrenciesRepository,
    private budgetsRepo: BudgetsRepository,
    private categoriesRepo: CategoriesRepository,
    private userRepo: UserRepository,
    private onError: ErrorsHandler,
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

  ngOnInit() { }

  onAdd() {
    const budget = Budget.create({
      categoryId: this.selectedCategory && this.selectedCategory.id,
      limitPerDay: this.limitPerDay,
      currency: this.selectedCurrency,
      userId: 0,
      user: null,
      category: null,
      localAmount: 0,
      createdAt: null,
      updatedAt: null
    });

    this.swalService.fire(swalQuestion.mixin({
      text: 'Set a new daily budget?'
    }),
      this.budgetsRepo.add(budget),
      _ => this.reset(),
      _ => { },
      () => swalAdded.fire({}));
  }

  reset() {
    this.limitPerDay = 0;
    this.description = '';
  }
}
