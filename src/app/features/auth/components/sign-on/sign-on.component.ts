import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { SignOnPayload } from 'src/app/core/interfaces/auth/SignOnPayload';
import {
  signOnRequest,
  toggleSignOnPassword,
} from 'src/app/core/store/auth/auth-actions';
import {
  selectIsTryingToSignOn,
  selectSignOnShowPassword,
} from 'src/app/core/store/auth/auth-selectors';
import { showNotificationError } from 'src/app/core/store/notification/notification-actions';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.scss'],
})
export class SignOnComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;

  showPassword$ = this.store.select(selectSignOnShowPassword);
  isTryingToSignOn$ = this.store.select(selectIsTryingToSignOn);

  destroyed$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.store.dispatch(
        showNotificationError({ payload: 'Preencha os campos corretamente' })
      );
      return;
    }

    this.store.dispatch(signOnRequest({ payload: this.getSignOnPayload() }));
  }

  togglePassword(): void {
    this.store.dispatch(toggleSignOnPassword());
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: [null],
    });

    this.setPasswordValidation();
  }

  private setPasswordValidation(): void {
    this.formGroup
      .get('passwordConfirmation')
      ?.setValidators(this.getPasswordConfirmation());

    this.formGroup
      .get('password')
      ?.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.formGroup.get('passwordConfirmation')?.updateValueAndValidity();
      });
  }

  private getPasswordConfirmation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      if (control.value !== this.formGroup.get('password')?.value) {
        return { different: true };
      }

      return null;
    };
  }

  private getSignOnPayload(): SignOnPayload {
    const form = this.formGroup.getRawValue();
    return {
      email: form.email,
      password: form.password,
      passwordConfirmation: form.passwordConfirmation,
    };
  }
}
