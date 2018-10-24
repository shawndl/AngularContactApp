import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from '../../services/validators/password-validators';
import {PasswordMatchesMatcher} from '../../services/error-state-matchers/password-matches-matchers';
import {ValidationErrorsService} from '../../services/validation/validation-errors.service';
import {Router} from '@angular/router';
import {AuthorisationService} from '../../services/auth/authorisation.service';
import {LoginInService} from '../../services/auth/login-in.service';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ValidationErrorsService]
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  firstNameField: FormControl;
  lastNameField: FormControl;
  emailField: FormControl;
  phoneField: FormControl;
  passwordField: FormControl;
  passwordConfirmField: FormControl;
  passwordMatches = new PasswordMatchesMatcher();
  emailError: string;
  constructor(private formBuilder: FormBuilder,
              public validatorErrors: ValidationErrorsService,
              private loginService: LoginInService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.buildForm();
  }

  /**
   * builds the registration form property
   * @return{void}
   */
  private buildForm(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, Validators.required),
      lastName:  this.formBuilder.control(null, Validators.required),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      phone: this.formBuilder.control(null, [Validators.required, Validators.pattern('[1-90]+')]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(6),
        Validators.pattern('^(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z1-90!@#$%^&*]+$')]),
      passwordConfirm: this.formBuilder.control(null, [Validators.required])
    }, {
      validator: PasswordValidators.MatchPassword()
    });
    this.setControlProperties();
  }

  /**
   * sets the property control values
   * @return {void}
   */
  private setControlProperties(): void {
    this.firstNameField = <FormControl>this.signUpForm.get('firstName');
    this.lastNameField = <FormControl>this.signUpForm.get('lastName');
    this.emailField = <FormControl>this.signUpForm.get('email');
    this.phoneField = <FormControl>this.signUpForm.get('phone');
    this.passwordField = <FormControl>this.signUpForm.get('password');
    this.passwordConfirmField = <FormControl>this.signUpForm.get('passwordConfirm');
  }

  /**
   * if there are no validation errors it will perform an ajax request to the server requesting a new user be added
   * @return {void}
   */
  onSubmitForm(): void {
    if (this.signUpForm.valid) {
      this.loginService.register(this.signUpForm.value).subscribe(
        (data) => {
          this.displayMessage(data);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error.error);
          this.emailError = error.error;
        }

      );
    }
  }

  /**
   * displays a message to the user
   * @param message
   * @return {void}
   */
  private displayMessage(message): void {
    setTimeout(() => {
      this.snackBar.open(message, 'Cancel', {
        duration: 5000
      });
    });
  }

}
