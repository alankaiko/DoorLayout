import { FormGroup } from '@angular/forms';
import { Atendimento } from './../../core/model';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
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
  camposbusca: SelectItem[];
  periodo: SelectItem[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: AtendimentoService,
              private route: Router) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Código', value: {id: 1, name: 'Código', code: '1'}},
      {label: 'Paciente', value: {id: 2, name: 'Paciente', code: '2'}},
      {label: 'Prof. Executante', value: {id: 2, name: 'Prof. Executante', code: '3'}}
    ];

    this.periodo = [
      {label: 'Personalizado(todos)', value: {id: 1, name: 'Personalizado(todos)', code: '1'}},
      {label: 'Hoje', value: {id: 2, name: 'Hoje', code: '2'}},
      {label: 'Ultima Semana', value: {id: 2, name: 'Ultima Semana', code: '3'}},
      {label: 'Ultimo mês', value: {id: 2, name: 'Ultimo mês', code: '4'}}
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

  ConfigurarVariavel(event) {
    const texto = document.getElementById('buscando') as HTMLInputElement;
    this.filtro.patientname = texto.value;
    this.Consultar();

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
