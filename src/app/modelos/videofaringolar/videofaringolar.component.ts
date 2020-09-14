import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videofaringolar',
  templateUrl: './videofaringolar.component.html',
  styleUrls: ['./videofaringolar.component.css']
})
export class VideofaringolarComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
