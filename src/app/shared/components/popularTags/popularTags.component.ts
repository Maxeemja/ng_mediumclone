import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {combineLatest} from 'rxjs'
import {selectError, selectIsLoading, selectTagsData} from './store/reducers'
import {LoadingComponent} from '../loading/loading.component'
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component'
import {popularTagsActions} from './store/actions'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  constructor(private store: Store) {}

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    popularTags: this.store.select(selectTagsData),
  })

  ngOnInit() {
    this.store.dispatch(popularTagsActions.getTags())
  }
}
