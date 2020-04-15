import { FormGroup } from '@angular/forms';
import { Atendimento } from './../../core/model';
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { AtendimentoFilter, AtendimentoService } from './../../zservice/atendimento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-atendimento',
  templateUrl: './lista-atendimento.component.html',
  styleUrls: ['./lista-atendimento.component.css']
})
export class ListaAtendimentoComponent implements OnInit {
  atendimentos = [];
  atendimento: Atendimento;
  totalRegistros = 0;
  filtro = new AtendimentoFilter();
  visible: boolean = true;
  camposbusca: any[];
  periodo: any[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: AtendimentoService,
              private route: Router) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Codigo'},
      {label: 'Paciente'},
      {label: 'Prof. Executante'}
    ];

    this.periodo = [
      {label: 'Personalizado(todos)'},
      {label: 'Hoje'},
      {label: 'Ultima Semana'},
      {label: 'Ultimo mês'}
    ];
   }

   onRowSelect(event) {
    this.atendimento = event.data;
  }

  Alterar() {
    if (this.atendimento?.codigo != null) {
      this.route.navigate(['/operacoes/atendimento', this.atendimento.codigo]);
    }
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.atendimentos = response.atendimentos.content;
      }).catch(erro => console.log(erro));
  }

  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;

    setTimeout (() => {

    }, 0);
  }

  AtivarExcluir() {
    this.exclusao = true;
  }

  Atualizar() {
    setTimeout (() => this.Consultar(), 0);
  }


  Excluir() {
    this.service.Remover(this.atendimento.codigo)
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
