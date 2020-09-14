import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ecodopplercardiograma',
  templateUrl: './ecodopplercardiograma.component.html',
  styleUrls: ['./ecodopplercardiograma.component.css']
})
export class EcodopplercardiogramaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  formula: any[];
  textoaux: any[];

  constructor() { }

  ngOnInit(): void {
    this.CarregarDrops();
  }

  CarregarDrops() {
    this.formula = [
      {label: 'Fórmula TROY', value: 'troy'},
      {label: 'Fórmula PENN', value: 'penn'},
      {label: 'Fórmula ASE', value: 'ase'}
    ];

    this.textoaux = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'texto'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

}
