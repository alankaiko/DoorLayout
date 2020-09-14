import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-obstetrico14semanas',
  templateUrl: './obstetrico14semanas.component.html',
  styleUrls: ['./obstetrico14semanas.component.css']
})
export class Obstetrico14semanasComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
