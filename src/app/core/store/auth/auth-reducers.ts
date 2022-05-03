import { createReducer, on } from '@ngrx/store';
import { signInError, signInRequest, signInSuccess } from './auth-actions';
import { AuthState } from './auth-interfaces';

const initialState: AuthState = {
  isLoggedIn: false,
  isTryingToSignIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state) => ({
    ...state,
    isLoggedIn: true,
    isTryingToSignIn: false,
  })),
  on(signInError, (state) => ({ ...state, isTryingToSignIn: false })),
  on(signInRequest, (state) => ({ ...state, isTryingToSignIn: true }))
);
