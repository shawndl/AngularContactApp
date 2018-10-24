import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthorisationService {
  storageKey: string = 'contact-manage-jwt';
  constructor(private router: Router) { }

  /**
   * is the current user logged in
   * @return {boolean}
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    return tokenNotExpired(null, token);
  }

  /**
   * is the current user an admin
   * @return {string}
   */
  isAdmin(): boolean {
    console.log(this.getAdmin());
    return this.getAdmin();
  }

  /**
   * gets the storage key from local storage and returns it
   * @return {string|null}
   */
  getToken(): string {
    return localStorage.getItem(this.storageKey);
  }

  /**
   * sets the current token to local storage
   * @param token {string}
   * @return void
   */
  setToken(token: string): void {
    localStorage.setItem(this.storageKey, token);
  }

  /**
   * gets the storage key from local storage and returns it
   * @return {boolean}
   */
  getAdmin(): boolean {
    const admin = localStorage.getItem('admin');
    if (admin === 'true') {
      return true;
    }
    return false;
  }

  /**
   * sets if the current user is an admin
   * @param admin {boolean}
   * @return void
   */
  setAdmin(admin: boolean): void {
    const value = (admin) ? 'true' : 'false';
    localStorage.setItem('admin', value);
  }

  /**
   *  logs the user out by forgetting the token
   *  @return {void}
   */
  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

}
