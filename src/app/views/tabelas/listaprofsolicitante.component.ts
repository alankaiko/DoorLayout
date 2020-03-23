import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { ProfissionalsolicitanteService, ProfissionalSolicitanteFiltro } from './../../zservice/profissionalsolicitante.service';
import { ProfissionalSolicitante } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

@Component({
  templateUrl: 'listaprofsolicitante.component.html',
  styleUrls: ['./listaprofsolicitante.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaprofsolicitanteComponent implements OnInit {
  profissionaissol = [];
  totalRegistros = 0;
  filtro = new ProfissionalSolicitanteFiltro();
  visible: boolean = true;

  constructor(private service: ProfissionalsolicitanteService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.profissionaissol = response.profissionalsolicitantes.content;
      }).catch(erro => console.log(erro));
  }


  ConfirmarExclusao(solicitante: ProfissionalSolicitante) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + solicitante.nome.toUpperCase(),
      accept: () => {
        this.Excluir(solicitante);
      }
    });
  }

  Excluir(solicitante: ProfissionalSolicitante) {
    this.service.Remover(solicitante.codigo)
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
