import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonComponent } from './back-button.component';
import {SharedModule} from '../../shared.module';
import {AppRoutingModule} from '../../../app/app-routing.module';
import {AuthorisationModule} from '../../../client/authorisation/authorisation.module';
import {ContactsModule} from '../../../app/public/contacts/contacts.module';
import {RouteTestingModule} from '../../../testing-modules/route-testing-module';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        AppRoutingModule,
        AuthorisationModule,
        ContactsModule, RouteTestingModule
      ],
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
