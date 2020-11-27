import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Dicom', routerLink: ['servidor/listagem']
      },
      {
        label: 'Cadastros',
        items: [
          {label: 'Convênio', icon: 'fa fa-fw fa-cubes', routerLink: ['listaconvenio']},
          {label: 'Proc. Médicos', icon: 'fa fa-fw fa-cubes', routerLink: ['listaexameprocmedico']},
          {label: 'Pacientes', icon: 'fa fa-fw fa-cubes', routerLink: ['listapaciente']},
          {label: 'Prof. Executantes', icon: 'fa fa-fw fa-cubes', routerLink: ['listaprofexecutante']},
          {label: 'Prof. Solicitantes', icon: 'fa fa-fw fa-cubes', routerLink: ['listaprofsolicitante']},
          {label: 'Textos Pessoal', icon: 'fa fa-fw fa-cubes', routerLink: ['listatextopessoal']}
        ]
      },
      {
        label: 'Operações',
        items: [
          {label: 'Atendimento', icon: 'fa fa-fw fa-file-image-o', routerLink: ['operacoes/atendimento']},
          {label: 'Laudo', icon: 'fa fa-fw fa-file-image-o', routerLink: ['operacoes/laudos']},
          {label: 'Captura', icon: 'fa fa-fw fa-file-image-o', routerLink: ['operacoes/captura']}
        ]
      },
      {
        label: 'Relatórios',
        items: [
          {label: 'Convênio', icon: 'fa fa-fw fa-file-image-o', routerLink: ['laudos']},
          {label: 'Prof. Executante', icon: 'fa fa-fw fa-file-image-o', routerLink: ['captura']}
        ]
      },
      {
        label: 'Ferramentas',
        items: [
          {label: 'Licenciados', icon: 'fa fa-fw fa-file-image-o', routerLink: ['listalicenciado']},
          {label: 'Estados', icon: 'fa fa-fw fa-file-image-o', routerLink: ['listaestado']},
          {label: 'Siglas', icon: 'fa fa-fw fa-file-image-o', routerLink: ['listasigla']}
        ]
      }
    ];
  }

}
