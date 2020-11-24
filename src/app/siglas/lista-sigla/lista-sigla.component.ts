import { SiglaFiltro, SiglaService } from './../../zservice/sigla.service';
import { Sigla } from './../../core/model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-sigla',
  templateUrl: './lista-sigla.component.html',
  styleUrls: ['./lista-sigla.component.css']
})
export class ListaSiglaComponent implements OnInit {
  siglas = [];
  sigla: Sigla;
  totalRegistros = 0;
  filtro = new SiglaFiltro();
  camposbusca: any[];
  display = true;
  exclusao = false;

  constructor(private service: SiglaService,
              private route: Router,
              private location: Location) {
              }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Descrição'},
      {label: 'Codigo'}
    ];

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 0);
  }

  Alterar() {
    if (this.sigla?.codigo != null) {
      this.route.navigate(['/listasigla', this.sigla.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.sigla = this.siglas[0];
  }

  UltimaSelecao() {
    this.sigla = this.siglas[this.siglas.length - 1];
  }

  ProximaSelecao() {
    const valor = this.siglas.indexOf(this.sigla);
    this.sigla = this.siglas[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.siglas.indexOf(this.sigla);
    this.sigla = this.siglas[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;
    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.siglas = response.siglas.content;
      }).catch(erro => console.log(erro));
  }

  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;

    setTimeout (() => {
      if (drop === 'Descrição') {
        this.filtro.descricao = texto.value;
        this.Consultar();
      }

      if ((drop === 'Codigo') && (texto.value !== '')) {
        const numero = +texto.value;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.siglas = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }

  AtivarExcluir() {
    if (this.sigla.codigo != null) {
      this.exclusao = true;
    }
  }


  Excluir() {
    this.service.Remover(this.sigla.codigo).then(() => {}).catch(erro => erro);
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
