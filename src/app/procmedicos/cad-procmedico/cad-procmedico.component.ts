import { isEmptyObject } from 'jquery';
import { GrupoprocedimentoService } from './../../zservice/grupoprocedimento.service';
import { ProcedimentomedicoService } from './../../zservice/procedimentomedico.service';
import { Component, OnInit } from '@angular/core';
import { ProcedimentoMedico } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cad-procmedico',
  templateUrl: './cad-procmedico.component.html',
  styleUrls: ['./cad-procmedico.component.css'],
  providers: [MessageService]
})
export class CadProcmedicoComponent implements OnInit {
  formulario: FormGroup;
  grupos = [];
  display = true;

  constructor(private service: ProcedimentomedicoService,
              private rota: ActivatedRoute,
              private serviceGrupo: GrupoprocedimentoService,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.CriarFormulario(new ProcedimentoMedico());
    const codprocedimentomedico = this.rota.snapshot.params.cod;

    if (codprocedimentomedico) {
      this.CarregarProcedimentoMedico(codprocedimentomedico);
    }

    this.BuscarGrupos();
    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  BuscarGrupos() {
    return this.serviceGrupo.Listar()
    .then(response => {
      this.grupos = response
        .map(g => ({ label: g.nomegrupo, value: g.codigo }));
    });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(procedimentomedico: ProcedimentoMedico) {
    this.formulario = this.formbuilder.group({
      codigo: [null, procedimentomedico.codigo],
      nome: [null, procedimentomedico.nome],
      grupo: this.formbuilder.group({
        codigo: [null, procedimentomedico.grupo.codigo]
      })
    });
  }

  CarregarProcedimentoMedico(codigo: number) {
    this.service.BuscarPorId(codigo).then(procedimento => this.formulario.patchValue(procedimento));
  }

  Salvar() {
    if(this.ValidaCampoVazio()){
      return;
    }

    if(this.editando){
      this.AtualizarProcedimentoMedico();
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

    if (this.formulario.controls['grupo'].value.codigo == null){
      this.CamposErro('Grupo');
      const editor = document.querySelector('#grupo .ui-inputtext') as HTMLElement;
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
            this.formulario.patchValue(this.AdicionarProcedimentoMedico());
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


  AdicionarProcedimentoMedico() {
    return this.service.Adicionar(this.formulario.value)
      .then(() => {
        this.route.navigate(['/listaexameprocmedico']);
      });
  }

  AtualizarProcedimentoMedico() {
    this.service.Atualizar(this.formulario.value)
      .then(() => {
        this.route.navigate(['/listaexameprocmedico']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
