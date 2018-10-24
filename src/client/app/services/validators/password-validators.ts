import {AbstractControl } from '@angular/forms';

/**
 * checks if the password and the confirm password matches
 * @return Object | null
 */
export class PasswordValidators {
  static MatchPassword() {
    return (control: AbstractControl) => {
      const password = control.get('password');
      const passwordConfirm = control.get('passwordConfirm');
      if (!password || !passwordConfirm) {
        return null;
      }
      return (password.value === passwordConfirm.value) ? null : {matchPassword: true};
    };
  }
}



