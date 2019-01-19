import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { NbDatepickerModule } from '@nebular/theme';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import {
  NbAuthModule,
  NbOAuth2AuthStrategy,
  NbAuthOAuth2JWTToken,
  NbAuthJWTInterceptor,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER
} from '@nebular/auth';
import { AppConstants } from './@common/app.constants';
import { AuthGuard } from './@services/auth.guard';

// only attach jwt token for api calls
export function excludeFromTokenInterceptor(req: HttpRequest<any>) {
    return !['http://localhost:4200/api/']
        .every(url => req.url.includes(url));
  return false;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: AppConstants.Auth.auth0StrategyName,
          // Wimm.Web
          clientId: AppConstants.Auth0.clientId,
          clientSecret: '',
          baseEndpoint: AppConstants.Auth0.baseEndpoint,
          authorize: {
            endpoint: '/authorize',
            responseType: 'token',
            scope: AppConstants.Auth0.scope,
            // todo: use injected base url?
            redirectUri: AppConstants.Auth0.redirectUri,
            params: {
              audience: AppConstants.Auth0.audience
            }
          },
          token: {
            class: NbAuthOAuth2JWTToken
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
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: excludeFromTokenInterceptor },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NbAuthJWTInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
