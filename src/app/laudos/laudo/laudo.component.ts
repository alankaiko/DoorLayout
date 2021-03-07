import { ImagemService } from './../../zservice/imagem.service';
import { TextolivreComponent } from './../../modelosdetexto/textolivre/textolivre.component';
import { ModelodelaudodoprocService } from './../../zservice/modelodelaudodoproc.service';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { PaginaimagensComponent } from './../paginaimagens/paginaimagens.component';
import { ParametrodosistemaService } from './../../zservice/parametrodosistema.service';
import { isEmptyObject } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento, ProcedimentoAtendimento, ModeloDeLaudoDoProc, Laudo, Imagem, LAYOUT_IMG } from './../../core/model';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-laudo',
  templateUrl: './laudo.component.html',
  styleUrls: ['./laudo.component.css']
})
export class LaudoComponent implements OnInit {
  @ViewChild(TextolivreComponent) textolivrechild: TextolivreComponent;
  @ViewChild(PaginaimagensComponent) paginaimagenschild: PaginaimagensComponent;
  imagelogo: any;
  atendimentos: any[];
  testeimagems: Array<Imagem>;
  procedimentosAtd: any[];
  atendimento = new Atendimento();
  procedimento = new ProcedimentoAtendimento();
  modelodelaudodoproc = new Array<ModeloDeLaudoDoProc>();
  modelodelaudo: any[];
  prioridade: number;
  dropmodelo = false;
  conferindo = false;
  abrirpaginaimg = false;

  constructor(private service: AtendimentoService,
              private serviceproc: ProcedimentoatendimentoService,
              private servicemodelo: ModelodelaudodoprocService,
              private rota: ActivatedRoute,
              private route: Router,
              private servicoparametro: ParametrodosistemaService,
              private location: Location,
              private serviceimg: ImagemService) { }

  ngOnInit(): void {
    const codigo = this.rota.snapshot.params.cod;

    this.CarregarAtendimentos();
    this.getImagemFromService();

    if (codigo) {
      this.BuscarProcedimento(codigo);
    }
  }

  BuscarProcedimento(codigo: number) {
    this.serviceproc.BuscarPorId(codigo)
      .then(procedimento => {
        this.procedimento = procedimento;
        this.BuscarAtendimento(procedimento.atendimento.codigo);
        this.RenderizarModeloLaudo();
        this.AbrirLaudo();
        this.RoteandoImagens();
        this.BuscandoModelosLaudo(codigo);

        this.testeimagems = this.procedimento.listaimagem;
      }).catch(erro => erro);
  }

  BuscarAtendimento(codigo: number) {
    this.service.BuscarPorId(codigo)
      .then(atendimento => {
        this.atendimento = atendimento;
        this.CarregarProcedimentos();
        this.serviceimg.ListarPorCodigouid(this.atendimento.paciente.estudos[0].series[0].instancias[0].mediastoragesopinstanceuid).then(response => response);
      }).catch(erro => erro);
  }

  CarregaAtendimento(codigo: number) {
    this.service.BuscarPorId(codigo)
      .then(atendimento => {
        this.atendimento = atendimento;
        this.CarregarProcedimentos();
      }).catch(erro => erro);
  }

  AtivarModelo() {
    this.dropmodelo = true;
  }

  CarregarAtendimentos() {
    this.service.ListarAtendimentos().then(lista => {
      this.atendimentos = lista.map(atendimento => ({label: 'atend: ' + atendimento.codigo + ' ' + atendimento.paciente.nome, value: atendimento.codigo}));
    }).catch(erro => erro);
  }

  CarregarProcedimentos() {
    this.service.BuscarProcedimentosPorAt(this.atendimento.codigo)
      .then(
        response => {
          this.atendimento = response;
          this.procedimentosAtd = this.atendimento.procedimentos.map(procedimento => ({label: procedimento.procedimentomedico.nome, value: procedimento.codigo}));
        }
      );

    this.BuscarImagensDicom();
  }

  BuscandoModelosLaudo(codigo) {
    this.servicemodelo.BuscarPelaIdProcedimento(codigo)
      .then(
        resp => {
          this.modelodelaudodoproc = resp;
          this.prioridade = this.modelodelaudodoproc[0].prioridade;
          this.modelodelaudo = resp.map(modelo => ({label: modelo.descricao, value: modelo.prioridade}));

          this.FiltrandoProcedimento();
          this.RenderizarModeloLaudo();
          this.RoteandoImagens();
        }
      );
  }

  RoteandoImagens() {
    this.procedimento.listaimagem.forEach(elo => {
      this.serviceproc.PegarImagemString(elo.codigo).subscribe(data => {
        elo.imagem = data;
      }, error => {
        console.log(error);
      });
    });
  }

  FiltrandoProcedimento() {
    this.atendimento.procedimentos.filter(elo => {
      if (elo.codigo === this.procedimento.codigo) {
        this.procedimento = elo;
      }
    });
  }

  RenderizarModeloLaudo() {
    if (isEmptyObject(this.procedimento.laudo)) {
      this.procedimento.laudo = new Laudo();
      this.conferindo = true;
      this.AbrirLaudo();
    } else {
      this.conferindo = true;
    }
  }

  Salvar() {
    this.serviceproc.AtualizarComPaginas(this.procedimento);
    this.ImprimirDocumento();
  }

  AbrirLaudo() {
    this.modelodelaudodoproc.filter(elo => {
      if (elo.prioridade === this.prioridade) {
        this.procedimento.laudo.camposdolaudo.campo1 = elo.customstring;
      }
    });

    setTimeout(() => {
      this.dropmodelo = false;
    }, 5);
  }

  getImagemFromService() {
    this.servicoparametro.PegarImagem(1).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagelogo = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  EscolherImagens() {
    if (this.atendimento?.codigo != null && !isEmptyObject(this.procedimento.listaimagem)) {
      this.conferindo = false;
      this.abrirpaginaimg = true;
    }
  }

  AbrirTelaCaptura() {
    this.route.navigate(['operacoes/captura', this.procedimento.codigo]);
  }

  EscolherLaudo() {
    this.procedimento.listaimagem = this.testeimagems;
    this.abrirpaginaimg = false;
    this.conferindo = true;
  }

  private BuscarImagensDicom() {
    this.atendimento.paciente.estudos.forEach(estudo => {
      estudo.series.forEach(serie => {
        serie.instancias.forEach(instancia => {
          this.serviceimg.ListarPorCodigouid(instancia.mediastoragesopinstanceuid).then(response => {
            this.serviceproc.PegarImagemString(response.codigo).subscribe(data => {
              response.imagem = data;
            });

            this.procedimento.listaimagem.push(response);
          });
        });
      });
    });
  }

  ImprimirDocumento() {
    const win = window.open();
    win.document.write(this.ConfigurarCabecalho());
    win.document.write(this.ConfigurarLaudo());

    this.PegarImagemPraImpressao();

    setTimeout(() => {
      this.procedimento.paginadeimagens.forEach(elo => {
        win.document.write(this.ConfigurarPaginaImg(this.procedimento.paginadeimagens.indexOf(elo)));
      });
    }, 25);

    setTimeout(() => {
      win.document.write(this.ConfigurarRodape());
      win.document.close();
      win.print();
    }, 50);
  }

  PegarImagemPraImpressao() {
    this.procedimento.paginadeimagens.forEach(elo => {
      elo.imagemimpressa.forEach(alo => {
        this.serviceproc.PegarImagemString(alo.imagem.codigo).subscribe(data => {
          alo.imagem.imagem =  data;
        }, error => {
          console.log(error);
        });
      });
    });
  }

  private ConfigurarCabecalho() {
    return '<div class="page-header" style="text-align: center; margin: 0 auto; height: 230px; position: fixed; top: 0mm; width: 93%; background-color: white;">'
          +   '<div style="width: 100%;" class="logotip">'
          +     '<img id="imagemtopomenu" style="width: 150px; height: 100px;" src="' + this.imagelogo + '">'
          +   '</div>'

          +   '<div class="cabecalho" id="cabecalho" style="width: 100%; margin: 0 auto; text-align: center; border-top: 2px solid #000000; border-bottom: 2px solid #000000; margin-top: 10px; padding-top: 5px; padding-bottom: 5px;">'
          +     '<div id="linha1" style="width: 98%; display: inline-flex;">'
          +       '<span style="width: 50%; text-align: left; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">PACIENTE: ' + this.atendimento.paciente.nome.toUpperCase() + '</span>'
          +       '<span style="width: 50%; text-align: right; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">ATENDIMENTO: ' + this.ConfereAtendimento() + '</span>'
          +     '</div>'

          +     '<div id="linha2" style="width: 98%; display: inline-flex;">'
          +       '<span style="width: 50%; text-align: left; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Data Atendimento: ' + this.atendimento.dataatendimento + '</span>'
          +       '<span style="width: 50%; text-align: right; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Data Nasc: ' + this.atendimento.paciente.datanasc + ' Idade: ' + this.atendimento.paciente.idade + '</span>'
          +     '</div>'

          +     '<div id="linha3" style="width: 98%; display: inline-flex;">'
          +       '<span style="width: 50%; text-align: left; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Dr. SOL.: ' + this.atendimento.solicitante.nome + '</span>'
          +       '<span style="width: 50%; text-align: right; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Convênio: ' + this.atendimento.convenio.nome + '</span>'
          +     '</div>'
          +   '</div>'

          +   '<div class="labelprocedimento" id="labelprocedimento" style="width: 93%; margin: 0 auto; text-align: center; background-color: #cfcfcf; margin-top: 30px;">'
          +     '<span id="labelproc" style="text-transform: uppercase; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">' + this.ConfigurarLabelProcedimento() + '</span>'
          +   '</div>'
          + '</div>';
  }

  private ConfereAtendimento() {
    return ('0000000' + this.atendimento.codigo).slice(-7);
  }

  private ConfigurarLabelProcedimento() {
    let proc;
    this.procedimentosAtd.forEach(elo => {
      if (elo.value === this.procedimento.codigo) {
        proc = elo.label;
      }
    });

    return proc;
  }

  private ConfigurarLaudo() {
    return  '<table>'
      +       '<thead>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page-header-space" style="height: 230px;"></div>'
      +           '</td>'
      +         '</tr>'
      +       '</thead>'

      +       '<tbody>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page" style="width: 93%; margin: 0 auto;">' + this.procedimento.laudo.camposdolaudo.campo1 + '</div>'
      +           '</td>'
      +         '</tr>'
      +         '<tr>'
      +           '<td>'
      +             '<div style="width: 100%; padding-top: 20px;">'
      +               '<div class="assinatura" id="assinatura" style="width: 40%; text-align: center; border-top: 1px solid; margin-top: 80px; margin: 0 auto;">'
      +                 '<span id="labelassinatura">' + this.ConfigurarAssinatura() + '</span>'
      +               '</div>'
      +             '</div>'
      +           '</td>'
      +         '</tr>'
      +       '</tbody>'

      +       '<tfoot>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page-footer-space" style="height: 25px;"></div>'
      +           '</td>'
      +         '</tr>'
      +       '</tfoot>'
      +      '</table>';
  }

  private ConfigurarPaginaImg(posicao: number) {
    return  '<table style="page-break-after: always;">'
      +       '<thead>'
      +         '<tr>'
      +           '<td style="page-break-after: always;">'
      +             '<div class="page-header-space" style="height: 230px;"></div>'
      +           '</td>'
      +         '</tr>'
      +       '</thead>'

      +       '<tbody>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page" style="width: 210mm; margin: 0 auto; margin-top: 2px; flex-direction: row; justify-content: center; align-items: center">' + this.SalvarPagina(posicao) + '</div>'
      +           '</td>'
      +         '</tr>'
      +       '</tbody>'

      +       '<tfoot>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page-footer-space" style="height: 25px;"></div>'
      +           '</td>'
      +         '</tr>'
      +       '</tfoot>'
      +      '</table>';
  }

  private ConfigurarAssinatura() {
    return 'MÉDICO EXECUTANTE <br>'
      + this.atendimento.solicitante.conselho.sigla.descricao + ' '
      + this.atendimento.solicitante.conselho.estado.uf + ' '
      + this.atendimento.solicitante.conselho.descricao;
  }

  ConfigurarRodape() {
    return  '<div class="page-footer" style="height: 25px; position: fixed; bottom: 0; width: 93%; border-top: 1px solid black; text-align: center; border-top: 1px solid #000; background-color: white;">'
      +       '<span id="labelrodape">Para adquirir este software acesse www.novaopcaomed.com.br (62)3643-6264</span>'
      +     '</div>';
  }

  SalvarPagina(posicao: number) {
    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_1_GRANDE) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto1grande">'
                    + '<img style="width: 140mm; height: 105mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_1_MEDIA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 61mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto1media">'
                    + '<img style="width:100mm; height: 73mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_2_GRANDE) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 10mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto2grande">'
                    + '<img style="width: 140mm; height: 105mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto2grande">'
                    + '<img style="width: 140mm; height: 105mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_2_MEDIA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 45mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto2media">'
                    + '<img style="width: 100mm; height: 73mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab2" style="display: block" class="foto2media">'
                    + '<img style="width: 100mm; height: 73mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_3_MEDIA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 15mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto3media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab2" style="display: block" class="foto3media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab3" style="display: block" class="foto3media">'
                    +  '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_4_GRANDE) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 50mm; width: 190mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_4_MEDIA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 55mm; width: 170mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_4_PEQUENA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 140mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_6_GRANDE) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 10mm; width: 190mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_6_MEDIA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 15mm; width: 170mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_8_GRANDE) {
      return  '<div>'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[6].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[7].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_8_PEQUENA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 10mm; width: 140mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[6].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[7].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_9_PEQUENA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[6].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[7].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab9" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[8].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_12_PEQUENA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 30mm; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[6].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[7].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab9" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[8].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab10" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[9].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab11" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[10].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab12" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[11].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.procedimento.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_15_PEQUENA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 5mm; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[6].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[7].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab9" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[8].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab10" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[9].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab11" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[10].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab12" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[11].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab13" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[12].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab14" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[13].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab15" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.procedimento.paginadeimagens[posicao].imagemimpressa[14].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }
  }

  Voltar() {
    this.location.back();
  }
}
