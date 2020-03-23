import { MessageService } from 'primeng/components/common/messageservice';
import { GrupoprocedimentoService, GrupoProcedimentoFiltro } from './../../zservice/grupoprocedimento.service';
import { Router } from '@angular/router';
import { GrupoProcedimento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

@Component({
  templateUrl: 'listagrupoexame.component.html',
  styleUrls: ['./listagrupoexame.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListagrupoexameComponent implements OnInit {
  grupos = [];
  totalRegistros = 0;
  filtro = new GrupoProcedimentoFiltro();
  visible: boolean = true;

  constructor(private service: GrupoprocedimentoService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.grupos = response.grupoprocedimentos.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(grupo: GrupoProcedimento) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + grupo.nome.toUpperCase(),
      accept: () => {
        this.Excluir(grupo);
      }
    });
  }

  Excluir(grupo: GrupoProcedimento) {
    this.service.Remover(grupo.codigo)
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
