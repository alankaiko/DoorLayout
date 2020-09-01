import { ParametroDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dopplerfluxometria',
  templateUrl: './dopplerfluxometria.component.html',
  styleUrls: ['./dopplerfluxometria.component.css']
})
export class DopplerfluxometriaComponent implements OnInit {
  @Input() laudosalvo: ParametroDoLaudo;
  dadosequipamento: string;

  constructor() { }

  ngOnInit(): void {
  }

}
