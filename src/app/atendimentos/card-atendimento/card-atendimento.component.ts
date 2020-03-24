import { Atendimento } from './../../core/model';
import { Router } from '@angular/router';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-atendimento',
  templateUrl: './card-atendimento.component.html',
  styleUrls: ['./card-atendimento.component.css']
})
export class CardAtendimentoComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('atend') atendimento: Atendimento;
  visible: boolean = true;

  constructor(private service: AtendimentoService,
              private route: Router) { }

  ngOnInit() {
  }

  Excluir(atendimento: Atendimento) {
    try {
      this.service.Remover(atendimento.codigo);
      alert(atendimento.patient.patientname + ' foi excluído');
      this.route.navigate(['/operacoes/atendimento']);
      this.visible = false;
      setTimeout (() => this.visible = true, 0);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }
}
