import { MessageService } from 'primeng/components/common/messageservice';
import { Convenio } from './../../core/model';
import { Router } from '@angular/router';
import { ConvenioFiltro, ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

@Component({
  templateUrl: 'listaconvenio.component.html',
  styleUrls: ['./listaconvenio.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaconvenioComponent implements OnInit {
  convenios = [];
  totalRegistros = 0;
  filtro = new ConvenioFiltro();
  visible: boolean = true;

  constructor(private service: ConvenioService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.convenios = response.convenios.content;
      }).catch(erro => console.log(erro));
  }


  ConfirmarExclusao(convenio: Convenio) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + convenio.nome.toUpperCase(),
      accept: () => {
        this.Excluir(convenio);
      }
    });
  }

  Excluir(convenio: Convenio) {
    this.service.Remover(convenio.codigo)
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
