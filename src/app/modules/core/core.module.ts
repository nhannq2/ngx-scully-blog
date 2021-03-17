import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ErrorHandler,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { AdsenseModule } from 'ng2-adsense';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { NgxLogglyModule } from 'ngx-loggly-logger';
import { ConsoleWriter, ErrorHandlingService, FacebookService, InitLoggingAndWriters, LoggingService, LogglyWriter } from 'src/app/services';
import { InitFacebookPixel } from 'src/app/services/cross-cutting/init-facebook-pixel.factory';
import { GOOGLE_ANALYTICS_TRACKING_ID } from '../../../../configuration';

export const CORE_IMPORTS = [
  NgxLogglyModule.forRoot(),
  NgxGoogleAnalyticsModule.forRoot(
    GOOGLE_ANALYTICS_TRACKING_ID
  ),
  NgxGoogleAnalyticsRouterModule,
  AdsenseModule.forRoot({
    adClient: 'ca-pub-2911247795736893'
  }),
]

export const CORE_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    deps: [LoggingService, ConsoleWriter, LogglyWriter],
    multi: true,
    useFactory: InitLoggingAndWriters
  },
  {
    provide: APP_INITIALIZER,
    deps: [FacebookService],
    multi: true,
    useFactory: InitFacebookPixel
  },
  {
    provide: ErrorHandler,
    useClass: ErrorHandlingService
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...CORE_IMPORTS
  ],
  providers: [
    ...CORE_PROVIDERS
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only.`);
    }
  }
}
