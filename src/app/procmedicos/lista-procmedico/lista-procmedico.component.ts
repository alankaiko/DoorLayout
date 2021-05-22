import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcedimentomedicoService, ProcedimentoMedicoFiltro } from './../../zservice/procedimentomedico.service';
import { ProcedimentoMedico } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-procmedico',
  templateUrl: './lista-procmedico.component.html',
  styleUrls: ['./lista-procmedico.component.css']
})
export class ListaProcmedicoComponent implements OnInit {
  procedimentos = [];
  procedimento: ProcedimentoMedico;
  totalRegistros = 0;
  filtro = new ProcedimentoMedicoFiltro();
  camposbusca: any[];
  textodocampo: string;
  dropselecionado: string = 'nome';
  formulario: FormGroup;
  display = true;
  exclusao = false;

  constructor(private service: ProcedimentomedicoService,
              private route: Router,
              private location: Location) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome', value: 'nome'},
      {label: 'Grupo', value: 'grupo'},
      {label: 'Codigo', value: 'codigo'}
    ];
  }

  onRowSelect(event) {
    this.procedimento = event.data;
  }

  Alterar() {
    if (this.procedimento.codigo != null) {
      this.route.navigate(['/listaexameprocmedico', this.procedimento.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.procedimento = this.procedimentos[0];
  }

  UltimaSelecao() {
    this.procedimento = this.procedimentos[this.procedimentos.length - 1];
  }

  ProximaSelecao() {
    const valor = this.procedimentos.indexOf(this.procedimento);
    this.procedimento = this.procedimentos[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.procedimentos.indexOf(this.procedimento);
    this.procedimento = this.procedimentos[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.procedimentos = response.procedimentos.content;
      }).catch(erro => console.log(erro));
  }

  BuscaDinamica() {
    setTimeout (() => {
      if (this.dropselecionado === 'nome') {
        this.filtro.nome = this.textodocampo;
        this.Consultar();
      }

      if ((this.dropselecionado === 'codigo') && (this.textodocampo !== '')) {
        const numero = +this.textodocampo;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.procedimentos = response;
          }).catch(erro => console.log(erro));
      }

      if ((this.dropselecionado === 'grupo') && (this.textodocampo !== '')) {
        this.service.BuscarListaPorGrupoNomeGrupo(this.textodocampo)
          .then(response => {
            this.procedimentos = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }


  AtivarExcluir() {
    if (this.procedimento.codigo != null) {
      this.exclusao = true;
    }
  }


  Excluir() {
    this.service.Remover(this.procedimento.codigo).then(() => {}).catch(erro => erro);
    this.exclusao = false;
    setTimeout (() => this.Consultar(), 100);
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}

