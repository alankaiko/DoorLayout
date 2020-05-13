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

  constructor(private router: Router) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  exibirLogo() {
    return this.router.url === '/dashboard' || this.router.url === '/';
  }

  exibindoNavbar() {
    return this.router.url !== '/operacoes/captura';
  }

  exibirRodape() {
    return this.router.url.indexOf('/viewer') && this.router.url !== '/operacoes/captura';
  }

}
