import { Injectable } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { map, flatMap } from 'rxjs/operators';
import * as Auth0 from 'auth0-js';
import { AppConstants } from '../@common/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private tokenService: NbTokenService) {}

  private auth0 = new Auth0.WebAuth({
    clientID: AppConstants.Auth0.clientId,
    domain: AppConstants.Auth0.domain,
    scope: AppConstants.Auth0.scope
  });

  get profile(): Observable<Auth0.Auth0UserProfile> {
    return this.tokenService.get().pipe(
      flatMap(token => {
        return Observable.create(observer => {
          this.auth0.client.userInfo(token.getValue(), (error, profile) => {
            if (profile) {
              observer.next(profile);
            }
            if (error) {
              observer.error(error);
            }
          });
        });
      })
    );
  }
}
