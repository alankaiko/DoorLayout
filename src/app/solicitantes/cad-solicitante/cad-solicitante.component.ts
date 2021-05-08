import { isEmptyObject } from 'jquery';
import { EstadosService } from './../../zservice/estados.service';
import { SiglaService } from './../../zservice/sigla.service';
import { ProfissionalSolicitante } from './../../core/model';
import { ProfissionalsolicitanteService } from './../../zservice/profissionalsolicitante.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-cad-solicitante',
  templateUrl: './cad-solicitante.component.html',
  styleUrls: ['./cad-solicitante.component.css'],
  providers: [MessageService]
})
export class CadSolicitanteComponent implements OnInit {
  formulario: FormGroup;
  display = true;
  siglas = [];
  estados = [];

  constructor(private service: ProfissionalsolicitanteService,
              private serviceSigla: SiglaService,
              private serviceEstado: EstadosService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.CriarFormulario(new ProfissionalSolicitante());
    const codprofissionalsol = this.rota.snapshot.params.cod;

    if (codprofissionalsol) {
      this.CarregarProfissionalSolicitante(codprofissionalsol);
    }

    this.BuscarEstados();
    this.BuscarSiglas();
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(profissional: ProfissionalSolicitante) {
    this.formulario = this.formbuilder.group({
      codigo: [null, profissional.codigo],
      nome: [null, profissional.nome],
      conselho: this.formbuilder.group({
        codigo: [null, profissional.conselho.codigo],
        descricao: [profissional.conselho.descricao],
        sigla: this.formbuilder.group({
          codigo: [null, profissional.conselho.sigla.codigo]
        }),
        estado: this.formbuilder.group({
          codigo: [null, profissional.conselho.estado.codigo]
        })
      })
    });
  }

  CarregarProfissionalSolicitante(codigo: number) {
    this.service.BuscarPorId(codigo).then(profissional => this.formulario.patchValue(profissional));
  }

  Salvar() {
    if(this.ValidaCampoVazio()){
      return;
    }

    if(this.editando){
      this.AtualizarProfissionalSolicitante();
      return;
    }

    this.VerificaDuplicidade();
  }

  ValidaCampoVazio() {
    if (isEmptyObject(this.formulario.controls['nome'].value)){
      this.CamposErro('Nome');
      const editor = document.getElementById('nome');
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');
      return true;
    }

    if (this.formulario.controls['conselho'].value.sigla.codigo == null){
      this.CamposErro('Sigla');
      const editor = document.querySelector('#sigla .ui-inputtext') as HTMLElement;
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');

      return true;
    }

    if (this.formulario.controls['conselho'].value.estado.codigo == null){
      this.CamposErro('Estado');
      const editor = document.querySelector('#estado .ui-inputtext') as HTMLElement;
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');

      return true;
    }

    if (isEmptyObject(this.formulario.controls['conselho'].value.descricao)){
      this.CamposErro('Num. do conselho');
      const editor = document.getElementById('conselho');
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');
      return true;
    }

    return false;
  }

  VerificaDuplicidade(){
    this.service.VerificarSeNomeExiste(this.formulario.controls['nome'].value)
      .then(
        valor => {
          if(valor){
            this.CamposAviso(this.formulario.controls['nome'].value);
            const editor = document.getElementById('nome');
            editor.setAttribute('style' , 'background-color: #fcf6a1; text-transform: uppercase;');
          } else {
            this.formulario.patchValue(this.AdicionarProfissionalSolicitante());
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

  AdicionarProfissionalSolicitante() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/listaprofsolicitante']);
      });
  }

  AtualizarProfissionalSolicitante() {
    this.service.Atualizar(this.formulario.value)
      .then(profissional => {
        this.formulario.patchValue(profissional);
        this.route.navigate(['/listaprofsolicitante']);
      });
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
