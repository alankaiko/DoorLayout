import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transcraniano',
  templateUrl: './transcraniano.component.html',
  styleUrls: ['./transcraniano.component.css']
})
export class TranscranianoComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
