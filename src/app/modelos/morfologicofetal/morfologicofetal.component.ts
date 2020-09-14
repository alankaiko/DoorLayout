import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-morfologicofetal',
  templateUrl: './morfologicofetal.component.html',
  styleUrls: ['./morfologicofetal.component.css']
})
export class MorfologicofetalComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
