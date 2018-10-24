import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/database/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {MongooseUserInterface} from '../../../services/interfaces/mongoose-user-interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  ownerID: string;
  user: MongooseUserInterface;
  constructor(private userService: UsersService,
              private router: ActivatedRoute,
              private snackBar: MatSnackBar,
              private route: Router) { }

  ngOnInit() {
    this.router.params.subscribe(
      data => this.ownerID = data.id
    );
    this.userService.getOne(this.ownerID).subscribe(
      (data) => this.user = data
    );
  }


  /**
   * the contact service will edit an existing contact and return an observable
   * upon success it will display a success message and navigate back to the contacts page
   * upon failure it will display an error
   * @param event
   * @return void
   */
  editUser(event): void {
    this.userService.edit(event, this.user._id).subscribe(
      (data) => {
        this.displayMessage(data);
        this.route.navigate(['/admin/users']);
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
