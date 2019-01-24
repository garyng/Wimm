import { Component, OnInit } from '@angular/core';
import { RecurrencesRepository, UserRepository, RecordsRepository } from 'src/app/@services/repository-base';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { ErrorsHandler } from 'src/app/@services/errors-handler';
import { tap, flatMap } from 'rxjs/operators';
import { Recurrence } from 'src/app/@models/recurrence';
import { SpinnerService } from 'src/app/@services/spinner.service';
import { SwalService } from 'src/app/@services/swal.service';
import { swalQuestion, swalDeleted, swalWarning } from 'src/app/@common/swal-mixins';
import * as moment from 'moment';
import { Frequencies } from '../add/add.component';
import Swal from 'sweetalert2';
import { Record } from 'src/app/@models/record';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  load$: ReplaySubject<{}> = new ReplaySubject();
  recurrences: Recurrence[];
  userCurrency: string;

  constructor(private recurrencesRepo: RecurrencesRepository,
    private recordsRepo: RecordsRepository,
    private userRepo: UserRepository,
    private onError: ErrorsHandler,
    private swalService: SwalService,
    public spinner: SpinnerService) {
    this.load$.pipe(
      tap(_ => {
        this.spinner.show();
        this.recurrences = [];
      }),
      flatMap(_ => this.userRepo.get()),
      tap(user => this.userCurrency = user.currency),
      flatMap(_ => this.recurrencesRepo.getAll()),
      tap(recurrences => this.recurrences = recurrences),
      tap(_ => this.spinner.hide())
    ).subscribe(_ => { }, error => this.onError.notify(error));

    this.load$.next();
  }

  ngOnInit() {
  }

  onDelete(id: number) {
    this.swalService.fire(swalWarning.mixin({
      title: 'Are you sure?',
      text: 'This action is not reversible!'
    }),
      this.recurrencesRepo.delete(id),
      _ => { }, _ => { },
      () => swalDeleted.fire({}).then(_ => this.load$.next()));
  }

  onUpdate(record: Recurrence) {
    const newNext = moment(record.nextTimestamp).add(1, this.getUnit(Frequencies[record.frequency]));
    record.nextTimestamp = newNext.valueOf();

    const newRecord = Record.create({
      amount: record.amount,
      description: record.description,
      currency: record.currency,
      categoryId: record.categoryId,
      timestamp: new Date().valueOf(),
      id: 0,
      category: null,
      userId: 0,
      createdAt: null,
      updatedAt: null,
      localAmount: 0
    });


    this.swalService.fire(swalQuestion.mixin({
      title: 'Update due date?',
    }),
      this.recurrencesRepo.update(record.id, record).pipe(
        flatMap(_ => this.recordsRepo.add(newRecord))
      ),
      _ => { }, _ => { },
      () => Swal.fire({
        title: 'Due date updated!',
        type: 'success'
      }).then(_ => this.load$.next()));
  }

  getUnit(frequency: Frequencies) {
    switch (frequency) {
      case Frequencies.daily:
        return 'd';
      case Frequencies.weekly:
        return 'w';
      case Frequencies.monthly:
        return 'M';
      case Frequencies.yearly:
        return 'y';
    }
  }
}
