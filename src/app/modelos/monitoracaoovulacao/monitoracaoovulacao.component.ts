import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monitoracaoovulacao',
  templateUrl: './monitoracaoovulacao.component.html',
  styleUrls: ['./monitoracaoovulacao.component.css']
})
export class MonitoracaoovulacaoComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
