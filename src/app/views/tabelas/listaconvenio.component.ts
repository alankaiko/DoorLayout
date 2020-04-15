import {  FormGroup } from '@angular/forms';
import { Convenio } from './../../core/model';
import { Router } from '@angular/router';
import { ConvenioFiltro, ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';


@Component({
  templateUrl: 'listaconvenio.component.html',
  styleUrls: ['./listaconvenio.component.css']
})
export class ListaconvenioComponent implements OnInit {
  convenios = [];
  convenio: Convenio;
  totalRegistros = 0;
  filtro = new ConvenioFiltro();
  visible: boolean = true;
  camposbusca: any[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;


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

  onRowSelect(event) {
    this.convenio = event.data;
  }

  Alterar() {
    if (this.convenio?.codigo != null) {
      this.route.navigate(['/tabelas/listaconvenio', this.convenio.codigo]);
    }
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
    }, 0);
  }

  AtivarExcluir() {
    this.exclusao = true;
  }


  Excluir() {
    this.service.Remover(this.convenio.codigo)
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

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/dashboard']);
  }
}
