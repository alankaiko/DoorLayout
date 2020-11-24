import { GrupoProcedimentoFiltro, GrupoprocedimentoService } from './../../zservice/grupoprocedimento.service';
import { GrupoProcedimento } from './../../core/model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-grupoexame',
  templateUrl: './lista-grupoexame.component.html',
  styleUrls: ['./lista-grupoexame.component.css']
})
export class ListaGrupoexameComponent implements OnInit {
  grupos = [];
  grupo: GrupoProcedimento;
  totalRegistros = 0;
  filtro = new GrupoProcedimentoFiltro();
  camposbusca: any[];
  display = true;
  exclusao = false;

  constructor(private service: GrupoprocedimentoService,
              private route: Router,
              private location: Location) {
              }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome'},
      {label: 'Codigo'}
    ];

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 0);
  }

  Alterar() {
    if (this.grupo?.codigo != null) {
      this.route.navigate(['/listagrupoexame', this.grupo.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.grupo = this.grupos[0];
  }

  UltimaSelecao() {
    this.grupo = this.grupos[this.grupos.length - 1];
  }

  ProximaSelecao() {
    const valor = this.grupos.indexOf(this.grupo);
    this.grupo = this.grupos[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.grupos.indexOf(this.grupo);
    this.grupo = this.grupos[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;
    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.grupos = response.grupoprocedimentos.content;
      }).catch(erro => console.log(erro));
  }

  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;

    setTimeout (() => {
      if (drop === 'Nome') {
        this.filtro.nomegrupo = texto.value;
        this.Consultar();
      }

      if ((drop === 'Codigo') && (texto.value !== '')) {
        const numero = +texto.value;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.grupos = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }

  AtivarExcluir() {
    if (this.grupo.codigo != null) {
      this.exclusao = true;
    }
  }


  Excluir() {
    this.service.Remover(this.grupo.codigo).then(() => {}).catch(erro => erro);
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
