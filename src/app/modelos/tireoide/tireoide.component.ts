import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tireoide',
  templateUrl: './tireoide.component.html',
  styleUrls: ['./tireoide.component.css']
})
export class TireoideComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
