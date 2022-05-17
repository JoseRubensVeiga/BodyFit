import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AppState } from '../../interfaces/store/AppState';
import { selectUserRole } from '../../store/auth/auth-selectors';
import { showNotificationError } from '../../store/notification/notification-actions';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  /**
   * Define se o usuário pode acessar a rota solicitada
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const roles = route.data['roles'] as string[];

    return this.store.select(selectUserRole).pipe(
      take(1),
      map((userRole) => {
        if (!userRole) {
          this.showNonAuthenticatedErrorNofification();
          return this.router.parseUrl('/login');
        }

        const hasRole = roles.includes(userRole as string);

        if (!hasRole) {
          this.showForbiddenPageErrorNotification();
          return false;
        }

        return true;
      })
    );
  }

  /**
   * Dispara uma action que mostra uma notificação
   * que informa para o usuário que ele não está
   * autenticado
   */
  private showNonAuthenticatedErrorNofification(): void {
    this.store.dispatch(
      showNotificationError({ payload: 'Você não está autenticado' })
    );
  }

  /**
   * Dispara uma action que mostra uma notificação
   * que informa para o usuário que ele não tem
   * autorização para acessar essa página.
   */
  private showForbiddenPageErrorNotification(): void {
    this.store.dispatch(
      showNotificationError({
        payload: 'Você não tem autorização para acessar essa página',
      })
    );
  }
}
