import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcedimentomedicoService, ProcedimentoMedicoFiltro } from './../../zservice/procedimentomedico.service';
import { ProcedimentoMedico } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';

@Component({
  templateUrl: 'listaexameprocmedico.component.html',
  styleUrls: ['./listaexameprocmedico.component.css']
})
export class ListaexameprocmedicoComponent implements OnInit {
  procedimentos = [];
  procedimento = new ProcedimentoMedico();
  totalRegistros = 0;
  filtro = new ProcedimentoMedicoFiltro();
  visible: boolean = true;
  camposbusca: SelectItem[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: ProcedimentomedicoService,
              private route: Router) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome', value: {id: 1, name: 'Nome', code: '1'}},
      {label: 'Grupo', value: {id: 2, name: 'Grupo', code: '2'}},
      {label: 'Codigo', value: {id: 3, name: 'Codigo', code: '3'}}
    ];
  }

  onRowSelect(event) {
    this.procedimento = event.data;
  }

  Alterar() {
    if (this.procedimento.codigo != null) {
      this.route.navigate(['/tabelas/listaexameprocmedico', this.procedimento.codigo]);
    }
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.procedimentos = response.procedimentos.content;
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
    this.service.Remover(this.procedimento.codigo)
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
}

