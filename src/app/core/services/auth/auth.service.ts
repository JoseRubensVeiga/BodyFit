import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { addDays } from 'date-fns';

import { SignInPayload } from '../../interfaces/auth/SignInPayload';
import { SignInResponse } from '../../interfaces/auth/SignInResponse';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(payload: SignInPayload): Observable<SignInResponse> {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5jb20iLCJwYXNzd29yZCI6InlhMGdzcWh5NHd6dnV2YjQifQ.' +
      'yN_8-Mge9mFgsnYHnPEh_ZzNP7YKvSbQ3Alug9HMCsM';

    return of({
      token: {
        accessToken,
        tokenType: 'Bearer',
        expiresIn: addDays(Date.now(), 1).getDate(),
      },
      user: {
        name: 'José Veiga',
        type: 'default',
      },
    }).pipe(delay(500));
  }
}
