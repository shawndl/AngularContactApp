import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../../services/database/contacts.service';
import {ContactInterface} from '../../../services/interfaces/contact-interface';
import {PaginationInterface} from '../../../services/interfaces/pagination-interface';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {MongooseContactInterface} from '../../../services/interfaces/mongoose-contact-interface';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.scss']
})
export class ViewContactsComponent implements OnInit {
  contacts: MongooseContactInterface[];
  pagination: PaginationInterface = {
    limit: 20,
    offset: 0,
    total: 0
  };
  constructor(private contactsService: ContactsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.setContacts();
  }

  /**
   * sets the contacts property and the pagination from an api call
   * @return void
   */
  setContacts(): void {
    this.contacts = null;
    this.contactsService.getContacts(this.pagination.limit, this.pagination.offset).subscribe((data) => {
        this.contacts = data.docs;
        this.pagination = {
          total: data.total,
          offset: data.offset,
          limit: data.limit
        };
      }
    );
  }

  /**
   * deletes a single contact
   * @return {void}
   */
  onDelete(contact: MongooseContactInterface): void {
    const deleteTitle = 'Delete ' +
      contact.firstName + ' ' +
      contact.lastName + '' +
      ' from your contact list?';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: deleteTitle,
        confirm: 'Delete' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactsService.delete(contact._id).subscribe(
          data => {
            this.setContacts();
            this.displayMessage(data);
          }
        );
      }
    });
  }

  /**
   * refreshes the contacts on pagination
   * @param page
   * @return void
   */
  refreshContacts(page): void {
    this.pagination.limit = page.pageSize;
    this.pagination.offset = page.pageIndex;
    this.setContacts();
  }

  /**
   * displays a message to the user
   * @param message
   * @return {void}
   */
  private displayMessage(message): void {
    setTimeout(() => {
      this.snackBar.open(message, 'Cancel', {
        duration: 5000
      });
    });
  }

}
