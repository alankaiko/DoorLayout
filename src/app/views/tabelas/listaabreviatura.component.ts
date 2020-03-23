import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { AbreviaturaService, AbreviaturaFiltro } from './../../zservice/abreviatura.service';
import { Abreviatura } from './../../core/model';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: 'listaabreviatura.component.html',
  styleUrls: ['./listaabreviatura.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListaabreviaturaComponent implements OnInit {
  abreviaturas = [];
  totalRegistros = 0;
  filtro = new AbreviaturaFiltro();
  @ViewChild('tabela') grid;

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
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.Excluir(abreviatura);
      }
    });
  }

  Excluir(abreviatura: Abreviatura) {
    this.service.Remover(abreviatura.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.Consultar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Pesssoa excluída com sucesso!' });
      })
      .catch(erro => erro);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
