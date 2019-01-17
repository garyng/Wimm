import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  protected layoutSize$ = new Subject();

  changeLayoutSize() {
    this.layoutSize$.next();
  }

  // raised when size of the layout changes (eg: sidebar opened)
  // useful for resizing charts
  onChangeLayoutSize(): Observable<any> {
    return this.layoutSize$.pipe(
      share(),
      delay(1),
    );
  }
}
