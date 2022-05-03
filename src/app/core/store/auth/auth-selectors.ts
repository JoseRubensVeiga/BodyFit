import { createSelector } from '@ngrx/store';
import { AppState } from '../../interfaces/store/AppState';

const _selectAuth = (state: AppState) => state.auth;

export const selectIsTryingToSignIn = createSelector(
  _selectAuth,
  (state) => state.isTryingToSignIn
);
