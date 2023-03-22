import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './authentication-service';
import jwt_decode from 'jwt-decode';
import { differenceInCalendarDays } from 'date-fns';
import { log } from 'console';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.currentUserValue;
    console.log(user);
    if (user.id) {
      if (user.token != null) {
        let decoded: any = jwt_decode(user.token);
        let date: Date = new Date(decoded.exp * 1000);

        if (differenceInCalendarDays(new Date(), date) > 0) {
          this.authenticationService.logout();
          this.router.navigate(['/auth/login']);
        }
      }

      // check if route is restricted by role in future updates

      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
