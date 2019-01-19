import { Injectable } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandler {
  constructor(private toastrService: NbToastrService) {}

  // todo: deserialize errors
  public notify(error: any) {
    let title = 'Error!';
    let body = JSON.stringify(error);

    if (error instanceof HttpErrorResponse) {
      title = error.statusText;
      body = error.message;
    }

    this.toastrService.show(body, title, {
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      status: NbToastStatus.DANGER,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      preventDuplicates: true,
    });
  }
}
