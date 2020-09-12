import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-diversos',
  templateUrl: './diversos.component.html',
  styleUrls: ['./diversos.component.css']
})
export class DiversosComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
