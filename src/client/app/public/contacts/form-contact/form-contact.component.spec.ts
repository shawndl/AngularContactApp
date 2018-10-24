import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContactComponent } from './form-contact.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ValidationErrorsService} from '../../../services/validation/validation-errors.service';
import {ContactsModule} from '../contacts.module';
import {SharedModule} from '../../../shared/shared.module';
import {AppRoutingModule} from '../../../app/app-routing.module';
import {AuthorisationModule} from '../../../client/authorisation/authorisation.module';
import {RouteTestingModule} from '../../../testing-modules/route-testing-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('FormContactComponentUnitTest', () => {
  let component: FormContactComponent;

  beforeEach(() => {
    component = new FormContactComponent(new FormBuilder(), new ValidationErrorsService());
    component.ngOnInit();
  });

  it('it must have a form field called first name', () => {
    expect(component.contactForm.contains('firstName')).toBeTruthy();
  });

  it('the first name field must be required', () => {
    const control = component.contactForm.get('firstName');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('it must have a form field called last name', () => {
    expect(component.contactForm.contains('lastName')).toBeTruthy();
  });

  it('the last name field must be required', () => {
    const control = component.contactForm.get('lastName');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('it must have a form array named emails', () => {
    expect(component.contactForm.contains('emails')).toBeTruthy();
  });

  it('the emails form array must have a form group with an email', () => {
    expect(component.contactForm.controls.emails.controls[0].contains('email')).toBeTruthy();
  });

  it('the email field must be required', () => {
    const control = component.emailsField.controls[0].get('email');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('the email field must be an email', () => {
    const control = component.emailsField.controls[0].get('email');

    control.setValue('name');

    expect(control.valid).toBeFalsy();
  });

  it('the emails form array must have a form group with an email type', () => {
    expect(component.contactForm.controls.emails.controls[0].contains('emailType')).toBeTruthy();
  });


  it('the email type field must be required', () => {
    const control = component.emailsField.controls[0].get('emailType');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('the phones form array must have a form group with an phone', () => {
    expect(component.contactForm.controls.phones.controls[0].contains('phone')).toBeTruthy();
  });


  it('the phone field must be required', () => {
    const control = component.phonesField.controls[0].get('phone');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });


  it('the phone field must be only numbers', () => {
    const control = component.phonesField.controls[0].get('phone');

    control.setValue('phone number');

    expect(control.valid).toBeFalsy();
  });

  it('the phones form array must have a form group .with an phone type', () => {
    console.log(component.contactForm.controls.emails.controls[0]);
    expect(component.contactForm.controls.phones.controls[0].contains('phoneType')).toBeTruthy();
  });
});

describe('FormContactComponent', () => {
  let component: FormContactComponent;
  let fixture: ComponentFixture<FormContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AppRoutingModule,
        AuthorisationModule,
        RouteTestingModule,
        ContactsModule,
        SharedModule,
        RouterModule,
        BrowserAnimationsModule
      ],
      declarations: [],
      providers: [
        ValidationErrorsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
