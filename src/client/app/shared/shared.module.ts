///<reference path='../../../../node_modules/@angular/material/list/typings/list-module.d.ts'/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule, MatPaginatorModule, MatRadioModule,
  MatSidenavModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {BackButtonComponent} from './navigation/back-button/back-button.component';
import { FirstObjectPipe } from './pipes/first-object.pipe';
import { CapitalisePipe } from './pipes/capitalise.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatGridListModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  declarations: [
    BackButtonComponent,
    FirstObjectPipe,
    CapitalisePipe,
    ConfirmDialogComponent
  ],
  providers: [],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatGridListModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    BackButtonComponent,
    FirstObjectPipe,
    CapitalisePipe,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
