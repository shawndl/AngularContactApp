import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' }
    ],
  exports: [
    RouterModule
  ]
})
export class RouteTestingModule { }
