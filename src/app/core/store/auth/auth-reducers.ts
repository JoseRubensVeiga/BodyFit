import { createReducer, on } from '@ngrx/store';
import { signInError, signInRequest, signInSuccess } from './auth-actions';
import { AuthState } from './auth-interfaces';

const initialState: AuthState = {
  isTryingToSignIn: false,
};

const _signInSuccess = (state: AuthState): AuthState => ({
  ...state,
  isTryingToSignIn: false,
});

const _signInError = (state: AuthState): AuthState => ({
  ...state,
  isTryingToSignIn: false,
});

const _signInRequest = (state: AuthState): AuthState => ({
  ...state,
  isTryingToSignIn: true,
});

export const authReducer = createReducer(
  initialState,

  on(signInSuccess, _signInSuccess),
  on(signInError, _signInError),
  on(signInRequest, _signInRequest)
);
