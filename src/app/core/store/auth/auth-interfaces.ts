import { User } from '../../interfaces/auth/User';

export interface AuthState {
  user?: User;
  isTryingToSignIn: boolean;
}
