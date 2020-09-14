import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videocolposcopiaifcpc',
  templateUrl: './videocolposcopiaifcpc.component.html',
  styleUrls: ['./videocolposcopiaifcpc.component.css']
})
export class VideocolposcopiaifcpcComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
