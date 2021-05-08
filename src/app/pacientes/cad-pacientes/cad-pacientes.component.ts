import { PacienteFiltro } from './../../zservice/servidor.service';
import { isEmptyObject } from 'jquery';
import { PacienteService } from './../../zservice/paciente.service';
import { Component, OnInit } from '@angular/core';
import { Paciente, EnumSexo } from './../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cad-pacientes',
  templateUrl: './cad-pacientes.component.html',
  styleUrls: ['./cad-pacientes.component.css'],
  providers: [MessageService]
})
export class CadPacientesComponent implements OnInit {
  paciente = new Paciente();
  display = true;
  enumsexo: any[];

  constructor(private service: PacienteService,
              private rota: ActivatedRoute,
              private route: Router,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit() {
    const codigo = this.rota.snapshot.params.cod;

    if (codigo) {
      this.CarregarPaciente(codigo);
    }

    this.enumsexo = [
      {label: 'Indefinido', value: EnumSexo.INDEFINIDO},
      {label: 'Masculino', value: EnumSexo.MASCULINO},
      {label: 'Feminino', value: EnumSexo.FEMININO}
    ];

    if (this.paciente.datacriacao === undefined) {
      this.paciente.datacriacao = new Date;
    }
  }

  get editando() {
    return Boolean(this.paciente.codigo)
  }

  CarregarPaciente(codigo: number) {
    this.service.BuscarPorId(codigo)
      .then(paciente => {
        this.paciente = paciente;
      })
      .catch(erro => erro);
  }

  Salvar() {
    if(this.ValidaCampoVazio()){
      return;
    }

    if(this.editando){
      this.AtualizarPaciente();
      return;
    }

    this.VerificaDuplicidade();
  }

  ValidaCampoVazio() {
    if (isEmptyObject(this.paciente.nome)){
      this.CamposErro('Nome');
      const editor = document.getElementById('nome');
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');
      return true;
    }

    // if (isEmptyObject(this.paciente.sexo)){
    //   this.CamposErro('Sexo');
    //   const editor = document.querySelector('#sexo .ui-inputtext') as HTMLElement;
    //   editor.setAttribute('style' , 'background-color: #fcd5d5;');

    //   return true;
    // }

    // if (this.paciente.datanasc == null){
    //   this.CamposErro('Data Nascimento');
    //   const editor = document.querySelector('#datanasc .ui-inputtext') as HTMLElement;
    //   editor.setAttribute('style' , 'background-color: #fcd5d5; width: 127px; height: 25px;' +
    //    'border-radius:2px; border: 1px solid rgb(110, 110, 110);');

    //   return true;
    // }

    return false;
  }

  VerificaDuplicidade(){
    let filtro = new PacienteFiltro();
    filtro.nome = this.paciente.nome;
    filtro.datanasc = this.paciente.datanasc;

    this.service.VerificarSeNomeExiste(filtro)
      .then(
        valor => {
          if(valor){
            this.CamposAviso(this.paciente.nome + ' e ' + 'Data Nasc');
            const editor = document.getElementById('nome');
            editor.setAttribute('style' , 'background-color: #fcf6a1; text-transform: uppercase;');
          } else {
            this.AdicionarPaciente();
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

  AdicionarPaciente() {
    return this.service.Adicionar(this.paciente)
      .then(() => {
        this.route.navigate(['/listapaciente']);
      });
  }

  AtualizarPaciente() {
    this.service.Atualizar(this.paciente)
      .then(() => {
        this.route.navigate(['/listapaciente']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }

}
