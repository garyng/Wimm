import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Router } from '@angular/router';
import { takeWhile, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnDestroy {

  alive = true;

  constructor(private authService: NbAuthService, private router: Router) {
    this.authService.authenticate('auth0')
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
