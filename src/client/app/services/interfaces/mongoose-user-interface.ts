import {UserInterface} from './user-interface';
export interface MongooseUserInterface extends UserInterface{
  _id: string;
}
