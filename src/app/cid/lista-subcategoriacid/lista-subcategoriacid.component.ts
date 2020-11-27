import { Subcategoriacid10Service } from './../../zservice/subcategoriacid10.service';
import { Router } from '@angular/router';
import { SubcategoriaCid10 } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';
import { SubcategoriascidFiltro } from '../../zservice/subcategoriacid10.service';


@Component({
  selector: 'app-lista-subcategoriacid',
  templateUrl: './lista-subcategoriacid.component.html',
  styleUrls: ['./lista-subcategoriacid.component.css']
})
export class ListaSubcategoriacidComponent implements OnInit {
  subcategorias = [];
  subcategoria: SubcategoriaCid10;
  totalRegistros = 0;
  filtro = new SubcategoriascidFiltro();
  camposbusca: any[];
  display = true;
  exclusao = false;


  constructor(private service: Subcategoriacid10Service,
              private route: Router,
              private location: Location) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome'},
      {label: 'Codigo'},
      {label: 'Categoria'},
      {label: 'Grupo'},
      {label: 'Assunto/capitulo'}
    ];

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 0);
  }

  onRowSelect(event) {
    this.subcategoria = event.data;
  }

  Alterar() {
    if (this.subcategoria?.codigo != null) {
      this.route.navigate(['/subcategoriacid', this.subcategoria.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.subcategoria = this.subcategorias[0];
  }

  UltimaSelecao() {
    this.subcategoria = this.subcategorias[this.subcategorias.length - 1];
  }

  ProximaSelecao() {
    const valor = this.subcategorias.indexOf(this.subcategoria);
    this.subcategoria = this.subcategorias[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.subcategorias.indexOf(this.subcategoria);
    this.subcategoria = this.subcategorias[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;
    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.subcategorias = response.subcategorias.content;
      }).catch(erro => console.log(erro));
  }


  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;

    setTimeout (() => {
      if ((drop === 'Nome')) {
        this.filtro.codigotexto = undefined;
        this.filtro.nome = texto.value;
        this.Consultar();
      }

      if ((drop === 'Categoria') && (texto.value !== '')) {
        return this.service.BuscarListaPorNomeCategoria(texto.value)
          .then(response => {
            this.subcategorias = response;
          }).catch(erro => console.log(erro));
      }

      if ((drop === 'Codigo')) {
        this.filtro.nome = undefined;
        this.filtro.codigotexto = texto.value;
        this.Consultar();
      }
    }, 1000);
  }

  AtivarExcluir() {
    if (this.subcategoria.codigo != null) {
      this.exclusao = true;
    }
  }


  Excluir() {
    this.service.Remover(this.subcategoria.codigo).then(() => {}).catch(erro => erro);
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
