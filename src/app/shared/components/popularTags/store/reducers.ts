import {inject} from '@angular/core'
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals'
import {rxMethod} from '@ngrx/signals/rxjs-interop'
import {tapResponse} from '@ngrx/operators'
import {pipe, switchMap, tap} from 'rxjs'
import {PopularTagsStateInterface} from '../types/popularTagsState.interface'
import {PopularTagsService} from '../services/tags.service'

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

export const PopularTagsStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, popularTagsService = inject(PopularTagsService)) => ({
    getTags: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, {isLoading: true, error: null})
        }),
        switchMap(() =>
          popularTagsService.getTags().pipe(
            tapResponse({
              next: (tags) => {
                patchState(store, {isLoading: false, data: tags})
              },
              error: () => {
                patchState(store, {isLoading: false})
              },
            }),
          ),
        ),
      ),
    ),
    reset: () => patchState(store, initialState),
  })),
)
