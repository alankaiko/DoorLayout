import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { AbreviaturaService, AbreviaturaFiltro } from './../../zservice/abreviatura.service';
import { Abreviatura } from './../../core/model';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'listaabreviatura.component.html',
  styleUrls: ['./listaabreviatura.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaabreviaturaComponent implements OnInit {
  abreviaturas = [];
  totalRegistros = 0;
  filtro = new AbreviaturaFiltro();
  visible: boolean = true;

  constructor(private service: AbreviaturaService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() { }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.abreviaturas = response.abreviaturas.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(abreviatura: Abreviatura) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + abreviatura.titulo.toUpperCase(),
      accept: () => {
        this.Excluir(abreviatura);
      }
    });
  }

  Excluir(abreviatura: Abreviatura) {
    this.service.Remover(abreviatura.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pesssoa excluída com sucesso!' });
      })
      .catch(erro => erro);
      this.visible = false;
      setTimeout (() => this.visible = true, 0);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
