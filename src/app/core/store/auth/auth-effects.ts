import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth';
import {
  showNotificationError,
  showNotificationSuccess,
} from '../notification/notification-actions';
import { signInError, signInRequest, signInSuccess } from './auth-actions';

@Injectable()
export class AuthEffects {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInRequest),
      switchMap((action) =>
        this.authService.signIn(action.payload).pipe(
          map((response) => signInSuccess({ payload: response })),
          catchError(() => of(signInError()))
        )
      )
    )
  );

  signInError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInError),
      map(() => 'E-mail e/ou senha incorretos.'),
      map((msg) => showNotificationError({ payload: msg }))
    )
  );

  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
      tap(() => this.router.navigate(['home'])),
      map((action) => action.payload.user.name),
      map((userName) => `Bem vindo, ${userName}!`),
      map((msg) => showNotificationSuccess({ payload: msg }))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
