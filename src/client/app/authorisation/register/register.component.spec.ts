import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule} from '@angular/material';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ValidationErrorsService} from '../../services/validation/validation-errors.service';

describe('RegistrationComponentUnitTest', () => {
  let component: RegisterComponent;

  beforeEach(() => {
    component = new RegisterComponent(new FormBuilder(), new ValidationErrorsService());
    component.ngOnInit();
  });


  it('it must have a form field called first name', () => {
    expect(component.signUpForm.contains('firstName')).toBeTruthy();
  });

  it('the first name field must be required', () => {
    const control = component.signUpForm.get('firstName');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('it must have a form field called last name', () => {
    expect(component.signUpForm.contains('lastName')).toBeTruthy();
  });

  it('the last name field must be required', () => {
    const control = component.signUpForm.get('lastName');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('it must have a form field called email', () => {
    expect(component.signUpForm.contains('email')).toBeTruthy();
  });

  it('the email field must be required', () => {
    const control = component.signUpForm.get('email');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('the email field must be an email', () => {
    const control = component.signUpForm.get('email');

    control.setValue('name');

    expect(control.valid).toBeFalsy();
  });

  it('it must have a form field called phone', () => {
    expect(component.signUpForm.contains('phone')).toBeTruthy();
  });


  it('the phone field must be required', () => {
    const control = component.signUpForm.get('phone');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });


  it('the phone field must be only numbers', () => {
    const control = component.signUpForm.get('phone');

    control.setValue('phone number');

    expect(control.valid).toBeFalsy();
  });


  it('it must have a form field called password', () => {
    expect(component.signUpForm.contains('password')).toBeTruthy();
  });

  it('the password field must be required', () => {
    const control = component.signUpForm.get('password');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('the password field must contain at least one number', () => {
    const control = component.signUpForm.get('password');

    control.setValue('SecretPassword');

    expect(control.valid).toBeFalsy();
  });

  it('the password field must contain at least one capital letter', () => {
    const control = component.signUpForm.get('password');

    control.setValue('secretpassword1');

    expect(control.valid).toBeFalsy();
  });

  it('a password that contains letters, numbers, and capitals must be true', () => {
    const control = component.signUpForm.get('password');

    control.setValue('SecretPassword1');

    expect(control.valid).toBeTruthy();
  });

  it('it must have a form field called password confirmed', () => {
    expect(component.signUpForm.contains('passwordConfirm')).toBeTruthy();
  });

  it('the password confirmed field must be required', () => {
    const control = component.signUpForm.get('passwordConfirm');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('the password confirmed must match the password field', () => {
    const control = component.signUpForm.get('passwordConfirm');
    const password = component.signUpForm.get('password');

    control.setValue('1SecretPassword');
    password.setValue('2SecretPassword');
    component.firstNameField.setValue('Tom');
    component.lastNameField.setValue('Smith');
    component.emailField.setValue('Tom@gmail.com');
    component.phoneField.setValue('09999009');

    expect(component.signUpForm.valid).toBeFalsy();
  });
});


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatButtonModule
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
