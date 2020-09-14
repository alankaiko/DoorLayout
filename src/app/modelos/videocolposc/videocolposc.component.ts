import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videocolposc',
  templateUrl: './videocolposc.component.html',
  styleUrls: ['./videocolposc.component.css']
})
export class VideocolposcComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
