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
  selectIsAuthenticated$ = this.store.select(selectIsAuthenticated);

  publicRoutes = ['/login', '/register'];

  constructor(private store: Store, private router: Router) {}

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

  private isPublicRoute(route: ActivatedRouteSnapshot): boolean {
    return this.publicRoutes.some((publicRoute) =>
      route.url[0].path.startsWith(publicRoute)
    );
  }
}
