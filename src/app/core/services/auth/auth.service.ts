import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { addDays } from 'date-fns';

import { SignInPayload } from '../../interfaces/auth/SignInPayload';
import { SignInResponse } from '../../interfaces/auth/SignInResponse';
import { TokenResponse } from '../../interfaces/auth/TokenResponse';
import { User } from '../../interfaces/auth/User';
import { SignOnPayload } from '../../interfaces/auth/SignOnPayload';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signOn(payload: SignOnPayload): Observable<void> {
    // return throwError(() => new Error('Este e-mail já está sendo utilizado'));
    return of(undefined).pipe(delay(500));
  }

  signIn(payload: SignInPayload): Observable<SignInResponse> {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5jb20iLCJwYXNzd29yZCI6InlhMGdzcWh5NHd6dnV2YjQifQ.' +
      'yN_8-Mge9mFgsnYHnPEh_ZzNP7YKvSbQ3Alug9HMCsM';

    const token: TokenResponse = {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: addDays(Date.now(), 1).getDate(),
    };

    const user: User = {
      name: 'José Veiga',
      role: 'default',
    };

    const signInResponse = {
      token,
      user,
    };

    return of(signInResponse).pipe(delay(500));
  }
}
