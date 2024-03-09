import {inject} from '@angular/core'
import {HttpInterceptorFn} from '@angular/common/http'
import {PersistanceService} from '../services/persistance.service'

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistanceService = inject(PersistanceService)
  const token = persistanceService.get('accessToken')
  request = request.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  })

  return next(request)
}
