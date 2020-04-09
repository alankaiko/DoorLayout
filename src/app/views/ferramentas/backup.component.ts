import { BackupService } from './../../zservice/backup.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  constructor(private service: BackupService) {
  }

  ngOnInit() {

  }

  Solicitar() {
    this.service.CriarBackup();
  }

}


