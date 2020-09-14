import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videocolsposcopia',
  templateUrl: './videocolsposcopia.component.html',
  styleUrls: ['./videocolsposcopia.component.css']
})
export class VideocolsposcopiaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
