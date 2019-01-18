import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { NbDatepickerModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { NbAuthModule, NbOAuth2AuthStrategy, NbAuthOAuth2JWTToken } from '@nebular/auth';

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
        clientId: '51LH4Hr2HsA4CZteofD1pmDl3FpeyeD0',
        clientSecret: '',
        baseEndpoint: 'https://garyng.auth0.com',
        authorize: {
          endpoint: '/authorize',
          responseType: 'token',
          scope: 'openid profile',
          // todo: use injected base url?
          redirectUri: 'http://localhost:4200/auth/callback',
          params: {
            'audience': 'https://wimm.api',
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
