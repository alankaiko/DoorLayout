import { LicenciadoFiltro, LicenciadoService } from './../../zservice/licenciado.service';
import { Licenciado } from './../../core/model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-licenciado',
  templateUrl: './lista-licenciado.component.html',
  styleUrls: ['./lista-licenciado.component.css']
})
export class ListaLicenciadoComponent implements OnInit {
  licenciados = [];
  licenciado: Licenciado;
  totalRegistros = 0;
  filtro = new LicenciadoFiltro();
  camposbusca: any[];
  display = true;
  exclusao = false;

  constructor(private service: LicenciadoService,
              private route: Router,
              private location: Location) {
              }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Licenciado'},
      {label: 'Código'}
    ];

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 0);
  }

  Alterar() {
    if (this.licenciado?.codigo != null) {
      this.route.navigate(['/listalicenciado', this.licenciado.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.licenciado = this.licenciados[0];
  }

  UltimaSelecao() {
    this.licenciado = this.licenciados[this.licenciados.length - 1];
  }

  ProximaSelecao() {
    const valor = this.licenciados.indexOf(this.licenciado);
    this.licenciado = this.licenciados[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.licenciados.indexOf(this.licenciado);
    this.licenciado = this.licenciados[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;
    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.licenciados = response.licenciados.content;
      }).catch(erro => console.log(erro));
  }

  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;

    setTimeout (() => {
      if (drop === 'Licenciado') {
        this.filtro.licenciadopara = texto.value;
        this.Consultar();
      }

      if ((drop === 'Codigo') && (texto.value !== '')) {
        const numero = +texto.value;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.licenciados = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }

  AtivarExcluir() {
    if (this.licenciado.codigo != null) {
      this.exclusao = true;
    }
  }


  Excluir() {
    this.service.Remover(this.licenciado.codigo).then(() => {}).catch(erro => erro);
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
