import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from '../../../services/validators/password-validators';
import {ValidationErrorsService} from '../../../services/validation/validation-errors.service';
import {PasswordMatchesMatcher} from '../../../services/error-state-matchers/password-matches-matchers';
import {MongooseUserInterface} from '../../../services/interfaces/mongoose-user-interface';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit, OnChanges {
  @Output() submitUserForm = new EventEmitter();
  @Input() oldUser: MongooseUserInterface;
  userForm: FormGroup;
  firstNameField: FormControl;
  lastNameField: FormControl;
  emailField: FormControl;
  phoneField: FormControl;
  passwordField: FormControl;
  passwordConfirmField: FormControl;
  isAdmin: FormControl;
  passwordMatches = new PasswordMatchesMatcher();
  constructor(private formBuilder: FormBuilder,
              public validatorErrors: ValidationErrorsService) { }

  ngOnInit() {
    this.buildForm();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['oldUser']) {
      this.buildForm();
    }
  }

  /**
   * sets default values for the form
   * @return {void}
   */
  private getDefaultValues(field: string): string {
    if (this.oldUser === undefined) {
      return null;
    }
    return this.oldUser[field];
  }

  /**
   * builds the registration form property
   * @return{void}
   */
  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(this.getDefaultValues('firstName'), Validators.required),
      lastName:  this.formBuilder.control(this.getDefaultValues('lastName'), Validators.required),
      email: this.formBuilder.control(this.getDefaultValues('email'), [Validators.required, Validators.email]),
      phone: this.formBuilder.control(this.getDefaultValues('phone'), [Validators.required, Validators.pattern('[1-90]+')]),
      isAdmin: this.formBuilder.control(this.getDefaultValues('isAdmin'))
    }, {
      validator: PasswordValidators.MatchPassword()
    });
    if (this.oldUser === undefined) {
      this.userForm.addControl('password', this.formBuilder.control(null, [Validators.required, Validators.minLength(6),
        Validators.pattern('^(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z1-90!@#$%^&*]+$')]));
      this.userForm.addControl('passwordConfirm',
        this.formBuilder.control(null, [Validators.required]));
    }

    this.setControlProperties();
  }
  /**
   * sets the property control values
   * @return {void}
   */
  private setControlProperties(): void {
    this.firstNameField = <FormControl>this.userForm.get('firstName');
    this.lastNameField = <FormControl>this.userForm.get('lastName');
    this.emailField = <FormControl>this.userForm.get('email');
    this.phoneField = <FormControl>this.userForm.get('phone');
    this.isAdmin = <FormControl>this.userForm.get('isAdmin');
    if (this.oldUser === undefined) {
      this.passwordField = <FormControl>this.userForm.get('password');
      this.passwordConfirmField = <FormControl>this.userForm.get('passwordConfirm');
    }
  }

  /**
   * get custom validation depending if the its an edit form or not
   * @return {any}
   */
  private getCustomValidation(): null | { validator: Function} {
    if (this.oldUser) {
      return null;
    }
    return {
      validator: PasswordValidators.MatchPassword()
    };
  }

  /**
   * if there are no validation errors it will perform an ajax request to the server requesting a new user be added
   * @return {void}
   */
  onSubmitForm(): void {
    if (this.userForm.valid) {
      this.submitUserForm.emit(this.userForm.value);
      return;
    }
  }
}
