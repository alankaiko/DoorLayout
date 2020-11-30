import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DoorLayout';

  constructor(private router: Router) {}

  ExibindoNavbar() {
    return this.router.url.indexOf('/operacoes/laudos')
      && this.router.url.indexOf('/operacoes/captura')
      && this.router.url.indexOf('/viewer');
  }

  ExibirRodape() {
    return this.router.url.indexOf('/operacoes/laudos')
      && this.router.url.indexOf('/operacoes/captura')
      && this.router.url.indexOf('/viewer');
  }
}
