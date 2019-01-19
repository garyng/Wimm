import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { AppConstants } from 'src/app/@common/app.constants';

@Component({
  selector: 'app-login',
  template: '',
  styles: []
})
export class LoginComponent implements OnDestroy {
  alive = true;
  constructor(private authService: NbAuthService) {
    this.authService
      .authenticate(AppConstants.Auth.auth0StrategyName)
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {});
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
