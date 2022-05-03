import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { signInError, signInRequest, signInSuccess } from './auth-actions';

@Injectable()
export class AuthEffects {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInRequest),
      switchMap((action) =>
        this.authService.signIn(action.payload).pipe(
          map(() => signInSuccess()),
          catchError(() => of(signInError()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
