import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abdomeinferiorfemendov',
  templateUrl: './abdomeinferiorfemendov.component.html',
  styleUrls: ['./abdomeinferiorfemendov.component.css']
})
export class AbdomeinferiorfemendovComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
