import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../../services/database/contacts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {MongooseContactInterface} from '../../../services/interfaces/mongoose-contact-interface';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  ownerID: string;
  contact: MongooseContactInterface;
  constructor(private contactService: ContactsService,
              private router: ActivatedRoute,
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
   * the contact service will edit an existing contact and return an observable
   * upon success it will display a success message and navigate back to the contacts page
   * upon failure it will display an error
   * @param event
   * @return void
   */
  editContact(event): void {
    this.contactService.edit(event, this.contact._id).subscribe(
      (data) => {
        this.displayMessage(data);
        this.route.navigate(['/contacts']);
      },
      (error) => {
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
