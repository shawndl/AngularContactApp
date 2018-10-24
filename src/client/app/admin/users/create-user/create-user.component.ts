import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/database/users.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private userService: UsersService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  /**
   * makes an api call to create a new user
   * @param event
   */
  createUser(event): void {
    this.userService.createUser(event).subscribe(
      (data) => {
        this.displayMessage(data);
        this.router.navigate(['/admin/users']);
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
