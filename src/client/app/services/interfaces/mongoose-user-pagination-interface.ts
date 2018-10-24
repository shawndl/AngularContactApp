import {MongooseUserInterface} from './mongoose-user-interface';
export interface MongooseUserPaginationInterface {
  docs: MongooseUserInterface[];
  limit: number;
  offset: number;
  total: number;
}
