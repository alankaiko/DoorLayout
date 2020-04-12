import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { TextopessoalService, TextoPessoalFiltro } from './../../zservice/textopessoal.service';
import { TextoPessoal } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, SelectItem } from 'primeng/api';

@Component({
  templateUrl: 'listatextopessoal.component.html',
  styleUrls: ['./listatextopessoal.component.css']
})
export class ListatextopessoalComponent implements OnInit {
  textospessoais = [];
  texto: TextoPessoal;
  totalRegistros = 0;
  filtro = new TextoPessoalFiltro();
  visible: boolean = true;
  camposbusca: SelectItem[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: TextopessoalService,
              private route: Router) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Abreviatura', value: {id: 1, name: 'Abreviatura', code: '1'}},
      {label: 'Codigo', value: {id: 2, name: 'Codigo', code: '2'}}
    ];
  }

  onRowSelect(event) {
    this.texto = event.data;
  }

  Alterar() {
    if (this.texto.codigo != null) {
      this.route.navigate(['/tabelas/listatextopessoal', this.texto.codigo]);
    }
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.textospessoais = response.textopessoals.content;
      }).catch(erro => console.log(erro));
  }


  ConfigurarVariavel(event) {
    const texto = document.getElementById('buscando') as HTMLInputElement;
    this.filtro.abreviatura = texto.value;
    this.Consultar();

  }

  AtivarExcluir() {
    this.exclusao = true;
  }


  Excluir() {
    this.service.Remover(this.texto.codigo)
      .then(() => {})
      .catch(erro => erro);
      this.exclusao = false;
      setTimeout (() => this.Consultar(), 0
      );
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
