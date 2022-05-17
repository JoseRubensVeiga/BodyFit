import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectIsAuthenticated } from '../../store/auth/auth-selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * Observable que representa se o usuário
   * está autenticado
   */
  selectIsAuthenticated$ = this.store.select(selectIsAuthenticated);

  /**
   * Lista de rotas que não o usuário não
   * precisa estar logado para acessar
   */
  publicRoutes = ['/login', '/register'];

  constructor(private store: Store, private router: Router) {}

  /**
   * Define se o usuário pode acessar a rota solicitada
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.selectIsAuthenticated$.pipe(
      map((isAuthenticated) => {
        const isPublicRoute = this.isPublicRoute(route);

        if (isAuthenticated && isPublicRoute) {
          return this.router.parseUrl('/home');
        }

        if (isPublicRoute) {
          return true;
        }

        if (!isAuthenticated) {
          return this.router.parseUrl('/login');
        }

        return true;
      })
    );
  }

  /**
   * Verifica se a rota solicitada é pública com base
   * na variável global `publicRoutes`
   *
   * @returns Um booleano que representa se a rota
   * solicitada é pública
   */
  private isPublicRoute(route: ActivatedRouteSnapshot): boolean {
    return this.publicRoutes.some((publicRoute) =>
      route.url[0].path.startsWith(publicRoute)
    );
  }
}
