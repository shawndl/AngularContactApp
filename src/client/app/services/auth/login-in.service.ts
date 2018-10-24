import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoginInterface } from '../interfaces/login-interface';
import {Observable} from 'rxjs/Observable';
import {LoginTokenInterface} from '../interfaces/login-token';
import { APP_CONFIG } from '../../config/ValueProvider';
import { ValueProviderInterface } from '../../config/ValueProviderInterface';
import {UserFormInterface} from '../interfaces/user-form-interface';

@Injectable()
export class LoginInService {
  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: ValueProviderInterface) { }

  /**
   * authenticates the user based on their email and password
   * @return {void}
   * @param login
   */
  authenticate(login: LoginInterface): Observable<LoginTokenInterface> {
    const url = this.config.apiEndPoint + 'auth/login';
    return this.http.post<LoginTokenInterface>(url, login);
  }

  /**
   * registers a new user
   * @param user
   * @return {Observable<Object>}
   */
  register(user: UserFormInterface): Observable<{message: string, token: string}> {
    const url = this.config.apiEndPoint + 'auth/register';
    return this.http.post<{message: string, token: string}>(url, user);
  }

}
