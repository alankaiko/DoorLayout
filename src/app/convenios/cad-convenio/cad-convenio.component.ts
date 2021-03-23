import { isEmptyObject } from 'jquery';
import { ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';
import { Convenio } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cad-convenio',
  templateUrl: './cad-convenio.component.html',
  styleUrls: ['./cad-convenio.component.css'],
  providers: [MessageService]
})
export class CadConvenioComponent implements OnInit {
  formulario: FormGroup;
  display = true;

  constructor(private service: ConvenioService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.CriarFormulario(new Convenio());
    const codconvenio = this.rota.snapshot.params.cod;

    if (codconvenio) {
      this.CarregarConvenios(codconvenio);
    } else {
      this.formulario.controls['ativo'].setValue('true');
    }

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(convenio: Convenio) {
    this.formulario = this.formbuilder.group({
      codigo: [null, convenio.codigo],
      nome: [null, convenio.nome],
      nomedocontato: [null, convenio.nomedocontato],
      telefone: [null, convenio.telefone],
      fax: [null, convenio.fax],
      ativo: [null, convenio.ativo],
      email: [null, convenio.email],
      observacoes: [null, convenio.observacoes],
      numcopiasdolaudo: [null, convenio.numcopiasdolaudo],
      endereco: this.formbuilder.group({
        logradouro: [null, convenio.endereco.logradouro],
        complemento: [null, convenio.endereco.complemento],
        numero: [null, convenio.endereco.numero],
        bairro: [null, convenio.endereco.bairro],
        cidade: [null, convenio.endereco.cidade],
        estado: [null, convenio.endereco.estado],
        cep: [null, convenio.endereco.cep]
      })
    });
  }

  CarregarConvenios(codigo: number) {
    this.service.BuscarPorId(codigo).then(convenio => this.formulario.patchValue(convenio));
  }

  Salvar() {
    if(this.ValidaCampoVazio()){
      return;
    }

    if(this.editando){
      this.AtualizarConvenios();
      return;
    }

    this.VerificaDuplicidade();
  }

  ValidaCampoVazio() {
    if (isEmptyObject(this.formulario.controls['nome'].value)){
      this.CamposErro('Nome');
      const editor = document.getElementById('nome');
      editor.setAttribute('style' , 'background-color: #f8b7be4d; text-transform: uppercase;');
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
            editor.setAttribute('style' , 'background-color: #ffe399; text-transform: uppercase;');
          } else {
            this.formulario.patchValue(this.AdicionarConvenios());
          }
        }
      );
  }

  AdicionarConvenios() {
    return this.service.Adicionar(this.formulario.value)
      .then(() => {
        this.route.navigate(['/listaconvenio']);
      });
  }

  AtualizarConvenios() {
    this.service.Atualizar(this.formulario.value)
      .then(() => {
        this.route.navigate(['/listaconvenio']);
      });
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

  Fechar() {
    this.route.navigate(['/home']);
  }

}
