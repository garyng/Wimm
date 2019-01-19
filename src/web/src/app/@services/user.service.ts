import { Injectable } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { map } from 'rxjs/operators';
import * as Auth0 from 'auth0-js';
import { Observable } from 'rxjs';
import { NbAuthAuth0Token } from '../auth0/NbAuthAuth0Token';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private tokenService: NbTokenService) {}

  get profile(): Observable<Auth0.Auth0UserProfile> {
    return this.tokenService.get().pipe(
      // todo: need to get the id from the backend api
      map((token: NbAuthAuth0Token) => token.getProfile())
    );
  }
}
