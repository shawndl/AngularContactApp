import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ContactInterface} from '../interfaces/contact-interface';
import {MongoosePaginationInterface} from '../interfaces/mongoose-pagination-interface';
import { APP_CONFIG } from '../../config/ValueProvider';
import { ValueProviderInterface } from '../../config/ValueProviderInterface';
import {Observable} from 'rxjs/Observable';
import {MongooseContactInterface} from '../interfaces/mongoose-contact-interface';

@Injectable()
export class ContactsService {
  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: ValueProviderInterface) {}

  /**
   * sends an api request to retrieve a single contact
   * @param id
   * @return {Observable<MongooseContactInterface>
   */
  getOne(id: string) {
    const url = this.config.apiEndPoint + 'contacts/' + id;
    return this.http.get<MongooseContactInterface>(url);
  }

  /**
   * sends an api request to deletes a single contact
   * @param id
   * @return {Observable<string>}
   */
  delete(id: string): Observable<string> {
    const url = this.config.apiEndPoint + 'contacts/' + id;
    return this.http.delete<string>(url);
  }

  /**
   * sends an api request and returns the paginated results for the users contacts
   * @param limit
   * @param offset
   * @return {Observable<MongoosePaginationInterface>}
   */
  public getContacts(limit: number = null, offset: number = null): Observable<MongoosePaginationInterface> {
    const url = this.config.apiEndPoint + 'contacts?limit=' + limit + '&offset=' + offset;
    return this.http.get<MongoosePaginationInterface>(url);
  }

  /**
   * sends an api request to create a new contact
   * @param contact
   * @return {Observable<string>}
   */
  public createContact(contact: ContactInterface): Observable<string> {
    const url = this.config.apiEndPoint + 'contacts';
    return this.http.post<string>(url, contact);
  }

  /**
   * sends an api request to edit a contact
   * @param contact
   * @return {Observable<string>}
   */
  public edit(contact: ContactInterface, id: string): Observable<string> {
    const url = this.config.apiEndPoint + 'contacts/' + id;
    return this.http.put<string>(url, contact);
  }
}
