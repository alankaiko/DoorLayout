import { ParametroDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-obstetrico1trimestre',
  templateUrl: './obstetrico1trimestre.component.html',
  styleUrls: ['./obstetrico1trimestre.component.css']
})
export class Obstetrico1trimestreComponent implements OnInit {
  @Input() laudosalvo: ParametroDoLaudo;
  dadosequipamento: string;

  constructor() { }

  ngOnInit(): void {
  }

}
