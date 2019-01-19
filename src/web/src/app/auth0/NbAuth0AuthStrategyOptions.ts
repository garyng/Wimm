import { NbOAuth2AuthStrategyOptions } from '@nebular/auth';
export class NbAuth0AuthStrategyOptions extends NbOAuth2AuthStrategyOptions {
  authorize?: {
    endpoint?: string;
    redirectUri?: string;
    responseType?: string;
    requireValidToken?: boolean;
    scope?: string;
    state?: string;
    audience?: string;
    params?: {
      [key: string]: string;
    };
  };
}
