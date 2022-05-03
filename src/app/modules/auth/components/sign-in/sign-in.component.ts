import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignInPayload } from 'src/app/core/interfaces/auth/SignInPayload';
import { AppState } from 'src/app/core/interfaces/store/AppState';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  
  formGroup = this.initForm();

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.form)
  }

  private getSignInPayload(): SignInPayload {
    return {
      email: '',
      password: '',
    }
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
}
