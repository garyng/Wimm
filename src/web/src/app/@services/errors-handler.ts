import { Injectable } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse, ApiErrorResponse } from './repository-base';
import HttpStatusCode from '../@common/http.status.code.enum';


@Injectable({
  providedIn: 'root'
})
export class ErrorsHandler {
  constructor(private toastrService: NbToastrService) {}

  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    status: NbToastStatus.DANGER,
    destroyByClick: true,
    duration: 3000,
    hasIcon: true,
    preventDuplicates: false,
  };

  // todo: deserialize errors
  public notify(error: any) {
    let title = 'Error!';
    let body = JSON.stringify(error);

  //   "error": {
  //     "code": "unauthorized",
  //     "message": "Wrong number of segments"
  // }


//   {
//     "status": 422,
//     "success": false,
//     "error": {
//         "code": "validation_failed",
//         "message": "The given data failed to pass validation.",
//         "fields": {
//             "user_id": [
//                 "The user id field is required."
//             ],
//             "category_id": [
//                 "The category id field is required."
//             ],
//             "amount": [
//                 "The amount field is required."
//             ],
//             "timestamp": [
//                 "The timestamp field is required."
//             ]
//         }
//     }
// }

    if (error instanceof HttpErrorResponse) {
      const apiResponse = error.error as ApiResponse<any>;
      if (apiResponse) {
        const errorResponse = error.error.error as ApiErrorResponse;
        if (error.status === HttpStatusCode.UNPROCESSABLE_ENTITY) {
          for (const key in errorResponse.fields) {
            if (errorResponse.fields.hasOwnProperty(key)) {
              const element = errorResponse.fields[key] as any; // confused between Object's fields and the property fields
              this.toastrService.show(element.join('\n'), 'Validation error!', this.config);
            }
          }
        } else {
          this.toastrService.show(errorResponse.message, errorResponse.code, this.config);
        }
      } else {
        title = error.statusText;
        body = error.message;
        this.toastrService.show(body, title, this.config);
      }
    } else {
      this.toastrService.show(body, title, this.config);
    }

  }
}
