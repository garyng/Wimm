import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ErrorsHandler } from './errors-handler';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor(private onError: ErrorsHandler) {}

  public fire(
    swal: typeof Swal,
    observable: Observable<any>,
    onNext: (value: any) => any,
    onError: (error: any) => any,
    onConfirmed: () => any
  ) {
    swal
      .fire({
        preConfirm: () => {
          return observable
            .toPromise()
            .then(next => onNext(next))
            .catch(error => {
              onError(error);
              this.onError.notify(error);
              Swal.close();
            });
        }
      })
      .then(result => {
        if (result.value) {
          onConfirmed();
        }
      });
  }
}
