import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TextopessoalService, TextoPessoalFiltro } from './../../zservice/textopessoal.service';
import { TextoPessoal } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-textopessoal',
  templateUrl: './lista-textopessoal.component.html',
  styleUrls: ['./lista-textopessoal.component.css']
})
export class ListaTextopessoalComponent implements OnInit {
  textospessoais = [];
  texto: TextoPessoal;
  totalRegistros = 0;
  filtro = new TextoPessoalFiltro();
  camposbusca: any[];
  formulario: FormGroup;
  display = true;
  exclusao = false;

  constructor(private service: TextopessoalService,
              private route: Router,
              private location: Location) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Abreviatura'},
      {label: 'Codigo'}
    ];


    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 0);
  }

  onRowSelect(event) {
    this.texto = event.data;
  }

  Alterar() {
    if (this.texto?.codigo != null) {
      this.route.navigate(['/listatextopessoal', this.texto.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.texto = this.textospessoais[0];
  }

  UltimaSelecao() {
    this.texto = this.textospessoais[this.textospessoais.length - 1];
  }

  ProximaSelecao() {
    const valor = this.textospessoais.indexOf(this.texto);
    this.texto = this.textospessoais[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.textospessoais.indexOf(this.texto);
    this.texto = this.textospessoais[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.textospessoais = response.textopessoals.content;
      }).catch(erro => console.log(erro));
  }


  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;
    setTimeout (() => {
      if (drop === 'Abreviatura') {
        this.filtro.abreviatura = texto.value;
        this.Consultar();
      }

      if ((drop === 'Codigo') && (texto.value !== '')) {
        const numero = +texto.value;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.textospessoais = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }


  AtivarExcluir() {
    if (this.texto.codigo != null) {
      this.exclusao = true;
    }
  }


  Excluir() {
    this.service.Remover(this.texto.codigo).then(() => {}).catch(erro => erro);
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
