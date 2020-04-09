import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Editor } from 'primeng/editor';


declare var Quill: any;

@Component({
  selector: 'app-laudo',
  templateUrl: './laudo.component.html',
  styleUrls: ['./laudo.component.css']
})
export class LaudoComponent implements OnInit {

  ngOnInit() {

  }


  constructor() {

  }

  teste() {
    const ele = document.querySelector('alfa');
    const win = window.open();
    win.document.write(ele.textContent);
    win.document.close();
    win.print();
  }

}
