import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  verifica = false;

  constructor(private router: Router) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  exibindoNavbar() {
    this.verifica = this.router.url !== '/operacoes/captura' && this.router.url !== '/operacoes/editarimagem';

    if (!this.verifica) {
      const conteiner = document.getElementById('container-fluid');
      conteiner.style.padding = '0';
    }

    return this.verifica;
  }
}
