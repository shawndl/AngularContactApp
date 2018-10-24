import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { FormUserComponent } from './form-user/form-user.component';
import {UsersService} from '../../services/database/users.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
  CreateUserComponent,
  EditUserComponent,
  ViewUsersComponent,
  FormUserComponent
  ],
  exports: [
    CreateUserComponent,
    EditUserComponent,
    ViewUsersComponent,
    FormUserComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
