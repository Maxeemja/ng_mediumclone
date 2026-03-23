import {Component, OnInit, inject} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {TopBarComponent} from './shared/components/topBar/topBar.component'
import {AuthStore} from './auth/store/reducers'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Medium Clone App'
  authStore = inject(AuthStore)

  ngOnInit(): void {
    this.authStore.getCurrentUser()
  }
}
