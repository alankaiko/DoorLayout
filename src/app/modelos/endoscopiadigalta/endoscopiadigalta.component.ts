import { ParametroDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-endoscopiadigalta',
  templateUrl: './endoscopiadigalta.component.html',
  styleUrls: ['./endoscopiadigalta.component.css']
})
export class EndoscopiadigaltaComponent implements OnInit {
  @Input() laudosalvo: ParametroDoLaudo;
  dadosequipamento: string;

  constructor() { }

  ngOnInit(): void {
  }

}
