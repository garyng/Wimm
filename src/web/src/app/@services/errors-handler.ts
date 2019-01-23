import { Injectable } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { HttpErrorResponse } from '@angular/common/http';
import HttpStatusCode from '../@common/http.status.code.enum';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandler {
  constructor(private toastrService: NbToastrService) { }

  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    status: NbToastStatus.DANGER,
    destroyByClick: true,
    duration: 3000,
    hasIcon: true,
    preventDuplicates: false
  };

  public notify(error: any) {
    if (error instanceof Error) {
      this.toastrService.show(error.message, error.name, this.config);
    } else if (error instanceof HttpErrorResponse) {
      if (error.status === HttpStatusCode.INTERNAL_SERVER_ERROR) {
        const laravelError: {
          message: string,
          exception: string
        } = error.error;
        this.toastrService.show(laravelError.message, error.message, this.config);
      } else {
        const innerError: {
          status: number;
          success: boolean;
          error: any;
        } = error.error;
        if (innerError.status === HttpStatusCode.UNPROCESSABLE_ENTITY) {
          // validation error
          const validationError: {
            code: string;
            message: string;
            fields: any;
          } = innerError.error;
          for (const key in validationError.fields) {
            if (validationError.fields.hasOwnProperty(key)) {
              const element: string[] = validationError.fields[key];
              this.toastrService.show(
                element.join('\n'),
                'Validation error!',
                this.config
              );
            }
          }
        } else {
          // other error
          const apiError: {
            code: string;
            message: string;
          } = innerError.error;
          this.toastrService.show(apiError.message, apiError.code, this.config);
        }
      }
    } else {
      this.toastrService.show(JSON.stringify(error), 'Error', this.config);
    }
  }
}
