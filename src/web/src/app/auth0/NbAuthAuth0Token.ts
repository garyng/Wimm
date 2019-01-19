import { NbAuthOAuth2JWTToken, NbAuthTokenNotFoundError, NbAuthEmptyTokenError, decodeJwtPayload } from '@nebular/auth';
import * as Auth0 from 'auth0-js';

export class NbAuthAuth0Token extends NbAuthOAuth2JWTToken {
  getProfile(): Auth0.Auth0UserProfile {
    return this.getIdTokenPayload();
  }
  getIdToken(): string {
    const idToken = this.token.id_token;
    if (!idToken) {
      throw new NbAuthTokenNotFoundError('id_token key not found');
    } else {
      if (!Object.keys(idToken).length) {
        throw new NbAuthEmptyTokenError('Cannot extract payload from an empty id_token.');
      }
    }
    return idToken;
  }
  getIdTokenPayload(): any {
    return decodeJwtPayload(this.getIdToken());
  }
}
