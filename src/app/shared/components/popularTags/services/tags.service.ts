import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {GetTagsResponseInterface} from '../types/getTagsResponse.interface'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../../../environments/environment.development'

@Injectable({providedIn: 'root'})
export class PopularTagsService {
  url = environment.apiUrl + '/tags'
  constructor(private http: HttpClient) {}

  getTags(): Observable<GetTagsResponseInterface> {
    return this.http.get<GetTagsResponseInterface>(this.url)
  }
}
