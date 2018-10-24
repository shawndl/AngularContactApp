import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { FormContactComponent } from './form-contact/form-contact.component';
import { ViewContactsComponent } from './view-contacts/view-contacts.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import {ValidationErrorsService} from '../../services/validation/validation-errors.service';
import {SharedModule} from '../../shared/shared.module';
import {ContactsService} from '../../services/database/contacts.service';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    CreateContactComponent,
    EditContactComponent,
    FormContactComponent,
    ViewContactsComponent,
    ViewContactComponent
  ],
  providers: [
    ValidationErrorsService,
    ContactsService
  ],
  exports: [
    CreateContactComponent,
    EditContactComponent,
    FormContactComponent,
    ViewContactsComponent,
    ViewContactComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class ContactsModule { }
