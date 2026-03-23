import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {CommonModule} from '@angular/common'
import {BackendErrorMessages} from '../../../shared/components/backendErrorMessages/backendErrorMessages.component'
import {LoginRequestInterface} from '../../types/loginRequest.interface'
import {AuthStore} from '../../store/reducers'

@Component({
  selector: 'mc-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })
  readonly authStore = inject(AuthStore)

  constructor(
    private fb: FormBuilder,
  ) {}

  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.authStore.login(request)
  }
}
