import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor} from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConstants } from '../@common/app.constants';

export function excludeFromTokenInterceptor(req: HttpRequest<any>) {
  return false;
}
// todo: import NbMomentDateModule?
export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: AppConstants.Auth.STRATEGY_NAME,
        baseEndpoint: AppConstants.Api.BASE_URL,
        token: {
          class: NbAuthJWTToken,
          key: 'token'
        },
        login: {
          endpoint: '/Users/Login'
        },
        register: {
          endpoint: '/Users/Register'
        },
        logout: {
          method: null,
          endpoint: '',
          redirect: {
            success: '/',
            failure: '/'
          }
        }
      })
    ],
    forms: {
      validation: {
        userName: {
          required: true
        },
        displayName: {
          required: true
        }
      },
      login: {
        strategy: AppConstants.Auth.STRATEGY_NAME
      },
      register: {
        strategy: AppConstants.Auth.STRATEGY_NAME
      },
      logout: {
        strategy: AppConstants.Auth.STRATEGY_NAME
      }
    }
  }).providers,
  { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: excludeFromTokenInterceptor },
  { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
