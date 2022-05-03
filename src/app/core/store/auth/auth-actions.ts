import { createAction, props } from '@ngrx/store';
import { SignInPayload } from '../../interfaces/auth/SignInPayload';

export enum AuthActions {
  SignInRequest = '[AUTH] Sign In Request',
  SignInSuccess = '[AUTH] Sign In Success',
  SignInError = '[AUTH] Sign In Error',
}

export const signInRequest = createAction(
  AuthActions.SignInRequest,
  props<{ payload: SignInPayload }>()
);

export const signInSuccess = createAction(AuthActions.SignInSuccess);

export const signInError = createAction(AuthActions.SignInError);
