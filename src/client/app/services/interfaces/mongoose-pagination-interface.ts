import {MongooseContactInterface} from './mongoose-contact-interface';
export interface MongoosePaginationInterface {
  docs: MongooseContactInterface[];
  limit: number;
  offset: number;
  total: number;
}
