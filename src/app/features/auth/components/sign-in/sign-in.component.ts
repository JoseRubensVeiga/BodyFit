import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignInPayload } from 'src/app/core/interfaces/auth/SignInPayload';
import { AppState } from 'src/app/core/interfaces/store/AppState';
import { signInRequest } from 'src/app/core/store/auth/auth-actions';
import { selectIsTryingToSignIn } from 'src/app/core/store/auth/auth-selectors';
import { showNotificationError } from 'src/app/core/store/notification/notification-actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  formGroup!: FormGroup;

  isTryingToSignIn$ = this.store.select(selectIsTryingToSignIn);

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.store.dispatch(
        showNotificationError({ payload: 'Preencha os campos corretamente.' })
      );
      return;
    }

    this.dispatchSignInRequest();
  }

  private getSignInPayload(): SignInPayload {
    const form = this.formGroup.getRawValue();
    return {
      email: form.email,
      password: form.password,
    };
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  private dispatchSignInRequest(): void {
    const payload = this.getSignInPayload();

    this.store.dispatch(signInRequest({ payload }));
  }
}
