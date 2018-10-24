import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatButtonModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UsersService} from '../services/database/users.service';
import {LoginInService} from '../services/auth/login-in.service';
import {AuthorisationService} from '../services/auth/authorisation.service';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    UsersService,
    LoginInService,
    AuthorisationService
  ]
})
export class AuthorisationModule { }
