import { EstadosFiltro, EstadosService } from './../../zservice/estados.service';
import { Estado } from './../../core/model';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-estado',
  templateUrl: './lista-estado.component.html',
  styleUrls: ['./lista-estado.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaEstadoComponent implements OnInit {
  estados = [];
  totalRegistros = 0;
  filtro = new EstadosFiltro();
  visible = true;

  constructor(private service: EstadosService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() { }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.estados = response.estados.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(estado: Estado) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + estado.descricao.toUpperCase(),
      accept: () => {
        this.Excluir(estado);
      }
    });
  }

  Excluir(estado: Estado) {
    this.service.Remover(estado.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Estado excluída com sucesso!' });
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
