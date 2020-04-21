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
  status: any[];
  quantidades: any[];
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

    this.status = [
      {label: 'Indiferente'},
      {label: 'Pendente'},
      {label: 'Pronto'}
    ];

    this.quantidades = [
      {label: '100'},
      {label: '5'},
      {label: '30'},
      {label: '50'},
      {label: '70'},
      {label: '500'}
    ];

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 0);
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
    const dropperiodo = $('#codigoperiodo :selected').text();

    setTimeout (() => {
      if (drop === 'Paciente') {
        return this.service.BuscarListaPorNomePaciente(texto.value)
          .then(response => {
            this.atendimentos = response;
          }).catch(erro => console.log(erro));
      }

      if ((drop === 'Codigo') && (texto.value !== '')) {
        const numero = +texto.value;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.atendimentos = response;
          }).catch(erro => console.log(erro));
      }

      if (dropperiodo === 'Personalizado(todos)') {
        this.Consultar();
      }

      if (dropperiodo === 'Hoje') {
        const data = new Date();
        this.filtro.datafinal = data;
        this.filtro.datainicial = data;
      }

      if (dropperiodo === 'Ultima Semana') {
        const data = new Date();
        const outraData = new Date(data.getTime() - 7);

        this.filtro.datafinal = data;
        this.filtro.datafinal = outraData;
      }

      if (dropperiodo === 'Ultimo mês') {
        const data = new Date();
        const outraData = new Date(data.getTime() - 30);

        this.filtro.datafinal = data;
        this.filtro.datafinal = outraData;
      }
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

  Fechar() {
    this.route.navigate(['/dashboard']);
  }
}
