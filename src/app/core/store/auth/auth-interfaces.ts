import { TokenResponse } from '../../interfaces/auth/TokenResponse';
import { User } from '../../interfaces/auth/User';

export interface AuthState {
  user?: User;
  token?: TokenResponse;

  signIn: {
    showPassword: boolean;
    isTryingToSignIn: boolean;
  };

  signOn: {
    showPassword: boolean;
    isTryingToSignOn: boolean;
  };
}
