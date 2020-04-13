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
  camposbusca: SelectItem[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: Subcategoriacid10Service,
              private route: Router) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome', value: {id: 1, name: 'Nome', code: '1'}},
      {label: 'Codigo', value: {id: 2, name: 'Codigo', code: '2'}},
      {label: 'Categoria', value: {id: 1, name: 'Categoria', code: '3'}},
      {label: 'Grupo', value: {id: 2, name: 'Grupo', code: '4'}},
      {label: 'Assunto/capitulo', value: {id: 1, name: 'Assunto/capitulo', code: '5'}}
    ];
  }

  onRowSelect(event) {
    this.subcategoria = event.data;
  }

  Alterar() {
    if (this.subcategoria?.codigo != null) {
      this.route.navigate(['/operacoes/listasubcategoriacid', this.subcategoria.codigo]);
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


  ConfigurarVariavel(event) {
    const texto = document.getElementById('buscando') as HTMLInputElement;
    this.filtro.nome = texto.value;
    this.Consultar();

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
}
