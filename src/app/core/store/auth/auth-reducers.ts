import { createReducer, on } from '@ngrx/store';
import { SignInResponse } from '../../interfaces/auth/SignInResponse';
import {
  signInError,
  signInRequest,
  signInSuccess,
  signOnError,
  signOnRequest,
  signOnSuccess,
  toggleSignInPassword,
  toggleSignOnPassword,
} from './auth-actions';
import { AuthState } from './auth-interfaces';

const initialState: AuthState = {
  signIn: {
    isTryingToSignIn: false,
    showPassword: false,
  },

  signOn: {
    isTryingToSignOn: false,
    showPassword: false,
  },
};

const _signInSuccess = (
  state: AuthState,
  action: { payload: SignInResponse }
): AuthState => ({
  ...state,
  signIn: {
    ...state.signIn,
    isTryingToSignIn: false,
  },
  user: action.payload.user,
  token: action.payload.token,
});

const _signInError = (state: AuthState): AuthState => ({
  ...state,
  signOn: {
    ...state.signOn,
    isTryingToSignOn: false,
  },
});

const _signInRequest = (state: AuthState): AuthState => ({
  ...state,
  signIn: {
    ...state.signIn,
    isTryingToSignIn: true,
  },
});

const _signOnRequest = (state: AuthState): AuthState => ({
  ...state,
  signOn: {
    ...state.signOn,
    isTryingToSignOn: true,
  },
});

const _signOnSuccess = (state: AuthState): AuthState => ({
  ...state,
  signOn: {
    ...state.signOn,
    isTryingToSignOn: false,
  },
});

const _signOnError = (state: AuthState): AuthState => ({
  ...state,
  signOn: {
    ...state.signOn,
    isTryingToSignOn: false,
  },
});

const _toggleSignInPassword = (state: AuthState): AuthState => ({
  ...state,
  signIn: {
    ...state.signIn,
    showPassword: !state.signIn.showPassword,
  },
});

const _toggleSignOnPassword = (state: AuthState): AuthState => ({
  ...state,
  signOn: {
    ...state.signOn,
    showPassword: !state.signOn.showPassword,
  },
});

export const authReducer = createReducer(
  initialState,

  on(signInRequest, _signInRequest),
  on(signInSuccess, _signInSuccess),
  on(signInError, _signInError),

  on(signOnRequest, _signOnRequest),
  on(signOnSuccess, _signOnSuccess),
  on(signOnError, _signOnError),

  on(toggleSignOnPassword, _toggleSignOnPassword),
  on(toggleSignInPassword, _toggleSignInPassword)
);
