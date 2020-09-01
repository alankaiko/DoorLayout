import { ParametroDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ecodopplercardiograma',
  templateUrl: './ecodopplercardiograma.component.html',
  styleUrls: ['./ecodopplercardiograma.component.css']
})
export class EcodopplercardiogramaComponent implements OnInit {
  @Input() laudosalvo: ParametroDoLaudo;
  dadosequipamento: string;

  constructor() { }

  ngOnInit(): void {
  }

}
