import {createFeature, createReducer, on} from '@ngrx/store'
import {popularTagsActions} from './actions'
import {routerNavigationAction} from '@ngrx/router-store'
import {PopularTagsStateInterface} from '../types/popularTagsState.interface'

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

const tagsFeature = createFeature({
  name: 'tags',
  reducer: createReducer(
    initialState,
    on(popularTagsActions.getTags, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(popularTagsActions.getTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.tags,
    })),
    on(popularTagsActions.getTagsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigationAction, () => initialState),
  ),
})

export const {
  name: tagsFeatureKey,
  reducer: tagsReducer,
  selectIsLoading,
  selectData: selectTagsData,
  selectError,
} = tagsFeature
