import { Injectable } from '@angular/core';
import { NbOAuth2AuthStrategy, NbAuthStrategyClass, NbOAuth2ResponseType } from '@nebular/auth';
import nanoid from 'nanoid';
import { NbAuth0AuthStrategyOptions } from './NbAuth0AuthStrategyOptions';
@Injectable({
  providedIn: 'root'
})
export class NbAuth0AuthStrategy extends NbOAuth2AuthStrategy {
  protected redirectResultHandlers = {
    [NbOAuth2ResponseType.CODE]: this.redirectResultHandlers[NbOAuth2ResponseType.CODE],
    [NbOAuth2ResponseType.TOKEN]: this.redirectResultHandlers[NbOAuth2ResponseType.TOKEN],
    'token id_token': this.redirectResultHandlers[NbOAuth2ResponseType.TOKEN]
  };
  protected redirectResults = {
    [NbOAuth2ResponseType.CODE]: this.redirectResults[NbOAuth2ResponseType.CODE],
    [NbOAuth2ResponseType.TOKEN]: this.redirectResults[NbOAuth2ResponseType.TOKEN],
    'token id_token': this.redirectResults[NbOAuth2ResponseType.TOKEN]
  };
  static setup(options: NbAuth0AuthStrategyOptions): [NbAuthStrategyClass, NbAuth0AuthStrategyOptions] {
    return [NbAuth0AuthStrategy, options];
  }
  protected buildRedirectUrl() {
    // https://auth0.com/docs/api-auth/tutorials/nonce
    // todo: validate nonce
    const nonce = nanoid();
    const params = {
      response_type: this.getOption('authorize.responseType'),
      client_id: this.getOption('clientId'),
      redirect_uri: this.getOption('authorize.redirectUri'),
      scope: this.getOption('authorize.scope'),
      state: this.getOption('authorize.state'),
      audience: this.getOption('authorize.audience'),
      nonce: nonce,
      ...this.getOption('authorize.params')
    };
    const endpoint = this.getActionEndpoint('authorize');
    const query = this.urlEncodeParameters(this.cleanParams(params));
    return `${endpoint}?${query}`;
  }
}
