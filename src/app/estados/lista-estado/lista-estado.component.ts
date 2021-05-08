import { EstadosFiltro, EstadosService } from './../../zservice/estados.service';
import { Estado } from './../../core/model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-estado',
  templateUrl: './lista-estado.component.html',
  styleUrls: ['./lista-estado.component.css']
})
export class ListaEstadoComponent implements OnInit {
  estados = [];
  estado: Estado;
  totalRegistros = 0;
  filtro = new EstadosFiltro();
  camposbusca: any[];
  display = true;
  exclusao = false;

  constructor(private service: EstadosService,
              private route: Router,
              private location: Location) {
              }

  ngOnInit() {
    this.camposbusca = [
      {label: 'UF'},
      {label: 'Descrição'},
      {label: 'Codigo'}
    ];
  }

  Alterar() {
    if (this.estado?.codigo != null) {
      this.route.navigate(['/listaestado', this.estado.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.estado = this.estados[0];
  }

  UltimaSelecao() {
    this.estado = this.estados[this.estados.length - 1];
  }

  ProximaSelecao() {
    const valor = this.estados.indexOf(this.estado);
    this.estado = this.estados[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.estados.indexOf(this.estado);
    this.estado = this.estados[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;
    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.estados = response.estados.content;
      }).catch(erro => console.log(erro));
  }

  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;

    setTimeout (() => {
      if (drop === 'UF') {
        this.filtro.uf = texto.value;
        this.Consultar();
      }

      if (drop === 'Descrição') {
        this.filtro.descricao = texto.value;
        this.Consultar();
      }

      if ((drop === 'Codigo') && (texto.value !== '')) {
        const numero = +texto.value;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.estados = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }

  AtivarExcluir() {
    if (this.estado.codigo != null) {
      this.exclusao = true;
    }
  }


  Excluir() {
    this.service.Remover(this.estado.codigo).then(() => {}).catch(erro => erro);
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
