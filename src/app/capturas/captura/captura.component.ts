import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Atendimento, Imagem, ProcedimentoAtendimento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { WebcamInitError, WebcamUtil, WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { ProcedimentoatendimentoService } from '../../zservice/procedimentoatendimento.service';
import { arch } from 'os';

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class CapturaComponent implements OnInit {
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  index: number;
  atendimento = new Atendimento();
  procedimento = new ProcedimentoAtendimento();
  atendimentos: any[];
  procedimentosAtd: any[];
  cont: number;
  atendimentoSelecionado: number;
  procedimentosAtdSelecionado: number;
  imagemant: any;
  verifica = false;
  item: number = 0;
  videos: any[];

  public errors: WebcamInitError[] = [];

  // latest snapshot
  webcamImage = new Array<Imagem>();

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
     // height: {ideal: 576}
  };

  constructor(private service: AtendimentoService,
              private rota: ActivatedRoute,
              private route: Router,
              private serviceproc: ProcedimentoatendimentoService,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    const codabreviatura = this.rota.snapshot.params.cod;
    if (codabreviatura) {

    }

    this.CarregarAtendimentos();
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  GravandoImagens() {
    this.procedimento.listaimagem.forEach((el) => {
      el.imagem = el.imagem.imageAsBase64.replace('data:image/jpeg;base64,', '');
    });

    try {
      this.serviceproc.AtualizarComImagens(this.procedimento);
      this.route.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
    }
  }

  PegarPagina(event) {
    this.item = event.page + 1;
  }

  ConfirmarExclusao(web: Imagem) {
    this.confirmation.confirm({
      message: 'Deseja Excluir esta Imagem?',
      accept: () => {
        this.Excluir(web);
      }
    });
  }

  Excluir(web: Imagem) {
    const campo = this.procedimento.listaimagem.indexOf(web);

    if (campo !== -1) {
      this.procedimento.listaimagem.splice(campo, 1);
      this.messageService.add({ severity: 'success', detail: 'Imagem excluída com sucesso!' });
    }
  }

  ConfigurarVariavel() {
    this.procedimento.listaimagem = new Array<Imagem>();
    this.cont = 1;
    this.verifica = true;

    this.atendimento.procedimentos.filter((elo) => {
      if (elo.codigo === this.procedimentosAtdSelecionado) {
        this.procedimento = elo;
        this.procedimento.codigoatdteste = this.atendimento.codigo;
        this.procedimento.listaimagem.forEach((el) => {
          this.serviceproc.PegarImagemString(el.codigo).subscribe(data => {
            const web = new WebcamImage(data, data, null);
            el.imagem = web;
          }, error => {
            console.log(error);
          });
        });
      }
    });
  }

  PegaAltura() {
    const alturaAtual = document.getElementById('divisoria').clientHeight;
    return alturaAtual;
  }

  PegaLargura() {
    const larguraAtual = document.getElementById('divisoria').clientWidth;
    const final = (larguraAtual / 2) + 250;
    return final;
  }

  public TiraFoto(): void {
    this.trigger.next();

    if (this.item === 0) {
      this.item = 1;
    }
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }



  public handleImage(webcamImage: WebcamImage): void {
    this.cont = this.procedimento.listaimagem.length + 1;
    const imagem = new Imagem();
    const nomeprocedimento = ('000' + this.procedimento.procedimentomedico.codigo).slice(-3);
    const contador = ('00' + this.cont).slice(-2);
    const extensao = '.jpeg';
    imagem.procedimentoatendimento.codigo = this.procedimento.codigo;
    imagem.nomeimagem = nomeprocedimento + contador;
    imagem.extensao = extensao;
    imagem.imagem = webcamImage;
    this.procedimento.listaimagem.push(imagem);

  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  CarregarAtendimentos() {
    this.service.ListarAtendimentos().then(lista => {
      this.atendimentos = lista.map(atendimento => ({label: atendimento.codigo + ' ' + atendimento.patient.patientname, value: atendimento.codigo}));

    }).catch(erro => erro);
  }

  CarregarProcedimentos() {
    this.service.BuscarPorId(this.atendimentoSelecionado)
      .then(
        response => {
          this.atendimento = response;
          this.procedimentosAtd = this.atendimento.procedimentos.map(procedimento => ({label: procedimento.procedimentomedico.nome, value: procedimento.codigo}));
        }
      );
  }

}
