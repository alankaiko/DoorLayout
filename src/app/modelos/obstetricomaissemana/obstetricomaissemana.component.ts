import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-obstetricomaissemana',
  templateUrl: './obstetricomaissemana.component.html',
  styleUrls: ['./obstetricomaissemana.component.css']
})
export class ObstetricomaissemanaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
