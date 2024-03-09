import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {GetTagsResponseInterface} from '../types/getTagsResponse.interface'

export const popularTagsActions = createActionGroup({
  source: 'popular tags',
  events: {
    'Get tags': emptyProps(),
    'Get tags success': props<{tags: GetTagsResponseInterface}>(),
    'Get tags failure': emptyProps(),
  },
})
