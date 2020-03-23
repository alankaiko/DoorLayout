import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { TextopessoalService, TextoPessoalFiltro } from './../../zservice/textopessoal.service';
import { TextoPessoal } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

@Component({
  templateUrl: 'listatextopessoal.component.html',
  styleUrls: ['./listatextopessoal.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListatextopessoalComponent implements OnInit {
  textospessoais = [];
  totalRegistros = 0;
  filtro = new TextoPessoalFiltro();
  visible: boolean = true;

  constructor(private service: TextopessoalService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.textospessoais = response.textopessoals.content;
      }).catch(erro => console.log(erro));
  }


  ConfirmarExclusao(texto: TextoPessoal) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + texto.abreviatura.toUpperCase(),
      accept: () => {
        this.Excluir(texto);
      }
    });
  }

  Excluir(texto: TextoPessoal) {
    this.service.Remover(texto.codigo)
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
