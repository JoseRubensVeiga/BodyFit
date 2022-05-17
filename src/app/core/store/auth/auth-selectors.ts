import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth-interfaces';

const selectFeature = createFeatureSelector<AuthState>('auth');

/**
 * Selector da propriedade
 * `auth -> signIn -> isTryingToSignIn`
 */
export const selectIsTryingToSignIn = createSelector(
  selectFeature,
  (state) => state.signIn.isTryingToSignIn
);

/**
 * Selector da propriedade
 * `auth -> signOn -> isTryingToSignOn`
 */
export const selectIsTryingToSignOn = createSelector(
  selectFeature,
  (state) => state.signOn.isTryingToSignOn
);

/**
 * Selector que retorna `true` caso exista
 * um usuário no estado e `false` caso não
 */
export const selectIsAuthenticated = createSelector(
  selectFeature,
  (state) => !!state.user
);

/**
 * Selector da propriedade
 * `auth -> user -> role`
 */
export const selectUserRole = createSelector(
  selectFeature,
  (state) => state.user?.role
);

/**
 * Selector da propriedade
 * `auth -> signOn -> showPassword`
 */
export const selectSignOnShowPassword = createSelector(
  selectFeature,
  (state) => state.signOn.showPassword
);

/**
 * Selector da propriedade
 * `auth -> signIn -> showPassword`
 */
export const selectSignInShowPassword = createSelector(
  selectFeature,
  (state) => state.signIn.showPassword
);
