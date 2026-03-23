import {HttpErrorResponse} from '@angular/common/http'
import {inject} from '@angular/core'
import {Router} from '@angular/router'
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals'
import {rxMethod} from '@ngrx/signals/rxjs-interop'
import {tapResponse} from '@ngrx/operators'
import {EMPTY, pipe, switchMap, tap} from 'rxjs'
import {AuthService} from '../services/auth.service'
import {AuthStateInterface} from '../types/authState.interface'
import {LoginRequestInterface} from '../types/loginRequest.interface'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {PersistanceService} from '../../shared/services/persistance.service'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
}

export const AuthStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      persistanceService = inject(PersistanceService),
      router = inject(Router),
    ) => ({
      register: rxMethod<RegisterRequestInterface>(
        pipe(
          tap(() => {
            patchState(store, {isSubmitting: true, validationErrors: null})
          }),
          switchMap((request) =>
            authService.register(request).pipe(
              tapResponse({
                next: (currentUser) => {
                  persistanceService.set('accessToken', currentUser.token)
                  patchState(store, {isSubmitting: false, currentUser})
                  router.navigateByUrl('/')
                },
                error: (errorResponse: HttpErrorResponse) => {
                  patchState(store, {
                    isSubmitting: false,
                    validationErrors: errorResponse.error.errors,
                  })
                },
              }),
            ),
          ),
        ),
      ),
      login: rxMethod<LoginRequestInterface>(
        pipe(
          tap(() => {
            patchState(store, {isSubmitting: true, validationErrors: null})
          }),
          switchMap((request) =>
            authService.login(request).pipe(
              tapResponse({
                next: (currentUser) => {
                  persistanceService.set('accessToken', currentUser.token)
                  patchState(store, {isSubmitting: false, currentUser})
                  router.navigateByUrl('/')
                },
                error: (errorResponse: HttpErrorResponse) => {
                  patchState(store, {
                    isSubmitting: false,
                    validationErrors: errorResponse.error.errors,
                  })
                },
              }),
            ),
          ),
        ),
      ),
      getCurrentUser: rxMethod<void>(
        pipe(
          tap(() => {
            patchState(store, {isLoading: true})
          }),
          switchMap(() => {
            const token = persistanceService.get('accessToken')
            if (!token) {
              patchState(store, {isLoading: false, currentUser: null})
              return EMPTY
            }

            return authService.getCurrentUser().pipe(
              tapResponse({
                next: (currentUser) => {
                  patchState(store, {isLoading: false, currentUser})
                },
                error: () => {
                  patchState(store, {isLoading: false, currentUser: null})
                },
              }),
            )
          }),
        ),
      ),
      clearValidationErrors: () => {
        patchState(store, {validationErrors: null})
      },
    }),
  ),
)
