import { Component, OnDestroy } from '@angular/core';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AppConstants } from 'src/app/@common/app.constants';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnDestroy {

  alive = true;

  constructor(private authService: NbAuthService, private router: Router) {
    this.authService.authenticate(AppConstants.Auth.auth0StrategyName)
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess() && authResult.getRedirect()) {
          this.router.navigateByUrl(authResult.getRedirect());
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
