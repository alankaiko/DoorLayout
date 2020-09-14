import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abdomesuperior',
  templateUrl: './abdomesuperior.component.html',
  styleUrls: ['./abdomesuperior.component.css']
})
export class AbdomesuperiorComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
