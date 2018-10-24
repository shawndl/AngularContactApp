import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {LoginInService} from '../../services/auth/login-in.service';
import {AuthorisationService} from '../../services/auth/authorisation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailField: FormControl;
  passwordField: FormControl;
  responseError: string;
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginInService,
              private auth: AuthorisationService,
              private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  /**
   * builds the userForm property
   * @return{void}
   */
  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, Validators.required)
    });
    this.setControlProperties();
  }

  /**
   * sets the property control values
   * @return {void}
   */
  private setControlProperties(): void {
    this.emailField = <FormControl>this.loginForm.get('email');
    this.passwordField = <FormControl>this.loginForm.get('password');
  }

  /**
   * gets validation errors for the email form field
   * @return {string|string|string}
   */
  getEmailErrors(): string {
    return this.emailField.hasError('required') ? 'You must enter an email address' :
      this.emailField.hasError('email') ? 'Not a valid email' :
        '';
  }

  /**
   * gets validation errors for the user name form field
   * @return {string|string|string}
   */
  getPasswordErrors(): string {
    return this.passwordField.hasError('required') ? 'You must enter a username' : '';
  }

  /**
   * if there are no validation errors it will emit an event to the app component class
   * @return {void}
   */
  onSubmitForm(): void {
    if (this.loginForm.valid) {
      this.responseError = null;
      this.loginService.authenticate(this.loginForm.value).subscribe(
        (data) =>  {
          console.log(data);
          this.auth.setToken(data.token);
          this.auth.setAdmin(data.isAdmin);
          this.router.navigate(['/contacts']);
        }, (error) => {
          console.log('An error occurred');
          console.log(error);
          this.responseError = error.error;
        }
      );
    }
  }
}
