import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactComponent } from './view-contact.component';
import {AnguarlMaterialModule} from '../../../testing-modules/anguarl-material.module';
import {AppRoutingModule} from '../../../app/app-routing.module';
import {RouteComponentModule} from '../../../testing-modules/routes-component.module';
import {EditContactComponent} from '../edit-contact/edit-contact.component';
import {RegisterComponent} from '../../../client/authorisation/register/register.component';
import {LoginComponent} from '../../../client/authorisation/login/login.component';
import {ViewContactsComponent} from '../view-contacts/view-contacts.component';
import {FormContactComponent} from '../form-contact/form-contact.component';
import {CreateContactComponent} from '../create-contact/create-contact.component';
import {BackButtonComponent} from '../../../shared/navigation/back-button/back-button.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouteTestingModule} from '../../../testing-modules/route-testing-module';


describe('ViewContactComponent', () => {
  let component: ViewContactComponent;
  let fixture: ComponentFixture<ViewContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AnguarlMaterialModule,
        RouteTestingModule,
        AppRoutingModule,
        ReactiveFormsModule
      ],
      declarations: [
        ViewContactComponent,
        CreateContactComponent,
        FormContactComponent,
        ViewContactsComponent,
        LoginComponent,
        RegisterComponent,
        EditContactComponent,
        BackButtonComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
