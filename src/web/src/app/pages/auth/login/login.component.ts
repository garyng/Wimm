import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  constructor(private authService: NbAuthService) {}

  alive = true;

  login() {
    this.authService
      .authenticate('auth0')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  // logout

  ngOnDestroy(): void {
    this.alive = false;
  }
}
