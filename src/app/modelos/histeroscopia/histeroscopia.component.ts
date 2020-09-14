import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-histeroscopia',
  templateUrl: './histeroscopia.component.html',
  styleUrls: ['./histeroscopia.component.css']
})
export class HisteroscopiaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
