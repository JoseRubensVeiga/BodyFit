import { createReducer, on } from '@ngrx/store';
import { AuthState } from 'src/app/core/interfaces/store/AuthState';
import { signInSuccess } from './auth-actions';

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state) => ({ ...state, isLoggedIn: true }))
);
