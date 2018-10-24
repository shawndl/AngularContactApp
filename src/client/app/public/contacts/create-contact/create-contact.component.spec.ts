import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactComponent } from './create-contact.component';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatGridListModule, MatIconModule,
  MatInputModule, MatRadioModule, MatTooltipModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FormContactComponent} from '../form-contact/form-contact.component';
import {AppRoutingModule} from '../../../app/app-routing.module';
import {ViewContactsComponent} from '../view-contacts/view-contacts.component';
import {ViewContactComponent} from '../view-contact/view-contact.component';
import {LoginComponent} from '../../../client/authorisation/login/login.component';
import {RegisterComponent} from '../../../client/authorisation/register/register.component';
import {EditContactComponent} from '../edit-contact/edit-contact.component';
import {SharedModule} from '../../../shared/shared.module';
import {ValidationErrorsService} from '../../../services/validation/validation-errors.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CreateContactComponent', () => {
  let component: CreateContactComponent;
  let fixture: ComponentFixture<CreateContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateContactComponent,
        FormContactComponent,
        ViewContactsComponent,
        ViewContactComponent,
        LoginComponent,
        RegisterComponent,
        EditContactComponent ],
      imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatTooltipModule,
        MatRadioModule,
        SharedModule],
      providers: [
        ValidationErrorsService,
        {provide: APP_BASE_HREF, useValue : '/' }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
