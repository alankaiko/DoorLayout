import { Subcategoriacid10Service } from './../../zservice/subcategoriacid10.service';
import { Component, OnInit } from '@angular/core';
import { SubcategoriaCid10 } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastro-convenio',
  templateUrl: './cadastro-subcategoriacid.component.html',
  styleUrls: ['./cadastro-subcategoriacid.component.css']
})
export class CadastroSubcategoriacidComponent implements OnInit {
  formulario: FormGroup;
  display: boolean = true;

  constructor(private service: Subcategoriacid10Service,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {

    this.CriarFormulario(new SubcategoriaCid10());
    const codconvenio = this.rota.snapshot.params.cod;

    if (codconvenio) {
      this.CarregarSubcategoriaCid10(codconvenio);
    }

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(subcategoria: SubcategoriaCid10) {
    this.formulario = this.formbuilder.group({
      codigo: [null, subcategoria.codigo],
      nome: [null, subcategoria.nome],
      codigotexto: [null, subcategoria.codigotexto],
      nome50: [null, subcategoria.nome50],
      restrsexo: [null, subcategoria.restrsexo],
      classificacao: [null, subcategoria.classificacao],
      causaobito: [null, subcategoria.causaobito],
      referencia: [null, subcategoria.referencia],
      excluidos: [null, subcategoria.excluidos],
      categoriacid10: this.formbuilder.group({
        codigo: [null, subcategoria.categoriacid10.codigo],
        nome: [null, subcategoria.categoriacid10.nome],
        codigotexto: [null, subcategoria.categoriacid10.codigotexto],
        grupocid10: this.formbuilder.group({
          codigo: [null, subcategoria.categoriacid10.grupocid10.codigo],
          codigotexto: [null, subcategoria.categoriacid10.grupocid10.codigotexto],
          nome: [null, subcategoria.categoriacid10.grupocid10.nome],
          capitulocid: this.formbuilder.group({
            codigo: [null, subcategoria.categoriacid10.grupocid10.capitulocid10.codigo],
            codigotexto: [null, subcategoria.categoriacid10.grupocid10.codigotexto],
            nome: [null, subcategoria.categoriacid10.grupocid10.nome]
          })
        })
      })
    });
  }

  CarregarSubcategoriaCid10(codigo: number) {
    this.service.BuscarPorId(codigo).then(convenio => this.formulario.patchValue(convenio));
  }



  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/dashboard']);
  }

}
