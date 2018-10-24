import { Component } from '@angular/core';
import { MatIcon } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * determines which icon to display to the use depending on if the sidenav is open or not
   * @param isOpen
   * @return {string|string}
   */
  getMenuIcon(isOpen: boolean): string {
    return (isOpen) ? 'clear' : 'menu';
  }
}
