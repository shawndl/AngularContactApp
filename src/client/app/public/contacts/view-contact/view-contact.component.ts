import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsService} from '../../../services/database/contacts.service';
import {MongooseContactInterface} from '../../../services/interfaces/mongoose-contact-interface';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {
  ownerID: string;
  contact: MongooseContactInterface;
  constructor(private contactService: ContactsService,
              private router: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private route: Router) { }

  ngOnInit() {
    this.router.params.subscribe(
      data => this.ownerID = data.id
    );
    this.contactService.getOne(this.ownerID).subscribe(
      (data) => this.contact = data
    );
  }

  /**
   * deletes a single contact
   * @return {void}
   */
  onDelete(): void {
    const deleteTitle = 'Delete ' +
      this.contact.firstName + ' ' +
      this.contact.lastName + '' +
      ' from your contact list?';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: deleteTitle,
        confirm: 'Delete' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactService.delete(this.contact._id).subscribe(
          data => {
            this.displayMessage(data);
            this.route.navigate(['/contacts']);
          }
        );
      }
    });
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
