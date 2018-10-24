import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactsComponent } from './view-contacts.component';
import {ContactsModule} from '../contacts.module';
import {RouteTestingModule} from '../../../testing-modules/route-testing-module';
import {AppRoutingModule} from '../../../app/app-routing.module';
import {AuthorisationModule} from '../../../client/authorisation/authorisation.module';
import {RouterModule} from '@angular/router';

describe('ViewContactsComponent', () => {
  let component: ViewContactsComponent;
  let fixture: ComponentFixture<ViewContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ContactsModule,
        RouteTestingModule,
        AppRoutingModule,
        AuthorisationModule,
        RouterModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
