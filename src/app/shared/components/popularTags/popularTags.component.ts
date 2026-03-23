import {CommonModule} from '@angular/common'
import {Component, OnInit, inject} from '@angular/core'
import {LoadingComponent} from '../loading/loading.component'
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component'
import {RouterLink} from '@angular/router'
import {PopularTagsStore} from './store/reducers'

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  readonly popularTagsStore = inject(PopularTagsStore)

  ngOnInit() {
    this.popularTagsStore.getTags()
  }
}
