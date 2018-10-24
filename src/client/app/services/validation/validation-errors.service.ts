import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable()
export class ValidationErrorsService {

  constructor() { }

  /**
   * gets validation errors for the email field
   * @param control
   * @constructor
   * @return string
   */
  emailErrors(control: FormControl): string {
    if (control.errors.required) {
      return 'An email address is required!';
    }

    if (control.errors.email) {
      return 'Please enter a valid email!';
    }
  }

  /**
   * gets validation errors for the password field
   * @param control
   * @constructor
   * @return string
   */
  phoneErrors(control: FormControl): string {
    if (control.errors.required) {
      return 'A phone number is required!';
    }
    if (control.errors.pattern) {
      return 'Please enter a valid phone number!';
    }
  }

  /**
   * gets validation errors for the password field
   * @param control
   * @constructor
   * @return string
   */
  passwordErrors(control: FormControl): string {
    if (control.errors.required) {
      return 'A password is required!';
    }
    if (control.errors.minlength) {
      return 'Your password must be at least 6 characters long!';
    }
    if (control.errors.pattern) {
      return 'Your password must contain a number, a lowercase letter, and an uppercase letter';
    }
  }

}
