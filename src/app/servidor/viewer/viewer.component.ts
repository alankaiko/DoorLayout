import { MenuItem } from 'primeng/api';
import { InstanceService } from './../../zservice/instance.service';
import { ServidorService } from './../../zservice/servidor.service';
import { TagImagemGamb, Instancia } from './../../core/model';
import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';
import {Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


const config = {
  webWorkerPath: '/assets/cornerstoneWADOImageLoaderWebWorker.js',
  taskConfiguration: {
    decodeTask: {
        codecsPath: '/assets/cornerstoneWADOImageLoaderCodecs.js'
    }
  }
};

cornerstoneWADOImageLoader.webWorkerManager.initialize(config);

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  windowings: MenuItem[];
  annotates: MenuItem[];
  rotates: MenuItem[];
  display: boolean;
  instancia: Instancia;
  tagsimagems: TagImagemGamb[];

  constructor(private route: ActivatedRoute,
              private service: ServidorService,
              private serviceInst: InstanceService,
              private location: Location) {}

  ngOnInit() {
    const codigo = this.route.snapshot.params.cod;
    this.CriarMenu();
    this.ConfigureCornerBase();
    this.IniciarToolsBasicos();
    this.BuscarInstanciaResumida(codigo);
  }

  CriarMenu() {
    this.windowings = [
      {
          label: 'Windowing',
          icon: 'fa fa-adjust',
          command: () => {
            this.AtivarToolEsp('bright');
          }
      },
      {
          label: 'Invert',
          icon: 'fa fa-eercast',
          command: () => {
            this.AtivarToolEsp('invert');
          }
      }
    ];

    this.annotates = [
      {
        label: 'RectangleRoi',
        icon: 'fa fa-2x fa-square',
        command: () => {
          this.AtivarToolEsp('rectangleRoi');
        }
      },
      {
        label: 'Length',
        icon: 'fa fa-arrows-v',
        command: () => {
          this.AtivarToolEsp('length');
        }
      },
      {
        label: 'Cobb',
        icon: 'fa fa-expand',
        command: () => {
          this.AtivarToolEsp('cobb');
        }
      },
      {
      label: 'Angle',
      icon: 'fa fa-2x fa-angle-left',
        command: () => {
          this.AtivarToolEsp('angle');
        }
      },
        {
        label: 'Text',
        icon: 'fa fa-2x fas fa-font',
        command: () => {
          this.AtivarToolEsp('text');
        }
      },
      {
        label: 'Elliptical',
        icon: 'fa fa-circle-o',
        command: () => {
          this.AtivarToolEsp('elliptical');
        }
      },
      {
        label: 'Bi-Directional',
        icon: 'fa fa-plus',
        command: () => {
          this.AtivarToolEsp('bi-directional');
        }
      },
      {
        label: 'Arrow',
        icon: 'fa fa-long-arrow-left',
        command: () => {
          this.AtivarToolEsp('arrow-annotation');
        }
      },
      {
        label: 'Probe',
        icon: 'fa fa-dot-circle-o',
        command: () => {
          this.AtivarToolEsp('probe');
        }
      }
    ];

    this.rotates = [
      {
        label: 'Rotate',
        icon: 'fa fa-rotate-right',
        command: () => {
          this.AtivarToolEsp('rotate');
        }
      },
      {
        label: 'HFlip',
        icon: 'fa fa-shield fa-flip-horizontal',
        command: () => {
          this.AtivarToolEsp('hFlip');
        }
      },
      {
        label: 'VFlip',
        icon: 'fa fa-shield fa-flip-vertical',
        command: () => {
          this.AtivarToolEsp('vFlip');
        }
      }
    ];
  }

  ConfigureCornerBase() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

    cornerstoneTools.init();
  }

  MostrarTabela() {
    this.BuscarTabeladeTags(this.instancia.tagimagem);
    this.display = true;
  }

  RecuperarPng() {
    const element = document.querySelector('.image-canvas');
    this.CriarPng(element, 'testou');
  }

  BuscarTabeladeTags(codigo) {
    return this.serviceInst.BuscarTagImgGamb(codigo)
      .then(response => { this.tagsimagems = response; } );
  }

  BuscarInstanciaResumida(idinstance: number, ) {
    this.serviceInst.ResumoProDicom(idinstance)
      .then(
        instance => {
          this.instancia = instance;
          this.CriarTelaVisualizarDicom(instance.mediastoragesopinstanceuid);
        }
      );
  }

  CriarTelaVisualizarDicom(instanceuid: string) {
    const element = document.querySelector('.image-canvas');
    const DCMPath = this.service.BuscarUrlBuscaImagem(instanceuid);
    cornerstone.enable(element);

    cornerstone.loadAndCacheImage('wadouri:' + DCMPath).then(imageData => {
      cornerstone.displayImage(element, imageData);
    }).catch( error => { console.error(error); });
    // cornerstoneWADOImageLoader.wadouri.fileManager.remove(imageID);
    localStorage.setItem('debug', 'cornerstoneTools');
  }

  public IniciarToolsBasicos() {
    const that = this;
    let itemsProcessed = 0;

    const imageId = 'image-canvas';
    const diacomImageElement = document.getElementById(imageId);
    cornerstone.enable(diacomImageElement);
    const PanTool = cornerstoneTools.PanTool;

    cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
    cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
    cornerstoneTools.addTool(cornerstoneTools.PanTool);
    cornerstoneTools.addTool(cornerstoneTools.AngleTool);
    cornerstoneTools.addTool(cornerstoneTools.RectangleRoiTool);
    cornerstoneTools.addTool(cornerstoneTools.MagnifyTool);
    const configuration = {
      markers: ['F5', 'F4', 'F3', 'F2', 'F1'],
      current: 'F5',
      ascending: true,
      loop: true,
    };
    cornerstoneTools.addTool(cornerstoneTools.TextMarkerTool, { configuration });
    itemsProcessed++;
  }

  AtivarToolEsp(tool: string ) {
    const diacomImageElement = document.getElementById('image-canvas');
    if (tool === 'bright') {
      cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
    }
    if (tool === 'zoom') {
      cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
    }
    if (tool === 'pan') {
      cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
    }
    if (tool === 'angle') {
      cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 });
    }
    if (tool === 'rectangleRoi') {
      cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 });
    }
    if (tool === 'invert') {
      const viewport = cornerstone.getViewport(diacomImageElement);
      viewport.invert = !viewport.invert;
      cornerstone.setViewport(diacomImageElement, viewport);
    }
    if (tool === 'elliptical') {
      const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
      cornerstoneTools.addTool(EllipticalRoiTool);
      cornerstoneTools.setToolActive('EllipticalRoi', { mouseButtonMask: 1 });
    }
    if (tool === 'bi-directional') {
      const BidirectionalTool = cornerstoneTools.BidirectionalTool;
      cornerstoneTools.addTool(BidirectionalTool);
      cornerstoneTools.setToolActive('Bidirectional', { mouseButtonMask: 1 });
    }
    if (tool === 'arrow-annotation') {
      const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;
      cornerstoneTools.addTool(ArrowAnnotateTool);
      cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 });
    }
    if (tool === 'dragprobe') {
      const DragProbeTool = cornerstoneTools.DragProbeTool;
      cornerstoneTools.addTool(DragProbeTool);
      cornerstoneTools.setToolActive('DragProbe', { mouseButtonMask: 1 });
    }
    if (tool === 'probe') {
      const ProbeTool = cornerstoneTools.ProbeTool;
      cornerstoneTools.addTool(ProbeTool);
      cornerstoneTools.setToolActive('Probe', { mouseButtonMask: 1 });
    }
    if (tool === 'length') {
      const LengthTool = cornerstoneTools.LengthTool;
      cornerstoneTools.addTool(LengthTool);
      cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
    }
    if (tool === 'cobb') {
      const CobbAngleTool = cornerstoneTools.CobbAngleTool;
      cornerstoneTools.addTool(CobbAngleTool);
      cornerstoneTools.setToolActive('CobbAngle', { mouseButtonMask: 1 });
    }
    if (tool === 'magnify') {
      cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 });
    }
    if (tool === 'text') {
      cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 });
    }
    if (tool === 'rotate') {
      const RotateTool = cornerstoneTools.RotateTool;
      cornerstoneTools.addTool(RotateTool);
      cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 });
    }
    if (tool === 'hFlip') {
      const viewport = cornerstone.getViewport(diacomImageElement);
      viewport.hflip = !viewport.hflip;
      cornerstone.setViewport(diacomImageElement, viewport);
    }
    if (tool === 'vFlip') {
      const viewport = cornerstone.getViewport(diacomImageElement);
      viewport.vflip = !viewport.vflip;
      cornerstone.setViewport(diacomImageElement, viewport);
    }
    if (tool === 'reset') {
      cornerstone.reset(diacomImageElement);
    }
  }

  CriarPng(element, filename) {
    const mimetype = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image/png';
    const canvas = element.querySelector('canvas');

    if (canvas.msToBlob) {
      const blob = canvas.msToBlob();
      return window.navigator.msSaveBlob(blob, filename);
    }

    const lnk = document.createElement('a');
    lnk.href = canvas.toDataURL(mimetype, 1);
    lnk.download = filename;

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      lnk.dispatchEvent(e);
    }
  }

  PegaAltura() {
    const alturaAtual = document.getElementById('image-canvas').clientHeight;
    return alturaAtual;
  }

  backClicked() {
    this.location.back();
  }

}
