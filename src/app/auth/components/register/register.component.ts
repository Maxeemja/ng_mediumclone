import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (!this.form.valid) {
      return alert('not valid')
    }
    console.log(this.form.value)
  }
}
