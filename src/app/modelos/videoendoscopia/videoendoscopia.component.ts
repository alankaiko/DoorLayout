import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videoendoscopia',
  templateUrl: './videoendoscopia.component.html',
  styleUrls: ['./videoendoscopia.component.css']
})
export class VideoendoscopiaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
  }

}
