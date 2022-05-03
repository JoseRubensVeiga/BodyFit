import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth-interfaces';

const _selectAuth = createFeatureSelector<AuthState>('auth');

export const selectIsTryingToSignIn = createSelector(
  _selectAuth,
  (state) => state.isTryingToSignIn
);

export const selectIsAuthenticated = createSelector(
  _selectAuth,
  (state) => !!state.user
);
