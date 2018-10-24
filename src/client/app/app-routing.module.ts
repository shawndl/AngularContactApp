import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './authorisation/login/login.component';
import {RegisterComponent} from './authorisation/register/register.component';
import {ViewContactsComponent} from './public/contacts/view-contacts/view-contacts.component';
import {CreateContactComponent} from './public/contacts/create-contact/create-contact.component';
import {EditContactComponent} from './public/contacts/edit-contact/edit-contact.component';
import {ViewContactComponent} from './public/contacts/view-contact/view-contact.component';
import {AuthGuard} from './services/guards/auth.guard';
import {ViewUsersComponent} from './admin/users/view-users/view-users.component';
import {CreateUserComponent} from './admin/users/create-user/create-user.component';
import {EditUserComponent} from './admin/users/edit-user/edit-user.component';
import {PageErrorComponent} from './layout/page-error/page-error.component';
import {AdminGuard} from "./services/guards/admin.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'contacts/create',
    component: CreateContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts/:id',
    component: ViewContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts/:id/edit',
    component: EditContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    component: ViewContactsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/users',
    children: [
      {
        path: '',
        component: ViewUsersComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'create',
        component: CreateUserComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: ':id/edit',
        component: EditUserComponent,
        canActivate: [AuthGuard, AdminGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageErrorComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
