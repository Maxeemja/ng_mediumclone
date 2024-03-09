import {inject} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {switchMap, of, map, catchError} from 'rxjs'
import {popularTagsActions} from './actions'
import {PopularTagsService} from '../services/tags.service'
import {GetTagsResponseInterface} from '../types/getTagsResponse.interface'

export const getTagsEffect = createEffect(
  (actions$ = inject(Actions), tagsService = inject(PopularTagsService)) => {
    return actions$.pipe(
      ofType(popularTagsActions.getTags),
      switchMap(() => {
        return tagsService.getTags().pipe(
          map((tags: GetTagsResponseInterface) => {
            return popularTagsActions.getTagsSuccess({tags})
          }),
          catchError(() => of(popularTagsActions.getTagsFailure())),
        )
      }),
    )
  },
  {functional: true},
)
