import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserFormInterface} from '../interfaces/user-form-interface';
import { APP_CONFIG } from '../../config/ValueProvider';
import { ValueProviderInterface } from '../../config/ValueProviderInterface';
import {Observable} from 'rxjs/Observable';
import {MongooseUserInterface} from '../interfaces/mongoose-user-interface';
import {MongooseUserPaginationInterface} from '../interfaces/mongoose-user-pagination-interface';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: ValueProviderInterface) {}

  /**
   * performs an api call to create a new user
   * @param user
   * @return {Observable<string>}
   */
  createUser(user: UserFormInterface): Observable<string> {
    const url = this.config.apiEndPoint + 'users';
    console.log(url);
    return this.http.post<string>(url, user);
  }

  /**
   * performs an api call to retrieve a single user
   * @param id
   * @return
   */
  getOne(id: string): Observable<MongooseUserInterface> {
    const url = this.config.apiEndPoint + 'users/' + id;
    return this.http.get<MongooseUserInterface>(url);
  }

  /**
   * performs an api call to retrieve a single user
   * @param id
   * @return
   */
  all(limit: number = null, offset: number = null): Observable<MongooseUserPaginationInterface> {
    const url = this.config.apiEndPoint + 'users?limit=' + limit + '&offset=' + offset;
    return this.http.get<MongooseUserPaginationInterface>(url);
  }

  /**
   * performs an api call to delete a user
   * @param id
   * @return
   */
  delete(id: string) {
    const url = this.config.apiEndPoint + 'users/' + id;
    return this.http.delete(url);
  }

  /**
   * performs an api call to edit a user
   * @param id
   * @return
   */
  edit(user: UserFormInterface, id: string) {
    const url = this.config.apiEndPoint + 'users/' + id;
    return this.http.put(url, user);
  }
}
