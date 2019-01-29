import { Component, OnInit } from '@angular/core';
import { Auth0UserService } from 'src/app/@services/auth0.user.service';
import { UserRepository, CurrenciesRepository, DebugRepository } from 'src/app/@services/repository-base';
import { SpinnerService } from 'src/app/@services/spinner.service';
import { ReplaySubject } from 'rxjs';
import { ErrorsHandler } from 'src/app/@services/errors-handler';
import { flatMap, tap } from 'rxjs/operators';
import { Auth0UserProfile } from 'auth0-js';
import { Currency } from 'src/app/@models/currency';
import { SwalService } from 'src/app/@services/swal.service';
import { swalQuestion } from 'src/app/@common/swal-mixins';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NbTokenService } from '@nebular/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  load$: ReplaySubject<{}> = new ReplaySubject();
  profile: Auth0UserProfile;

  currencies: Currency[];
  selectedCurrency: string;
  defaultCurrency: string;

  accessToken = '';

  constructor(private auth0UserService: Auth0UserService,
    private tokenService: NbTokenService,
    private userRepo: UserRepository,
    private currenciesRepo: CurrenciesRepository,
    private debugRepo: DebugRepository,
    public spinner: SpinnerService,
    private swalService: SwalService,
    private toastrService: NbToastrService,
    private router: Router,
    onError: ErrorsHandler) {
    this.load$
      .pipe(
        tap(_ => spinner.show()),
        flatMap(_ => this.tokenService.get()),
        tap(token => this.accessToken = token.getValue()),
        flatMap(_ => this.auth0UserService.profile),
        tap(profile => this.profile = profile),
        flatMap(_ => this.userRepo.get()),
        tap(user => {
          this.defaultCurrency = user.currency;
          this.selectedCurrency = user.currency;
        }),
        flatMap(_ => this.currenciesRepo.getAll()),
        tap(currencies => this.currencies = currencies),
        tap(_ => spinner.hide())
      )
      .subscribe(_ => { }, error => onError.notify(error));
      this.load$.next();
  }

  onChangeCurrency() {
    this.swalService.fire(
      swalQuestion.mixin({
        text: 'Change default currency?'
      }),
      this.userRepo.updateCurrency({currency: this.selectedCurrency}),
      _ => { },
      _ => { },
      () => Swal.fire({
        title: 'Changed',
        type: 'success'
      }));
  }

  ngOnInit() {
  }

  goToTestErrors() {
    this.router.navigate(['app/error']);
  }

  initDatabase() {
    this.debugRepo.init()
    .subscribe(_ => {
      this.toastrService.success('Database initialized', 'Done!');
    });
  }

  populateData() {
    this.debugRepo.populate()
    .subscribe(_ => {
      this.toastrService.success('Populated sample data', 'Done!');
    });
  }

}
