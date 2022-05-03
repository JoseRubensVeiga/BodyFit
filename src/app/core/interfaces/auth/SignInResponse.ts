import { TokenResponse } from './TokenResponse';
import { User } from './User';

export interface SignInResponse {
  token: TokenResponse;
  user: User;
}
