import { createAction, props } from '@ngrx/store';
import { SignInPayload } from '../../interfaces/auth/SignInPayload';
import { SignInResponse } from '../../interfaces/auth/SignInResponse';
import { SignOnPayload } from '../../interfaces/auth/SignOnPayload';

export enum AuthActions {
  SignInRequest = '[Auth] Sign In Request',
  SignInSuccess = '[Auth] Sign In Success',
  SignInError = '[Auth] Sign In Error',

  SignOnRequest = '[Auth] Sign On Request',
  SignOnSuccess = '[Auth] Sign On Success',
  SignOnError = '[Auth] Sign On Error',

  ToggleSignOnPassword = '[Auth] Toggle Sign On Password',

  ToggleSignInPassword = '[Auth] Toggle Sign In Password',
}

export const signInRequest = createAction(
  AuthActions.SignInRequest,
  props<{ payload: SignInPayload }>()
);

export const signInSuccess = createAction(
  AuthActions.SignInSuccess,
  props<{ payload: SignInResponse }>()
);

export const signInError = createAction(AuthActions.SignInError);

export const signOnRequest = createAction(
  AuthActions.SignOnRequest,
  props<{ payload: SignOnPayload }>()
);

export const signOnSuccess = createAction(AuthActions.SignOnSuccess);

export const signOnError = createAction(
  AuthActions.SignOnError,
  props<{ payload: string }>()
);

export const toggleSignOnPassword = createAction(
  AuthActions.ToggleSignOnPassword
);

export const toggleSignInPassword = createAction(
  AuthActions.ToggleSignInPassword
);
