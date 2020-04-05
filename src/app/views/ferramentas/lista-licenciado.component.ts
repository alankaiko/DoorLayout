import { Licenciado } from './../../core/model';
import { LicenciadoFiltro, LicenciadoService } from './../../zservice/licenciado.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'lista-licenciado.component.html',
  styleUrls: ['./lista-licenciado.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListalicenciadoComponent implements OnInit {
  licenciados = [];
  totalRegistros = 0;
  filtro = new LicenciadoFiltro();
  visible: boolean = true;

  constructor(private service: LicenciadoService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() { }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.licenciados = response.licenciados.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(licenciado: Licenciado) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + licenciado.razaosocial.toUpperCase(),
      accept: () => {
        this.Excluir(licenciado);
      }
    });
  }

  Excluir(licenciado: Licenciado) {
    this.service.Remover(licenciado.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Licenciado excluída com sucesso!' });
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
