import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { NotificationService } from '../../services/notification';
import {
  NotificationActions,
  showNotificationError,
  showNotificationInfo,
  showNotificationSuccess,
  showNotificationWarning,
} from './notification-actions';

@Injectable()
export class NotificationEffects {
  showNofification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          showNotificationSuccess,
          showNotificationInfo,
          showNotificationWarning,
          showNotificationError
        ),
        tap((action) => {
          switch (action.type) {
            case NotificationActions.ShowNotificationSuccess:
              this.notification.success(action.payload);
              break;

            case NotificationActions.ShowNotificationInfo:
              this.notification.info(action.payload);
              break;

            case NotificationActions.ShowNotificationWarning:
              this.notification.warning(action.payload);
              break;

            case NotificationActions.ShowNotificationError:
              this.notification.error(action.payload);
              break;
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private notification: NotificationService
  ) {}
}
