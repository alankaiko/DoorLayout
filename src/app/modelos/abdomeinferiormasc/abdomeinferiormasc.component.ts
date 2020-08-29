import { ParametroDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abdomeinferiormasc',
  templateUrl: './abdomeinferiormasc.component.html',
  styleUrls: ['./abdomeinferiormasc.component.css']
})
export class AbdomeinferiormascComponent implements OnInit {
  @Input() laudosalvo: ParametroDoLaudo;
  dadosequipamento: string;
  executantes: any[];
  codigoexecutante: number;

  constructor() { }

  ngOnInit(): void {
  }

}
