import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in';

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}