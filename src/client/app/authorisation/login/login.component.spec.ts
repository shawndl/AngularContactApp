import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule} from '@angular/material';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LogInComponentUnitTest', () => {
  let component: LoginComponent;

  beforeEach(() => {
    component = new LoginComponent(new FormBuilder());
    component.ngOnInit();
  });

  it('it must have a form field called email', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
  });

  it('the email field must be required', () => {
    const control = component.loginForm.get('email');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('the email field must be an email', () => {
    const control = component.loginForm.get('email');

    control.setValue('name');

    expect(control.valid).toBeFalsy();
  });


  it('it must have a form field called password', () => {
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('the password field must be required', () => {
    const control = component.loginForm.get('password');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
