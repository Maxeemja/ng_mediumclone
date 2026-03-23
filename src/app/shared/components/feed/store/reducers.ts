import {inject} from '@angular/core'
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals'
import {rxMethod} from '@ngrx/signals/rxjs-interop'
import {tapResponse} from '@ngrx/operators'
import {pipe, switchMap, tap} from 'rxjs'
import {FeedService} from '../service/feed.service'
import {FeedStateInterface} from '../types/feedState.interface'

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

export const FeedStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, feedService = inject(FeedService)) => ({
    getFeed: rxMethod<string>(
      pipe(
        tap(() => {
          patchState(store, {isLoading: true, error: null})
        }),
        switchMap((url) =>
          feedService.getFeed(url).pipe(
            tapResponse({
              next: (feed) => {
                patchState(store, {isLoading: false, data: feed})
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
