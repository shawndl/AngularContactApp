import {ContactInterface} from './contact-interface';
export interface MongooseContactInterface extends ContactInterface {
  owner: string;
  _id: string;
}
