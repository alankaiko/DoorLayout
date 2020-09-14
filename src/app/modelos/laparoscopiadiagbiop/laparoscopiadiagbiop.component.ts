import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-laparoscopiadiagbiop',
  templateUrl: './laparoscopiadiagbiop.component.html',
  styleUrls: ['./laparoscopiadiagbiop.component.css']
})
export class LaparoscopiadiagbiopComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
