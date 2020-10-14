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

  naoExibeImagem() {
    return this.router.url !== '/operacoes/laudos-teste';
  }

  exibirLogo() {
    return this.router.url === '/dashboard' || this.router.url === '/';
  }

  exibindoNavbar() {
    return this.router.url !== '/operacoes/captura'
      && this.router.url.indexOf('/operacoes/laudos-teste')
      && this.router.url !== '/operacoes/laudos-teste'
      && this.router.url !== '/operacoes/laudos';
  }

  exibirRodape() {
    return this.router.url.indexOf('/viewer')
      && this.router.url.indexOf('/operacoes/laudos-teste')
      && this.router.url !== '/operacoes/captura'
      && this.router.url !== '/operacoes/laudos';
  }

}
