import {Component, Input, inject} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterLink, RouterLinkActive} from '@angular/router'
import {AuthStore} from '../../../auth/store/reducers'

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeedTogglerComponent {
  @Input() tagName?: string

  readonly authStore = inject(AuthStore)
}
