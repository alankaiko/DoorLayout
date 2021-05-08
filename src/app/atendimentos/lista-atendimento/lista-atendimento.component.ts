import { FormGroup } from '@angular/forms';
import { Atendimento } from './../../core/model';
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { AtendimentoFilter, AtendimentoService } from './../../zservice/atendimento.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';


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
  dropbusca: any[];
  dropperiodo: any[];
  laudoperiodo: any[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;
  periodoselecionado: string;
  camposelecionado: string;
  campotextobuscar: string;
  laudoselecionado: string;

  constructor(private service: AtendimentoService,
              private route: Router,
              private location: Location) { }

  ngOnInit() {
    this.IniciarDrops();
    this.IniciarParametroBasico();

    this.BuscaDinamica();
  }

  private IniciarParametroBasico(){
    this.periodoselecionado = 'hoje';
    this.camposelecionado = 'codigo';
    this.laudoselecionado = 'indiferente';
  }

  private IniciarDrops(){
    this.dropbusca = [
      {label: 'Codigo', value: 'codigo'},
      {label: 'Paciente', value: 'paciente'},
      {label: 'Prof. Exec', value: 'profexecutante'}
    ];

    this.dropperiodo = [
      {label: 'Personalizado(todos)', value: 'todos'},
      {label: 'Hoje', value: 'hoje'},
      {label: 'Ultima Semana', value: 'semana'},
      {label: 'Ultimo mês', value: 'mes'}
    ];

    this.laudoperiodo = [
      {label: 'Indiferente', value: 'indiferente'},
      {label: 'Pendente', value: 'pendente'},
      {label: 'Pronto', value: 'pronto'}
    ];
  }

  Alterar() {
    if (this.atendimento?.codigo != null) {
      this.route.navigate(['/operacoes/atendimento', this.atendimento.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.atendimento = this.atendimentos[0];
  }

  UltimaSelecao() {
    this.atendimento = this.atendimentos[this.atendimentos.length - 1];
  }

  ProximaSelecao() {
    const valor = this.atendimentos.indexOf(this.atendimento);
    this.atendimento = this.atendimentos[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.atendimentos.indexOf(this.atendimento);
    this.atendimento = this.atendimentos[valor - 1];
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
    setTimeout(() => {
      if ((this.camposelecionado === 'codigo') && (this.campotextobuscar !== undefined) && (this.campotextobuscar !== '')) {
        const numero = +this.campotextobuscar;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.atendimentos = response;
          }).catch(erro => console.log(erro));

      } else {
        if (this.camposelecionado === 'paciente') {
          this.filtro.pacientenome = this.campotextobuscar;
        }

        if (this.camposelecionado === 'profexecutante') {
          this.filtro.solicitantenome = this.campotextobuscar;
        }

        if (this.periodoselecionado === 'todos') {
          this.filtro.datafinal = null;
          this.filtro.datainicial = null;
          this.Consultar();
        }

        if (this.periodoselecionado === 'hoje') {
          const final = new Date();
          this.filtro.datafinal = final;
          this.filtro.datainicial = final;
        }

        if (this.periodoselecionado === 'semana') {
          const final = new Date();
          const inicial = new Date();
          inicial.setDate(new Date().getDate() - 7);

          this.filtro.datainicial = inicial;
          this.filtro.datafinal = final;
        }

        if (this.periodoselecionado === 'mes') {
          const final = new Date();
          const inicial = new Date();
          inicial.setDate(new Date().getDate() - 30);

          this.filtro.datainicial = inicial;
          this.filtro.datafinal = final;
        }

        this.Consultar();
      }
    }, 10);
  }


  AtivarExcluir() {
    if (this.atendimento.codigo != null) {
      this.exclusao = true;
    }
  }

  Excluir() {
    this.service.Remover(this.atendimento.codigo).then(() => {}).catch(erro => erro);
    this.exclusao = false;
    setTimeout (() => this.Consultar(), 100);
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
