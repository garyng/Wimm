import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorsHandler } from 'src/app/@services/errors-handler';
import { CategoriesRepository } from 'src/app/@services/repository-base';
import { Category } from 'src/app/@models/category';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private http: HttpClient, private onError: ErrorsHandler, private categoriesRepo: CategoriesRepository) { }

  ngOnInit() {
  }

  fireGenericError() {
    const subject = new BehaviorSubject({});
    subject.pipe(
      tap(_ => { throw new Error('asad'); })
    ).subscribe(_ => { }, error => this.onError.notify(error));
    // not stringify-able
  }

  fireHttpError() {
    this.http.get('/api/non-existent').subscribe(_ => { }, error => this.onError.notify(error));
    // {
    //   "status": 404,
    //   "success": false,
    //   "error": {
    //       "code": "page_not_found",
    //       "message": "The requested page does not exist."
    //   }
    // }
  }

  fireValidationError() {
    this.categoriesRepo.add(Category.create(({
      name: null,
      id: 0,
      createdAt: null,
      updatedAt: null
    }))).subscribe(_ => { }, error => this.onError.notify(error));

    // {
    //   "headers": {
    //       "normalizedNames": {},
    //       "lazyUpdate": null
    //   },
    //   "status": 422,
    //   "statusText": "Unprocessable Entity",
    //   "url": "http://localhost:4200/api/categories",
    //   "ok": false,
    //   "name": "HttpErrorResponse",
    //   "message": "Http failure response for http://localhost:4200/api/categories: 422 Unprocessable Entity",
    //   "error": {
    //       "status": 422,
    //       "success": false,
    //       "error": {
    //           "code": "validation_failed",
    //           "message": "The given data failed to pass validation.",
    //           "fields": {
    //               "name": [
    //                   "The name field is required."
    //               ]
    //           }
    //       }
    //   }
    // }
  }

  fireLaravelException() {
//   {
//     "headers": {
//         "normalizedNames": {},
//         "lazyUpdate": null
//     },
//     "status": 500,
//     "statusText": "Internal Server Error",
//     "url": "http://localhost:4200/api/recurrences",
//     "ok": false,
//     "name": "HttpErrorResponse",
//     "message": "Http failure response for http://localhost:4200/api/recurrences: 500 Internal Server Error",
//     "error": {
//         "message": "SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'description' cannot be null (SQL: insert into `recurrences` (`user_id`, `category_id`, `amount`, `description`, `frequency`, `next_timestamp`, `currency`, `updated_at`, `created_at`) values (10, 1, -100, , daily, 1546358400000, MYR, 2019-01-23 18:07:58, 2019-01-23 18:07:58))",
//         "exception": "Illuminate\\Database\\QueryException",
//         "file": "/var/www/vendor/laravel/framework/src/Illuminate/Database/Connection.php",
//         "line": 664,
//         "trace": []
//     }
// }
  }
}
