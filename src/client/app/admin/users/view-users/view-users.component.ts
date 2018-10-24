import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UsersService} from '../../../services/database/users.service';
import {MongooseUserInterface} from '../../../services/interfaces/mongoose-user-interface';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {PaginationInterface} from '../../../services/interfaces/pagination-interface';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  users: MongooseUserInterface[];
  pagination: PaginationInterface = {
    limit: 20,
    offset: 0,
    total: 0
  };
  constructor(private userService: UsersService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.setUsers();
  }

  /**
   * sets the users property and the pagination from an api call
   * @return void
   */
  setUsers(): void {
    this.users = null;
    this.userService.all(this.pagination.limit, this.pagination.offset).subscribe(
      (data) => {
        this.users = data.docs;
        this.pagination = {
          total: data.total,
          offset: data.offset,
          limit: data.limit
        };
      }
    );
  }

  /**
   * deletes a single user
   * @return {void}
   */
  onDelete(user: MongooseUserInterface): void {
    const deleteTitle = 'Delete ' +
      user.firstName + ' ' +
      user.lastName + '' +
      ' from your contact list?';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: deleteTitle,
        confirm: 'Delete' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(user._id).subscribe(
          data => {
            this.setUsers();
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
  refreshUsers(page): void {
    this.pagination.limit = page.pageSize;
    this.pagination.offset = page.pageIndex;
    this.setUsers();
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
