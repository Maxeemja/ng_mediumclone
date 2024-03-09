import {Component, OnInit, inject} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {TopBarComponent} from './shared/components/topBar/topBar.component'
import {Store} from '@ngrx/store'
import {authActions} from './auth/store/actions'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Medium Clone App'
  store = inject(Store)

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser())
  }
}
