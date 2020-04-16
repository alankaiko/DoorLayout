import { FormGroup } from '@angular/forms';
import { ProfissionalexecutanteService, ProfissionalExecutanteFiltro } from './../../zservice/profissionalexecutante.service';
import { Router } from '@angular/router';
import { ProfissionalExecutante } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'listaprofexecutante.component.html',
  styleUrls: ['./listaprofexecutante.component.css']
})
export class ListaprofexecutanteComponent implements OnInit {
  profissionaisexec = [];
  profissional: ProfissionalExecutante;
  totalRegistros = 0;
  filtro = new ProfissionalExecutanteFiltro();
  visible: boolean = true;
  camposbusca: any[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: ProfissionalexecutanteService,
              private route: Router) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome'},
      {label: 'Num Conselho'}
    ];

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 0);
  }

  onRowSelect(event) {
    this.profissional = event.data;
  }

  Alterar() {
    if (this.profissional?.codigo != null) {
      this.route.navigate(['/tabelas/listaprofexecutante', this.profissional.codigo]);
    }
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.profissionaisexec = response.profissionalexecutantes.content;
      }).catch(erro => console.log(erro));
  }


  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;

    setTimeout (() => {
      if (drop === 'Nome') {
        this.filtro.nome = texto.value;
        this.Consultar();
      }

      if ((drop === 'Num Conselho') && (texto.value !== '')) {
        return this.service.BuscarListaPorId(texto.value)
          .then(response => {
            this.profissionaisexec = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }

  AtivarExcluir() {
    this.exclusao = true;
  }


  Excluir() {
    this.service.Remover(this.profissional.codigo)
      .then(() => {})
      .catch(erro => erro);
      this.exclusao = false;
      setTimeout (() => this.Consultar(), 0
      );
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

  Fechar() {
    this.route.navigate(['/dashboard']);
  }
}
