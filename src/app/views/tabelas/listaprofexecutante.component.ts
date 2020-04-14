import { FormGroup } from '@angular/forms';
import { ProfissionalexecutanteService, ProfissionalExecutanteFiltro } from './../../zservice/profissionalexecutante.service';
import { Router } from '@angular/router';
import { ProfissionalExecutante } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';

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
  camposbusca: SelectItem[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: ProfissionalexecutanteService,
              private route: Router) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome', value: {id: 1, name: 'Nome', code: '1'}},
      {label: 'Num Conselho', value: {id: 2, name: 'Num Conselho', code: '2'}}
    ];

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
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


  ConfigurarVariavel(event) {
    const texto = document.getElementById('buscando') as HTMLInputElement;
    this.filtro.nome = texto.value;
    this.Consultar();

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
