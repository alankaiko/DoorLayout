import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { ProcedimentomedicoService, ProcedimentoMedicoFiltro } from './../../zservice/procedimentomedico.service';
import { ProcedimentoMedico } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

@Component({
  templateUrl: 'listaexameprocmedico.component.html',
  styleUrls: ['./listaexameprocmedico.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaexameprocmedicoComponent implements OnInit {
  procedimentos = [];
  totalRegistros = 0;
  filtro = new ProcedimentoMedicoFiltro();
  visible: boolean = true;

  constructor(private service: ProcedimentomedicoService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.procedimentos = response.procedimentos.content;
      }).catch(erro => console.log(erro));
  }


  ConfirmarExclusao(procedimento: ProcedimentoMedico) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + procedimento.nome.toUpperCase(),
      accept: () => {
        this.Excluir(procedimento);
      }
    });
  }

  Excluir(procedimento: ProcedimentoMedico) {
    this.service.Remover(procedimento.codigo)
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

