import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrupoprocedimentoService, GrupoProcedimentoFiltro } from './../../zservice/grupoprocedimento.service';
import { Router } from '@angular/router';
import { GrupoProcedimento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, SelectItem } from 'primeng/api';

@Component({
  templateUrl: 'listagrupoexame.component.html',
  styleUrls: ['./listagrupoexame.component.css']
})
export class ListagrupoexameComponent implements OnInit {
  grupos = [];
  grupo: GrupoProcedimento;
  totalRegistros = 0;
  filtro = new GrupoProcedimentoFiltro();
  visible: boolean = true;
  camposbusca: SelectItem[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: GrupoprocedimentoService,
              private route: Router) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome', value: {id: 1, name: 'Nome', code: '1'}},
      {label: 'Codigo', value: {id: 2, name: 'Codigo', code: '2'}}
    ];
  }

  onRowSelect(event) {
    this.grupo = event.data;
  }

  Alterar() {
    if (this.grupo?.codigo != null) {
      this.route.navigate(['/tabelas/listagrupoexame', this.grupo.codigo]);
    }
  }


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.grupos = response.grupoprocedimentos.content;
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
    this.service.Remover(this.grupo.codigo)
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
