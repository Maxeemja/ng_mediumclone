import {Actions, createEffect, ofType} from '@ngrx/effects'
import {AuthService} from '../services/auth.service'
import {inject} from '@angular/core'
import {authActions} from './actions'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {CurrentUserInterface} from '../../shared/types/currentUser.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PersistanceService} from '../../shared/services/persistance.service'
import {Router} from '@angular/router'

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistanceService.get('accessToken')

        return !token
          ? of(authActions.getCurrentUserFailure())
          : authService.getCurrentUser().pipe(
              map((currentUser: CurrentUserInterface) => {
                return authActions.getCurrentUserSuccess({currentUser})
              }),
              catchError(() => of(authActions.getCurrentUserFailure())),
            )
      }),
    )
  },
  {functional: true},
)

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) =>
        authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token)
            return authActions.registerSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              }),
            ),
          ),
        ),
      ),
    )
  },
  {functional: true},
)

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/')
      }),
    )
  },
  {
    functional: true,
    dispatch: false,
  },
)

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({request}) =>
        authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token)
            return authActions.loginSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              }),
            ),
          ),
        ),
      ),
    )
  },
  {functional: true},
)

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/')
      }),
    )
  },
  {
    functional: true,
    dispatch: false,
  },
)
