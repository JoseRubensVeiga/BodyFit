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
  /**
   * Faz uma chamada ao serviço de criação de usuário e emite
   * a action `signOnSuccess` caso sucesso ou a
   * `signOnError` caso erro
   */
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

  /**
   * Navega o usuário para a rota `/login` e
   * mostra uma notificação de sucesso
   */
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

  /**
   * Mostra uma notificação de erro obtendo
   * o texto do payload da action `signOnError`
   */
  signOnError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOnError),
      map((action) => showNotificationError({ payload: action.payload }))
    )
  );

  /**
   * Faz uma chamada ao serviço de login e emite
   * a action `signInSuccess` caso sucesso ou a
   * `signInError` caso erro
   */
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

  /**
   * Navega o usuário para a rota `/home` e
   * mostra uma notificação de sucesso
   */
  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
      tap(() => this.router.navigate(['home'])),
      map((action) => action.payload.user.name),
      map((userName) => `Bem vindo, ${userName}!`),
      map((msg) => showNotificationSuccess({ payload: msg }))
    )
  );

  /**
   * Mostra uma notificação de erro obtendo
   * o texto do payload da action `signInError`
   */
  signInError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInError),
      map(() => 'E-mail e/ou senha incorretos.'),
      map((msg) => showNotificationError({ payload: msg }))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
