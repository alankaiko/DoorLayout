import { Convenio } from './../../core/model';
import { Router } from '@angular/router';
import { ConvenioFiltro, ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-convenio',
  templateUrl: './lista-convenio.component.html',
  styleUrls: ['./lista-convenio.component.css']
})
export class ListaConvenioComponent implements OnInit {
  convenios = [];
  convenio: Convenio;
  totalRegistros = 0;
  filtro = new ConvenioFiltro();
  camposbusca: any[];
  display = true;
  exclusao = false;

  constructor(private service: ConvenioService,
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
    if (this.convenio?.codigo != null) {
      this.route.navigate(['/listaconvenio', this.convenio.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.convenio = this.convenios[0];
  }

  UltimaSelecao() {
    this.convenio = this.convenios[this.convenios.length - 1];
  }

  ProximaSelecao() {
    const valor = this.convenios.indexOf(this.convenio);
    this.convenio = this.convenios[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.convenios.indexOf(this.convenio);
    this.convenio = this.convenios[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;
    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.convenios = response.convenios.content;
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

      if ((drop === 'Codigo') && (texto.value !== '')) {
        const numero = +texto.value;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.convenios = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }

  AtivarExcluir() {
    if (this.convenio.codigo != null) {
      this.exclusao = true;
    }
  }


  Excluir() {
    this.service.Remover(this.convenio.codigo).then(() => {}).catch(erro => erro);
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
