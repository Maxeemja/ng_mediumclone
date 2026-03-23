import {ApplicationConfig} from '@angular/core'
import {provideRouter} from '@angular/router'
import {appRoutes} from './app.routes'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {authInterceptor} from './shared/interceptors/authInterceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
  ],
}
