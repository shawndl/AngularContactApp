import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class PasswordMatchesMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, formGroup: FormGroupDirective | NgForm | null): boolean {
    if (formGroup.form.errors) {
      const passwordConfirm = formGroup.form.get('passwordConfirm');
      return (formGroup.form.errors.matchPassword && !passwordConfirm.untouched);
    }
    return false;
  }
}
