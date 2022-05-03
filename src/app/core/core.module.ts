import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/auth/auth-reducers';
import { NotificationEffects } from './store/notification/notification-effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forRoot({
      auth: authReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([NotificationEffects]),
  ],
})
export class CoreModule {}
