import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth';
import {
  showNotificationError,
  showNotificationSuccess,
} from '../notification/notification-actions';
import {
  signInError,
  signInRequest,
  signInSuccess,
  signOnError,
  signOnRequest,
  signOnSuccess,
} from './auth-actions';

@Injectable()
export class AuthEffects {
  signOn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOnRequest),
      switchMap((action) =>
        this.authService.signOn(action.payload).pipe(
          map(() => signOnSuccess()),
          catchError(({ message }) => of(signOnError({ payload: message })))
        )
      )
    )
  );

  signOnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOnSuccess),
      tap(() => this.router.navigate(['/login'])),
      map(
        () =>
          'Usuário criado com sucesso! Entre com seu email e senha para continuar. '
      ),
      map((msg) => showNotificationSuccess({ payload: msg }))
    )
  );

  signOnError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOnError),
      map((action) => showNotificationError({ payload: action.payload }))
    )
  );

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
