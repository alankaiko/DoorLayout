import { isEmptyObject } from 'jquery';
import { GrupoprocedimentoService } from './../../zservice/grupoprocedimento.service';
import { Component, OnInit } from '@angular/core';
import { GrupoProcedimento } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cad-grupoexame',
  templateUrl: './cad-grupoexame.component.html',
  styleUrls: ['./cad-grupoexame.component.css'],
  providers: [MessageService]
})
export class CadGrupoexameComponent implements OnInit {
  formulario: FormGroup;
  display = true;

  constructor(private service: GrupoprocedimentoService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.CriarFormulario(new GrupoProcedimento());
    const codigogrupo = this.rota.snapshot.params.cod;

    if (codigogrupo) {
      this.CarregarGrupoProcedimento(codigogrupo);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(grupo: GrupoProcedimento) {
    this.formulario = this.formbuilder.group({
      codigo: [null, grupo.codigo],
      nomegrupo: [null, grupo.nomegrupo]
    });
  }

  CarregarGrupoProcedimento(codigo: number) {
    this.service.BuscarPorId(codigo).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if(this.ValidaCampoVazio()){
      return;
    }

    if(this.editando){
      this.AtualizarGrupoProcedimento();
      return;
    }

    this.VerificaDuplicidade();
  }

  ValidaCampoVazio() {
    if (isEmptyObject(this.formulario.controls['nomegrupo'].value)){
      this.CamposErro('Nome');
      const editor = document.getElementById('nome');
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');
      return true;
    }

    return false;
  }

  VerificaDuplicidade(){
    this.service.VerificarSeNomeExiste(this.formulario.controls['nomegrupo'].value)
      .then(
        valor => {
          if(valor){
            this.CamposAviso(this.formulario.controls['nomegrupo'].value);
            const editor = document.getElementById('nome');
            editor.setAttribute('style' , 'background-color: #fcf6a1; text-transform: uppercase;');
          } else {
            this.formulario.patchValue(this.AdicionarGrupoProcedimento());
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

  AdicionarGrupoProcedimento() {
    return this.service.Adicionar(this.formulario.value)
      .then(() => {
        this.route.navigate(['/listagrupoexame']);
      });
  }

  AtualizarGrupoProcedimento() {
    this.service.Atualizar(this.formulario.value)
      .then(() => {
        this.route.navigate(['/listagrupoexame']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
