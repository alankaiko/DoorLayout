import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Atendimento, Imagem, ProcedimentoAtendimento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { WebcamInitError, WebcamUtil, WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { ProcedimentoatendimentoService } from '../../zservice/procedimentoatendimento.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class CapturaComponent implements OnInit {
  atendimento = new Atendimento();
  procedimento = new ProcedimentoAtendimento();
  atendimentos: any[];
  procedimentosAtd: any[];
  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  errors: WebcamInitError[] = [];
  webcamImage = new Array<Imagem>();
  trigger: Subject<void> = new Subject<void>();
  nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  videoOptions: MediaTrackConstraints = {};
  deviceId: string;
  index: number;
  cont: number;
  imagemant: any;
  verifica = false;
  item = 0;
  videos: any[];
  paginafoto = 1;

  constructor(private service: AtendimentoService,
              private rota: ActivatedRoute,
              private route: Router,
              private serviceproc: ProcedimentoatendimentoService,
              private confirmation: ConfirmationService,
              private location: Location) { }

  ngOnInit() {
    const codigoatendimento = this.rota.snapshot.params.codigoatendimento;
    const codigoprocedimento = this.rota.snapshot.params.codigoprocedimento;

    this.CarregarAtendimentos();

    if (codigoatendimento)
      this.BuscarProcedimento(codigoatendimento);

   
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  BuscarProcedimento(codigo: number) {
    this.serviceproc.BuscarPorId(codigo)
      .then(procedimento => {
        this.procedimento = procedimento;
        this.BuscarAtendimento(procedimento.atendimento.codigo);
        this.BuscarImagens();
      }).catch(erro => erro);
  }

  BuscarAtendimento(codigo: number) {
    this.service.BuscarPorId(codigo)
      .then(atendimento => {
        this.atendimento = atendimento;
        this.CarregarProcedimentos();
      }).catch(erro => erro);
  }

  CarregarAtendimentos() {
    this.service.ListarAtendimentos().then(lista => {
      this.atendimentos = lista.map(atendimento => ({label: atendimento.codigo + ' ' + atendimento.paciente.nome, value: atendimento}));
    }).catch(erro => erro);
  }

  CarregarProcedimentos() {
    this.procedimentosAtd = this.atendimento.procedimentos.map(procedimento => ({label: procedimento.procedimentomedico.nome, value: procedimento}));
  }

  GravandoImagens() {
    if(this.verifica === false)
      return;

    this.procedimento.listaimagem.forEach((el) => {
      el.imagem = el.imagem.imageAsBase64.replace('data:image/jpeg;base64,', '');
    });

    try {
      this.procedimento.codigoatdteste = this.atendimento.codigo;
      this.serviceproc.AtualizarComImagens(this.procedimento);
      this.route.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  PegarPagina(event){
    this.paginafoto = event + 1;
  }

  FotoAnterior() {
    if(this.paginafoto > 1)
      this.paginafoto--;
  }

  FotoPosterior() {
    if (this.paginafoto < this.procedimento.listaimagem.length)
      this.paginafoto++;
  }

  ConfirmarExclusao() {
    this.confirmation.confirm({
      message: 'Deseja Excluir esta Imagem?',
      accept: () => {
        this.Excluir(this.paginafoto - 1);
      }
    });
  }

  Excluir(codigo: number) {
    this.procedimento.listaimagem.splice(codigo, 1);
    this.verifica = true;
  }

  BuscarImagens() {
    this.procedimento.listaimagem.forEach((el) => {
      if(el.imagem !== null)
        return;

      this.serviceproc.PegarImagemString(el.codigo).subscribe(data => {
        const web = new WebcamImage(data, data, null);
        el.imagem = web;
      }, error => {
        console.log(error);
      });
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

    this.verifica = true;
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
    imagem.dicom = false;
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

  MostrarLaudo() {
    this.route.navigate(['operacoes/laudos', this.procedimento.codigo]);
  }

  Voltar() {
    this.location.back();
  }
}