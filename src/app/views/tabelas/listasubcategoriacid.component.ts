import { Subcategoriacid10Service } from './../../zservice/subcategoriacid10.service';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { TextopessoalService, TextoPessoalFiltro } from './../../zservice/textopessoal.service';
import { TextoPessoal, SubcategoriaCid10 } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, SelectItem } from 'primeng/api';
import { SubcategoriascidFiltro } from '../../zservice/subcategoriacid10.service';

@Component({
  templateUrl: 'Listasubcategoriacid.component.html',
  styleUrls: ['./Listasubcategoriacid.component.css']
})
export class ListasubcategoriacidComponent implements OnInit {
  subcategorias = [];
  subcategoria: SubcategoriaCid10;
  totalRegistros = 0;
  filtro = new SubcategoriascidFiltro();
  visible: boolean = true;
  camposbusca: any[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: Subcategoriacid10Service,
              private route: Router) { }

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
      this.route.navigate(['/operacoes/subcategoriacid', this.subcategoria.codigo]);
    }
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
        this.filtro.nome = texto.value;
        this.Consultar();
      }

      if ((drop === 'Categoria') && (texto.value !== '')) {
        return this.service.BuscarListaPorNomeCategoria(texto.value)
          .then(response => {
            this.subcategorias = response;
          }).catch(erro => console.log(erro));
      }

      if ((drop === 'Codigo') && (texto.value !== '')) {
        const numero = +texto.value;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.subcategorias = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }

  AtivarExcluir() {
    this.exclusao = true;
  }


  Excluir() {
    this.service.Remover(this.subcategoria.codigo)
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

  Fechar() {
    this.route.navigate(['/dashboard']);
  }
}
