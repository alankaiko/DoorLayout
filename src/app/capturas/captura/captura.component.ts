import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Atendimento, Imagem, ProcedimentoMedico, ProcedimentoAtendimento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { WebcamInitError, WebcamUtil, WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { ProcedimentoatendimentoService } from '../../zservice/procedimentoatendimento.service';

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

  public errors: WebcamInitError[] = [];

  // latest snapshot
  webcamImage = new Array<WebcamImage>();

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
     // height: {ideal: 576}
  };

  constructor(private service: AtendimentoService,
              private serviceproc: ProcedimentoatendimentoService,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.CarregarAtendimentos();
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  GravandoImagens() {
    this.webcamImage.forEach( (element) => {
      this.CriarNomeImagens(element);
    });

    this.atendimento.procedimentos.filter((element) => {
      if (element.codigo === this.procedimento.codigo) {
        const val = this.atendimento.procedimentos.indexOf(element);
        this.atendimento.procedimentos[val] = this.procedimento;
        this.serviceproc.Atualizar(this.procedimento);
      }
    });
  }

  CriarNomeImagens(web: WebcamImage) {
    this.cont++;
    const imagem = new Imagem();
    const nomeprocedimento = ('000' + this.procedimento.procedimentomedico.codigo).slice(-3);
    const contador = ('00' + this.cont).slice(-2);
    const extensao = '.jpeg';
    imagem.procedimentoatendimento.codigo = this.procedimento.codigo;
    imagem.nomeimagem = nomeprocedimento + contador;
    imagem.extensao = extensao;
    imagem.imagem = web.imageAsBase64;
    this.procedimento.listaimagem.push(imagem);
  }

  ConfirmarExclusao(web: WebcamImage) {
    this.confirmation.confirm({
      message: 'Deseja Excluir esta Imagem?',
      accept: () => {
        this.Excluir(web);
      }
    });
  }

  Excluir(web: WebcamImage) {
    const campo = this.webcamImage.indexOf(web);

    if (campo !== -1) {
      this.webcamImage.splice(campo, 1);
      this.messageService.add({ severity: 'success', detail: 'Abreviatura excluída com sucesso!' });
    }
  }

  ConfigurarVariavel(procedimentoatdselecionado) {
    this.webcamImage = new Array<WebcamImage>();
    this.cont = 1;

    this.atendimento.procedimentos.filter((element) => {
      if (element.codigo === procedimentoatdselecionado) {
        this.procedimento = element;
        element.listaimagem.forEach((im) => {
          this.webcamImage.push(im.imagem);
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
    return larguraAtual;
  }

  public TiraFoto(): void {
    this.trigger.next();
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
    this.index = this.webcamImage.length;
    this.webcamImage[this.index] = webcamImage ;
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
      this.atendimentos = lista.map(atendimento => ({label: 'atend: ' + atendimento.codigo + ' ' + atendimento.patient.patientname, value: atendimento.codigo}));
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
