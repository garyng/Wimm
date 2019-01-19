import { Component, OnInit } from '@angular/core';
import { RecordsRepository } from 'src/app/@services/repository-base';
import { ErrorsHandler } from 'src/app/@services/errors-handler';
import { Record } from 'src/app/@models/record';
import { ReplaySubject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { tap, flatMap } from 'rxjs/operators';
import { Category } from 'src/app/@models/category';
import Swal from 'sweetalert2';
import { swalDelete, swalDeleted } from 'src/app/@common/swal-mixins';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  getAllRecords$: ReplaySubject<Record[]> = new ReplaySubject();
  allRecords: LocalDataSource = new LocalDataSource();

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
      id: {
        title: '#'
      },
      description: {
        title: 'Description'
      },
      amount: {
        title: 'Amount',
        valuePrepareFunction: (cell: number, row: Record) => {
          return `${row.currency} ${cell.toFixed(2)}`;
        }
      },
      category: {
        title: 'Category',
        valuePrepareFunction: (cell: Category, row: Record) => {
          return cell.name;
        }
      }
    }
  };

  constructor(private recordsRepo: RecordsRepository, private onError: ErrorsHandler) {
    this.getAllRecords$
      .pipe(
        tap(_ => this.allRecords.empty),
        flatMap(_ => this.recordsRepo.getAll())
      )
      .subscribe(records => this.allRecords.load(records),
        error => this.onError.notify(error));
    this.getAllRecords$.next();
  }

  ngOnInit() { }

  onRefresh() {
    this.getAllRecords$.next();
  }

  onDelete(event) {
    const data: Record = event.data;
    swalDelete.fire({
      text: `Delete record #${data.id}?`,
      preConfirm: () =>
        this.recordsRepo.delete(data.id)
          .subscribe(_ => { }, error => this.onError.notify(error))
    }).then(result => {
      if (result.value) {
        swalDeleted.fire({});
        this.getAllRecords$.next();
      }
    });
  }
}
