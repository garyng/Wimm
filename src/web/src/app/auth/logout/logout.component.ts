import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { AppConstants } from 'src/app/@common/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnDestroy {
  alive = true;

  constructor(private authService: NbAuthService, private router: Router) {
    this.authService
      .logout(AppConstants.Auth.auth0StrategyName)
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
