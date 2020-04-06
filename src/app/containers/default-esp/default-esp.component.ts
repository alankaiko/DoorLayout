import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-esp.component.html',
  styleUrls: ['./default-esp.component.css']
})
export class DefaultEspComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  verifica = false;

  constructor(private router: Router) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}
