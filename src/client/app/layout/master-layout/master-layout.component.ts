import { Component  } from '@angular/core';
import {AuthorisationService} from '../../services/auth/authorisation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss']
})
export class MasterLayoutComponent {
  constructor(public auth: AuthorisationService, private router: Router) {}

  /**
   * determines which icon to display to the use depending on if the sidenav is open or not
   * @param isOpen
   * @return {string|string}
   */
  getMenuIcon(isOpen: boolean): string {
    return (isOpen) ? 'clear' : 'menu';
  }

  /**
   * logs the user out
   * @return {void}
   */
  logOut(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
