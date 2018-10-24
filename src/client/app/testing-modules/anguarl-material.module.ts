import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatListModule, MatRadioModule, MatSidenavModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
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
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule
  ]
})
export class AnguarlMaterialModule { }
