import { SiglaFiltro, SiglaService } from './../../zservice/sigla.service';
import { Sigla } from './../../core/model';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-sigla',
  templateUrl: './lista-sigla.component.html',
  styleUrls: ['./lista-sigla.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaSiglaComponent implements OnInit {
  siglas = [];
  totalRegistros = 0;
  filtro = new SiglaFiltro();
  visible = true;

  constructor(private service: SiglaService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() { }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.siglas = response.siglas.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(sigla: Sigla) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + sigla.descricao.toUpperCase(),
      accept: () => {
        this.Excluir(sigla);
      }
    });
  }

  Excluir(sigla: Sigla) {
    this.service.Remover(sigla.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Sigla excluída com sucesso!' });
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
