import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aparelhourinario',
  templateUrl: './aparelhourinario.component.html',
  styleUrls: ['./aparelhourinario.component.css']
})
export class AparelhourinarioComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
