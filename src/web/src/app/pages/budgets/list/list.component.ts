import { Component, OnInit } from '@angular/core';
import { BudgetsRepository, UserRepository, RecordsRepository } from 'src/app/@services/repository-base';
import { ErrorsHandler } from 'src/app/@services/errors-handler';
import { SwalService } from 'src/app/@services/swal.service';
import { SpinnerService } from 'src/app/@services/spinner.service';
import { ReplaySubject } from 'rxjs';
import { Budget } from 'src/app/@models/budget';
import { Record } from 'src/app/@models/record';
import { tap, flatMap } from 'rxjs/operators';
import { swalQuestion, swalWarning } from 'src/app/@common/swal-mixins';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  load$: ReplaySubject<{}> = new ReplaySubject();
  budgets: Budget[];
  records: Record[];
  userCurrency: string;

  constructor(
    private budgetsRepo: BudgetsRepository,
    private recordsRepo: RecordsRepository,
    private userRepo: UserRepository,
    private onError: ErrorsHandler,
    private swalService: SwalService,
    public spinner: SpinnerService
  ) {
    this.load$.pipe(
      tap(_ => {
        this.spinner.show();
        this.budgets = [];
      }),
      flatMap(_ => this.recordsRepo.getAll()),
      tap(records => this.records = records),
      flatMap(_ => this.userRepo.get()),
      tap(user => this.userCurrency = user.currency),
      flatMap(_ => this.budgetsRepo.getAll()),
      tap(budgets => this.budgets = budgets),
      tap(_ => this.spinner.hide())
    ).subscribe(_ => { }, error => this.onError.notify(error));

    this.load$.next();
  }

  ngOnInit() {
  }

  onDelete(id: number) {
    this.swalService.fire(swalWarning.mixin({
      title: 'Delete budget?',
    }),
      this.budgetsRepo.delete(id),
      _ => { }, _ => { },
      () => Swal.fire({
        title: 'Deleted',
        type: 'success'
      }).then(_ => this.load$.next()));
  }

}
