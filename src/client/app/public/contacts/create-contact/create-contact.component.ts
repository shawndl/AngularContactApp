import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../../services/database/contacts.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  constructor(private contactService: ContactsService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  /**
   * the contact service will create a new contact and return an observable
   * upon success it will display a success message and navigate back to the contacts page
   * upon failure it will display an error
   * @param event
   * @return void
   */
  createContact(event): void {
    this.contactService.createContact(event).subscribe(
      (data) => {
        this.displayMessage(data);
        this.router.navigate(['/contacts']);
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error.error);
      }
    );
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
