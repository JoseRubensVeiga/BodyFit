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

/**
 * Atualiza o status de tentando logar para `true`
 * quando o usuário tentar fazer login
 */
const _signInRequest = (state: AuthState): AuthState => ({
  ...state,
  signIn: {
    ...state.signIn,
    isTryingToSignIn: true,
  },
});

/**
 * Atualiza o status de tentando logar para `false`
 * e insere no estado os dados JWT e do usuário
 * logado quando o usuário consegue fazer login
 */
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

/**
 * Atualiza o status de tentando logar para `false`
 * quando há um erro na chamada de login
 */
const _signInError = (state: AuthState): AuthState => ({
  ...state,
  signOn: {
    ...state.signOn,
    isTryingToSignOn: false,
  },
});

/**
 * Atualiza o status de tentando criar conta para `true`
 * quando o usuário tenta criar uma conta
 */
const _signOnRequest = (state: AuthState): AuthState => ({
  ...state,
  signOn: {
    ...state.signOn,
    isTryingToSignOn: true,
  },
});

/**
 * Atualiza o status de tentando criar conta para `false`
 * quando o usuário consegue criar uma conta
 */
const _signOnSuccess = (state: AuthState): AuthState => ({
  ...state,
  signOn: {
    ...state.signOn,
    isTryingToSignOn: false,
  },
});

/**
 * Atualiza o status de tentando criar conta para `false`
 * quando há um erro na chamada de criação de conta
 */
const _signOnError = (state: AuthState): AuthState => ({
  ...state,
  signOn: {
    ...state.signOn,
    isTryingToSignOn: false,
  },
});

/**
 * Alterna o estado de mostrar/esconder a senha na tela de
 * login
 */
const _toggleSignInPassword = (state: AuthState): AuthState => ({
  ...state,
  signIn: {
    ...state.signIn,
    showPassword: !state.signIn.showPassword,
  },
});

/**
 * Alterna o estado de mostrar/esconder a senha na tela de
 * criação de conta
 */
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
