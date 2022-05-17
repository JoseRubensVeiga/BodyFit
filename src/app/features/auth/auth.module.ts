import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

import { AuthRoutingModule } from './auth-routing.module';

import { SignInComponent } from './components/sign-in';
import { AuthComponent } from './components/auth';
import { SignOnComponent } from './components/sign-on';

@NgModule({
  declarations: [SignInComponent, AuthComponent, SignOnComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,

    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
  ],
})
export class AuthModule {}
