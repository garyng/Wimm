import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpRequest} from '@angular/common/http';
import {
  NbAuthModule,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor
} from '@nebular/auth';
import { AppConstants } from './@common/app.constants';
import { AuthGuard } from './@services/auth.guard';
import { NbAuth0AuthStrategy } from './auth0/NbAuth0AuthStrategy';
import { NbAuthAuth0Token } from './auth0/NbAuthAuth0Token';

// only attach jwt token for api calls
export function excludeFromTokenInterceptor(req: HttpRequest<any>) {
  return !['/api/'].every(url => req.url.includes(url));
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbAuth0AuthStrategy.setup({
          name: AppConstants.Auth.auth0StrategyName,
          // Wimm.Web
          clientId: AppConstants.Auth0.clientId,
          clientSecret: '',
          baseEndpoint: AppConstants.Auth0.baseEndpoint,
          authorize: {
            endpoint: '/authorize',
            responseType: 'token id_token',
            scope: AppConstants.Auth0.scope,
            // todo: use injected base url?
            redirectUri: AppConstants.Auth0.redirectUri,
            audience: AppConstants.Auth0.audience
          },
          token: {
            class: NbAuthAuth0Token // NbAuthOAuth2JWTToken
          },
          redirect: {
            success: '/app/records'
            // 'failure': ''
          }
        })
      ]
    })
  ],
  providers: [
    AuthGuard,
    {
      provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
      useValue: excludeFromTokenInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NbAuthJWTInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
