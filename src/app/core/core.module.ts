import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ToastrModule } from 'ngx-toastr';

import { authReducer } from './store/auth/auth-reducers';
import { NotificationEffects } from './store/notification/notification-effects';
import { NotificationService } from './services/notification';
import { AuthEffects } from './store/auth/auth-effects';
import { AuthService } from './services/auth';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forRoot({
      auth: authReducer,
    }),
    EffectsModule.forRoot([NotificationEffects, AuthEffects]),

    ToastrModule.forRoot(),
  ],
  providers: [NotificationService, AuthService],
})
export class CoreModule {}
