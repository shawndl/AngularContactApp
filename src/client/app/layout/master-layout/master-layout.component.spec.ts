///<reference path='../../../../node_modules/@angular/material/button/typings/button-module.d.ts'/>
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLayoutComponent } from './master-layout.component';
import {APP_BASE_HREF} from '@angular/common';
import {
  MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../../app/app-routing.module';
import {AuthorisationModule} from '../../client/authorisation/authorisation.module';
import {ContactsModule} from '../../public/contacts/contacts.module';

describe('MasterLayoutComponent', () => {
  let component: MasterLayoutComponent;
  let fixture: ComponentFixture<MasterLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatToolbarModule,
        MatSidenavModule,
        AppRoutingModule,
        AuthorisationModule,
        ContactsModule
      ],
      declarations: [ MasterLayoutComponent ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
