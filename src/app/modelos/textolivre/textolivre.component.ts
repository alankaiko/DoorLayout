import { Laudo, ParametroDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-textolivre',
  templateUrl: './textolivre.component.html',
  styleUrls: ['./textolivre.component.css']
})
export class TextolivreComponent implements OnInit {
  @Input() laudosalvo: ParametroDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
