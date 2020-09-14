import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videonasofibrolar',
  templateUrl: './videonasofibrolar.component.html',
  styleUrls: ['./videonasofibrolar.component.css']
})
export class VideonasofibrolarComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
