import { isEmptyObject } from 'jquery';
import { Estado } from './../../core/model';
import { EstadosService, EstadosFiltro } from './../../zservice/estados.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cad-estado',
  templateUrl: './cad-estado.component.html',
  styleUrls: ['./cad-estado.component.css'],
  providers: [MessageService]
})
export class CadEstadoComponent implements OnInit {
  formulario: FormGroup;
  display = true;
  filtro= new EstadosFiltro();

  constructor(private service: EstadosService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.CriarFormulario(new Estado());
    const codestado = this.rota.snapshot.params.cod;

    if (codestado) {
      this.CarregarEstado(codestado);
    }

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(estado: Estado) {
    this.formulario = this.formbuilder.group({
      codigo: [null, estado.codigo],
      uf: [null, estado.uf],
      descricao: [null, estado.descricao]
    });
  }

  CarregarEstado(codigo: number) {
    this.service.BuscarPorId(codigo).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if(this.ValidaCampoVazio()){
      return;
    }

    if(this.editando){
      this.AtualizarEstado();
      return;
    }

    this.VerificaDuplicidade();
  }

  ValidaCampoVazio() {
    if (isEmptyObject(this.formulario.controls['uf'].value)){
      this.CamposErro('UF');
      const editor = document.getElementById('uf');
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');
      return true;
    }

    return false;
  }

  VerificaDuplicidade(){
    this.service.VerificarSeNomeExiste(this.formulario.controls['uf'].value)
      .then(
        valor => {
          if(valor){
            this.CamposAviso(this.formulario.controls['uf'].value);
            const editor = document.getElementById('uf');
            editor.setAttribute('style' , 'background-color: #fcf6a1; text-transform: uppercase;');
          } else {
            this.AdicionarEstado();
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

  AdicionarEstado() {
    this.service.Adicionar(this.formulario.value)
      .then(() => {
        this.route.navigate(['/listaestado']);
      });
  }

  AtualizarEstado() {
    this.service.Atualizar(this.formulario.value)
      .then(() => {
        this.route.navigate(['/listaestado']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
