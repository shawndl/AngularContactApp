import { Injectable } from '@angular/core';

@Injectable()
export class AbstractDatabaseService {

  /**
   * prepares the url string
   * @param url
   * @return {string}
   */
  protected getUrl(url: string): string {
    return 'http://localhost:3000/api/' + url;
  }
}
