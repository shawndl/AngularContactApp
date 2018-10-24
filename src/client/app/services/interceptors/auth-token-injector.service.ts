import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthorisationService} from '../auth/authorisation.service';

@Injectable()
export class AuthTokenInjectorService implements HttpInterceptor {

  constructor(private auth: AuthorisationService) { }

  /**
   * if the user is logged in then add the auth token to the header
   * @param request
   * @param next
   * @return {Observable<HttpEvent<any>>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.auth.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
