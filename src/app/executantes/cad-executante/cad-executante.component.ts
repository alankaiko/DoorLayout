import { EstadosService } from './../../zservice/estados.service';
import { SiglaService } from './../../zservice/sigla.service';
import { ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { Component, OnInit } from '@angular/core';
import { ProfissionalExecutante } from './../../core/model';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';
import { isEmptyObject } from 'jquery';

@Component({
  selector: 'app-cad-executante',
  templateUrl: './cad-executante.component.html',
  styleUrls: ['./cad-executante.component.css'],
  providers: [MessageService]
})
export class CadExecutanteComponent implements OnInit {
  profissional = new ProfissionalExecutante();
  siglas = [];
  estados = [];
  executanteselecionado: number;
  display = true;

  constructor(private service: ProfissionalexecutanteService,
              private serviceSigla: SiglaService,
              private serviceEstado: EstadosService,
              private rota: ActivatedRoute,
              private route: Router,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit() {
    const codprofissionalexec = this.rota.snapshot.params.cod;

    if (codprofissionalexec) {
      this.CarregarProfissionalExecutante(codprofissionalexec);
    }

    this.BuscarEstados();
    this.BuscarSiglas();
    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  get editando() {
    return Boolean(this.profissional.codigo)
  }

  CarregarPessoa(codigo: number) {
    this.service.BuscarPorId(codigo)
      .then(profissional => {
        this.profissional = profissional;
      })
      .catch(erro => erro);
  }

  Salvar(form: FormControl) {
    if(this.ValidaCampoVazio()){
      return;
    }

    if(this.editando){
      this.AtualizarProfissionalExecutante();
      return;
    }

    this.VerificaDuplicidade();
  }

  CarregarProfissionalExecutante(codigo: number) {
    this.service.BuscarPorId(codigo)
      .then(profissional => {
        this.profissional = profissional;
      })
      .catch(erro => erro);
  }

  AdicionarProfissionalExecutante() {
    this.service.Adicionar(this.profissional)
    .then(() => {
      this.route.navigate(['/listaprofexecutante']);
    })
    .catch(erro => erro);
  }

  AtualizarProfissionalExecutante() {
    this.service.Atualizar(this.profissional)
      .then(() => {
        this.route.navigate(['/listaprofexecutante']);
      }).catch(erro => erro);
  }

  ValidaCampoVazio() {
    if (isEmptyObject(this.profissional.nome)){
      this.CamposErro('Nome');
      const editor = document.getElementById('nome');
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');
      return true;
    }

    if (this.profissional.conselho.sigla.codigo == null){
      this.CamposErro('Sigla');
      const editor = document.querySelector('#sigla .ui-inputtext') as HTMLElement;
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');

      return true;
    }

    if (this.profissional.conselho.estado.codigo == null){
      this.CamposErro('Estado');
      const editor = document.querySelector('#estado .ui-inputtext') as HTMLElement;
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');

      return true;
    }

    if (isEmptyObject(this.profissional.conselho.descricao)){
      this.CamposErro('Num. do Conselho');
      const editor = document.getElementById('conselho');
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');
      return true;
    }

    return false;
  }

  VerificaDuplicidade(){
    this.service.VerificarSeNomeExiste(this.profissional.nome)
      .then(
        valor => {
          if(valor){
            this.CamposAviso(this.profissional.nome);
            const editor = document.getElementById('nome');
            editor.setAttribute('style' , 'background-color: #fcf6a1; text-transform: uppercase;');
          } else {
            this.AdicionarProfissionalExecutante();
          }
        }
      );
  }

  private CamposErro(campo: string) {
    this.messageService.add({severity:'error', summary: 'Erro', detail:'Preencher campo ' + campo.toUpperCase(), life:6000});
  }

  private CamposAviso(campo: string) {
    this.messageService.add({severity:'warn', summary: 'Aviso', detail:'Valor ' + campo.toUpperCase() + ' já existe no banco de dados', life:10000});
  }

  Voltar() {
    this.location.back();
  }

  BuscarSiglas() {
    return this.serviceSigla.Listar()
    .then(siglas => {
      this.siglas = siglas
        .map(g => ({ label: g.descricao, value: g.codigo }));
    });
  }

  BuscarEstados() {
    return this.serviceEstado.Listar()
    .then(estados => {
      this.estados = estados
        .map(g => ({ label: g.uf, value: g.codigo }));
    });
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
