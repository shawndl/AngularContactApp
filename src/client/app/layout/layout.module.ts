import { NgModule } from '@angular/core';
import {
  MatIconModule, MatListModule, MatButtonModule,
  MatTooltipModule, MatToolbarModule, MatSidenavModule
} from '@angular/material';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import {SharedModule} from '../shared/shared.module';
import {AuthorisationService} from '../services/auth/authorisation.service';
import { PageErrorComponent } from './page-error/page-error.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    MasterLayoutComponent,
    PageErrorComponent
  ],
  exports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MasterLayoutComponent,
    PageErrorComponent
  ],
  providers: [
    AuthorisationService
  ]
})
export class LayoutModule { }
