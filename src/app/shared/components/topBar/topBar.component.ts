import {Component, inject} from '@angular/core'
import {RouterLink} from '@angular/router'
import { CommonModule } from '@angular/common'
import {AuthStore} from '../../../auth/store/reducers'

@Component({
  selector: 'mc-topbar',
  templateUrl: 'topbar.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class TopBarComponent {
  readonly authStore = inject(AuthStore)
}
