import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth-interfaces';

const selectFeature = createFeatureSelector<AuthState>('auth');

export const selectIsTryingToSignIn = createSelector(
  selectFeature,
  (state) => state.signIn.isTryingToSignIn
);

export const selectIsTryingToSignOn = createSelector(
  selectFeature,
  (state) => state.signOn.isTryingToSignOn
);

export const selectIsAuthenticated = createSelector(
  selectFeature,
  (state) => !!state.user
);

export const selectUserRole = createSelector(
  selectFeature,
  (state) => state.user?.role
);

export const selectSignOnShowPassword = createSelector(
  selectFeature,
  (state) => state.signOn.showPassword
);

export const selectSignInShowPassword = createSelector(
  selectFeature,
  (state) => state.signIn.showPassword
);
