import { ParametroDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abdometotal',
  templateUrl: './abdometotal.component.html',
  styleUrls: ['./abdometotal.component.css']
})
export class AbdometotalComponent implements OnInit {
  @Input() laudosalvo: ParametroDoLaudo;
  dadosequipamento: string;

  constructor() { }

  ngOnInit(): void {
  }

}
