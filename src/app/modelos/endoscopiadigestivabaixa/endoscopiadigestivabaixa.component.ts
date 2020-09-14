import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-endoscopiadigestivabaixa',
  templateUrl: './endoscopiadigestivabaixa.component.html',
  styleUrls: ['./endoscopiadigestivabaixa.component.css']
})
export class EndoscopiadigestivabaixaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
