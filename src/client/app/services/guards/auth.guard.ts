import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthorisationService} from '../auth/authorisation.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthorisationService, private router: Router) {}

  /**
   * is the user logged in
   * @param next
   * @param state
   * @return {boolean}
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
