import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { SignInPayload } from '../../interfaces/auth/SignInPayload';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(payload: SignInPayload): Observable<any> {
    const baseURL = endpoints.signIn;

    return this.http.post<any>(baseURL, payload);
  }
}
