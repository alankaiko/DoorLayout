import { ParametroDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mamas',
  templateUrl: './mamas.component.html',
  styleUrls: ['./mamas.component.css']
})
export class MamasComponent implements OnInit {
  @Input() laudosalvo: ParametroDoLaudo;
  dadosequipamento: string;

  constructor() { }

  ngOnInit(): void {
  }

}
