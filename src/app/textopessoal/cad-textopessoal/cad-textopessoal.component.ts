import { isEmptyObject } from 'jquery';
import { TextopessoalService } from './../../zservice/textopessoal.service';
import { TextoPessoal } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cad-textopessoal',
  templateUrl: './cad-textopessoal.component.html',
  styleUrls: ['./cad-textopessoal.component.css'],
  providers: [MessageService]
})
export class CadTextopessoalComponent implements OnInit {
  formulario: FormGroup;
  display = true;

  constructor(private service: TextopessoalService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.CriarFormulario(new TextoPessoal());
    const codtextopessoal = this.rota.snapshot.params.cod;

    if (codtextopessoal) {
      this.CarretarTextoPessoal(codtextopessoal);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(texto: TextoPessoal) {
    this.formulario = this.formbuilder.group({
      codigo: [null, texto.codigo],
      abreviatura: [null, texto.abreviatura],
      texto: [null, texto.texto]
    });
  }

  CarretarTextoPessoal(codigo: number) {
    this.service.BuscarPorId(codigo).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if(this.ValidaCampoVazio()){
      return;
    }

    if(this.editando){
      this.AtualizarTextoPessoal();
      return;
    }

    this.VerificaDuplicidade();
  }

  ValidaCampoVazio() {
    if (isEmptyObject(this.formulario.controls['abreviatura'].value)){
      this.CamposErro('Abreviatura');
      const editor = document.getElementById('nome');
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');
      return true;
    }

    return false;
  }

  VerificaDuplicidade(){
    this.service.VerificarSeNomeExiste(this.formulario.controls['abreviatura'].value)
      .then(
        valor => {
          if(valor){
            this.CamposAviso(this.formulario.controls['abreviatura'].value);
            const editor = document.getElementById('nome');
            editor.setAttribute('style' , 'background-color: #fcf6a1; text-transform: uppercase;');
          } else {
            this.formulario.patchValue(this.AdicionarTextoPessoal());
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

  AdicionarTextoPessoal() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/listatextopessoal']);
      });
  }

  AtualizarTextoPessoal() {
    this.service.Atualizar(this.formulario.value)
      .then(texto => {
        this.formulario.patchValue(texto);
        this.route.navigate(['/listatextopessoal']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
