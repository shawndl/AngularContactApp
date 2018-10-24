import {UserInterface} from './user-interface';
export interface UserFormInterface extends UserInterface {
  password: string;
  passwordConfirm: string;
}
