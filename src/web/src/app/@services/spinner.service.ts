import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  public show() {
    this.isLoading$.next(true);
  }

  public hide() {
    this.isLoading$.next(false);
  }
}
