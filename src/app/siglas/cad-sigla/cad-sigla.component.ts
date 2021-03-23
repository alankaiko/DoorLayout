import { isEmptyObject } from 'jquery';
import { MessageService } from 'primeng/api';
import { Sigla } from './../../core/model';
import { SiglaService } from './../../zservice/sigla.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cad-sigla',
  templateUrl: './cad-sigla.component.html',
  styleUrls: ['./cad-sigla.component.css'],
  providers: [MessageService]
})
export class CadSiglaComponent implements OnInit {
  formulario: FormGroup;
  display = true;

  constructor(private service: SiglaService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.CriarFormulario(new Sigla());
    const codsigla = this.rota.snapshot.params.cod;

    if (codsigla) {
      this.CarregarSigla(codsigla);
    }

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(sigla: Sigla) {
    this.formulario = this.formbuilder.group({
      codigo: [null, sigla.codigo],
      descricao: [null, sigla.descricao]
    });
  }

  CarregarSigla(codigo: number) {
    this.service.BuscarPorId(codigo).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if(this.ValidaCampoVazio()){
      return;
    }

    if(this.editando){
      this.AtualizarSigla();
      return;
    }

    this.VerificaDuplicidade();
  }

  ValidaCampoVazio() {
    if (isEmptyObject(this.formulario.controls['descricao'].value)){
      this.CamposErro('Descrição');
      const editor = document.getElementById('nome');
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');
      return true;
    }

    return false;
  }

  VerificaDuplicidade(){
    this.service.VerificarSeNomeExiste(this.formulario.controls['descricao'].value)
      .then(
        valor => {
          if(valor){
            this.CamposAviso(this.formulario.controls['descricao'].value);
            const editor = document.getElementById('nome');
            editor.setAttribute('style' , 'background-color: #fcf6a1; text-transform: uppercase;');
          } else {
            this.formulario.patchValue(this.AdicionarSigla());
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
  AdicionarSigla() {
    return this.service.Adicionar(this.formulario.value)
      .then(() => {
        this.route.navigate(['/listasigla']);
      });
  }

  AtualizarSigla() {
    this.service.Atualizar(this.formulario.value)
      .then(() => {
        this.route.navigate(['/listasigla']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
