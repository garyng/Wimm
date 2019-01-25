import { Component, OnInit } from '@angular/core';
import { RecordsRepository, UserRepository } from 'src/app/@services/repository-base';
import { ErrorsHandler } from 'src/app/@services/errors-handler';
import { Record } from 'src/app/@models/record';
import { ReplaySubject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { tap, flatMap } from 'rxjs/operators';
import { Category } from 'src/app/@models/category';
import { swalWarning, swalDeleted } from 'src/app/@common/swal-mixins';
import { SpinnerService } from 'src/app/@services/spinner.service';
import { SwalService } from 'src/app/@services/swal.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  load$: ReplaySubject<{}> = new ReplaySubject();
  allRecords: LocalDataSource = new LocalDataSource();
  userCurrency: string;

  tableSettings = {
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>'
    },
    // todo: edit record?
    actions: {
      add: false,
      edit: false
    },
    // custom: [{
    //   name: 'delete',
    //   title: '<i class="nb-trash"></i>'
    // }]
    columns: {
      category: {
        title: 'Category',
        valuePrepareFunction: (cell: Category, row: Record) => {
          return cell.name;
        },
        compareFunction: (direction: number, a: Category, b: Category) => {
          if (a.id < b.id) {
            return -1 * direction;
          } if (a.id > b.id) {
            return direction;
          }
          return 0;
        },
      },
      amount: {
        title: 'Amount',
        valuePrepareFunction: (cell: number, row: Record) => {
          return `${row.currency} ${cell.toFixed(2)}`;
        }
      },
      localAmount: {
        title: 'Local amount',
        valuePrepareFunction: (cell: number, row: Record) => {
          return `${this.userCurrency} ${cell.toFixed(2)}`;
        }
      },
      description: {
        title: 'Description'
      },
      timestamp: {
        title: 'Date',
        valuePrepareFunction: (cell: number, row: Record) => {
          return moment(cell).format('LL');
        },
        filterFunction: (cell: number, search: string) => {
          return moment(cell).format('LL').toLowerCase().includes(search.toLowerCase());
        }
      }
    }
  };

  constructor(private recordsRepo: RecordsRepository,
    private userRepo: UserRepository,
    private onError: ErrorsHandler,
    public spinner: SpinnerService,
    private swalService: SwalService) {
    this.load$
      .pipe(
        tap(_ => this.spinner.show()),
        flatMap(_ => this.userRepo.get()),
        tap(profile => this.userCurrency = profile.currency),
        tap(_ => this.allRecords.empty),
        flatMap(_ => this.recordsRepo.getAll()),
        tap(records => this.allRecords.load(records))
      ).subscribe(_ => {
        this.spinner.hide();
      }, error => {
        this.onError.notify(error);
        this.spinner.hide();
      });

    this.load$.next();
  }

  ngOnInit() { }

  onRefresh() {
    this.load$.next();
  }

  onDelete(event) {
    const data: Record = event.data;
    this.swalService.fire(
      swalWarning.mixin({
        text: `Delete record #${data.id}?`
      }),
      this.recordsRepo.delete(data.id),
      _ => { },
      _ => { },
      () => swalDeleted.fire({}).then(value => this.load$.next()));
  }
}
