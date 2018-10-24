import {EmailInterface} from './email-interface';
import {PhoneInterface} from './phone-interface';
export interface ContactInterface {
  firstName: string;
  lastName: string;
  emails: EmailInterface[];
  phones: PhoneInterface[];
}
