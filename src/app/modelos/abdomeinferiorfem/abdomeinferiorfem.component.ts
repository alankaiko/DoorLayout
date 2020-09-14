import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abdomeinferiorfem',
  templateUrl: './abdomeinferiorfem.component.html',
  styleUrls: ['./abdomeinferiorfem.component.css']
})
export class AbdomeinferiorfemComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
