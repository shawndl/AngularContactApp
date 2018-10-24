import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthorisationService} from '../auth/authorisation.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthorisationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAdmin()) {
      return true;
    }
    return false;
  }
}
