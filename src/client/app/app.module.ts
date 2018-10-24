import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from './layout/layout.module';
import {AuthorisationModule} from './authorisation/authorisation.module';
import {ContactsModule} from './public/contacts/contacts.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthTokenInjectorService} from './services/interceptors/auth-token-injector.service';
import {AuthGuard} from './services/guards/auth.guard';
import {AuthorisationService} from './services/auth/authorisation.service';
import { APP_CONFIG, CONFIG} from './config/ValueProvider';
import {UsersModule} from './admin/users/users.module';
import {AdminGuard} from './services/guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthorisationModule,
    ContactsModule,
    UsersModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInjectorService,
      multi: true
    },
    AuthGuard,
    AdminGuard,
    AuthorisationService,
    {provide: APP_CONFIG, useValue: CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
