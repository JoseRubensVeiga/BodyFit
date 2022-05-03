import { createAction, props } from '@ngrx/store';

export enum NotificationActions {
  ShowNotificationSuccess = '[NOTIFICATION] Show Notification Success',
  ShowNotificationInfo = '[NOTIFICATION] Show Notification Info',
  ShowNotificationWarning = '[NOTIFICATION] Show Notification Warning',
  ShowNotificationError = '[NOTIFICATION] Show Notification Error',
}

export const showNotificationSuccess = createAction(
  NotificationActions.ShowNotificationSuccess,
  props<{ payload: string }>()
);

export const showNotificationInfo = createAction(
  NotificationActions.ShowNotificationInfo,
  props<{ payload: string }>()
);

export const showNotificationWarning = createAction(
  NotificationActions.ShowNotificationWarning,
  props<{ payload: string }>()
);

export const showNotificationError = createAction(
  NotificationActions.ShowNotificationError,
  props<{ payload: string }>()
);
