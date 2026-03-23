import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'
import {RouterLink} from '@angular/router'
import {CommonModule} from '@angular/common'
import { BackendErrorMessages } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component'
import {AuthStore} from '../../store/reducers'

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })
  readonly authStore = inject(AuthStore)

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.authStore.register(request)
  }
}
