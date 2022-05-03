import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationActions } from './notification-actions';

@Injectable()
export class NotificationEffects {
  showNofification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          NotificationActions.ShowNotificationSuccess,
          NotificationActions.ShowNotificationInfo,
          NotificationActions.ShowNotificationError
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
