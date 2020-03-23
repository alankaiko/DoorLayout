import { MessageService } from 'primeng/components/common/messageservice';
import { ProfissionalexecutanteService, ProfissionalExecutanteFiltro } from './../../zservice/profissionalexecutante.service';
import { Router } from '@angular/router';
import { ProfissionalExecutante } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

@Component({
  templateUrl: 'listaprofexecutante.component.html',
  styleUrls: ['./listaprofexecutante.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaprofexecutanteComponent implements OnInit {
  profissionaisexec = [];
  totalRegistros = 0;
  filtro = new ProfissionalExecutanteFiltro();
  visible: boolean = true;

  constructor(private service: ProfissionalexecutanteService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.profissionaisexec = response.profissionalexecutantes.content;
      }).catch(erro => console.log(erro));
  }


  ConfirmarExclusao(executante: ProfissionalExecutante) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + executante.nome.toUpperCase(),
      accept: () => {
        this.Excluir(executante);
      }
    });
  }

  Excluir(executante: ProfissionalExecutante) {
    this.service.Remover(executante.codigo)
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
