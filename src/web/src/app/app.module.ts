import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { NbDatepickerModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { NbAuthModule, NbOAuth2AuthStrategy, NbAuthOAuth2JWTToken } from '@nebular/auth';
import { AppConstants } from './@common/app.constants';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [NbOAuth2AuthStrategy.setup({
        name: 'auth0',
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
            'audience': AppConstants.Auth0.audience,
          }
        },
        token: {
          class: NbAuthOAuth2JWTToken
        },
        redirect: {
          'success': '/records',
          // 'failure': ''
        }
      })
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
