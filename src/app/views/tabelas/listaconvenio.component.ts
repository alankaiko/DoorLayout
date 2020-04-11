import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Convenio, Atendimento, ProcedimentoAtendimento } from './../../core/model';
import { Router } from '@angular/router';
import { ConvenioFiltro, ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, SelectItem } from 'primeng/api';
import { strict } from 'assert';



@Component({
  templateUrl: 'listaconvenio.component.html',
  styleUrls: ['./listaconvenio.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaconvenioComponent implements OnInit {
  convenios = [];
  convenio = new Convenio();
  codigoconvenio: number;
  totalRegistros = 0;
  filtro = new ConvenioFiltro();
  visible: boolean = true;
  camposbusca: SelectItem[];
  codigocampo: any;
  campobusca: string;
  formulario: FormGroup;
  teste: boolean = true;



  constructor(private service: ConvenioService,
              private route: Router,
              private formbuilder: FormBuilder,
              private confirmation: ConfirmationService,
              private messageService: MessageService) {


              }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome', value: {id: 1, name: 'Nome', code: '1'}},
      {label: 'Codigo', value: {id: 2, name: 'Codigo', code: '2'}}
    ];
  }


  onRowSelect(event) {
    this.convenio = event.data;
  }

  Alterar() {
    if (this.convenio.codigo != null) {
      this.route.navigate(['/tabelas/listaconvenio', this.convenio.codigo]);
    }
  }


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.convenios = response.convenios.content;
      }).catch(erro => console.log(erro));
  }

  ConfigurarVariavel(event) {
    const texto = document.getElementById('buscando') as HTMLInputElement;
    this.filtro.nome = texto.value;
    this.Consultar();

  }

  ConfirmarExclusao() {
    if (this.convenio.codigo != null) {
      this.confirmation.confirm({
        message: 'Deseja Excluir: ' + this.convenio.nome.toUpperCase(),
        accept: () => {
          this.Excluir(this.convenio);
        }
      });
    }
  }

  Excluir(convenio: Convenio) {
    this.service.Remover(convenio.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Convênio excluído com sucesso!' });
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
