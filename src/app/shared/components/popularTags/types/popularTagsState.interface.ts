import {GetTagsResponseInterface} from './getTagsResponse.interface'

export interface PopularTagsStateInterface {
  isLoading: boolean
  error: string | null
  data: GetTagsResponseInterface | null
}
