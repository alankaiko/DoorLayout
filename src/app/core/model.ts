export class Study {
  idstudy: number;
  accessionnumber: string;
  studyid: string;
  studyinstanceuid: string;
  studydescription: string;
  studydatetime: Date;
  referringphysicianname: string;
  studypriorityid: string;
  studystatusid: string;
  additionalpatienthistory: string;
  admittingdiagnosesdescription: string;
  datecreate: Date;
  datemodify: Date;
  patient = new Patient();
  series = new Array<Series>();
}

export class Series {
  idseries: number;
  seriesinstanceuid: string;
  seriesdescription: string;
  seriesnumber: number;
  patientposition: string;
  bodypartexamined: string;
  laterality: string;
  operatorsname: string;
  protocolname: string;
  seriesdatetime: Date;
  datecreate: Date;
  datemodify: Date;
  study = new Study();
  dispositive = new Dispositive();
  instance = new Array<Instance>();
}

export class Patient {
  idpatient: number;
  patientid: string;
  patientname: string;
  birthday: Date;
  patientage: string;
  patientsex: string;
  studyes = new Array<Study>();
  endereco = new Endereco();
  contato = new Contato();
  datecreate: Date;
  datemodify: Date;
  observacoes: string;
}

export class Instance {
  idinstance: number;
  instancenumber: number;
  patientorientation: string;
  mediastoragesopinstanceuid: string;
  sopinstanceuid: string;
  sopclassuid: string;
  transfersyntaxuid: string;
  acquisitiondatetime: Date;
  imagetype: string;
  pixelspacing: number;
  imageorientation: string;
  xraytubecurrent: number;
  exposuretime: number;
  kvp: string;
  slicelocation: number;
  slicethickness: number;
  imageposition: string;
  windowcenter: string;
  windowwidth: string;
  contentdatetime: Date;
  datecreate: Date;
  datemodify: Date;
  series = new Series();
  tagimagem = new Tagimagem();
}

export class Dispositive {
  iddispositive: number;
  institutionname: string;
  institutionaddress: string;
  institutionaldepartmentname: string;
  modality: string;
  conversiontype: string;
  manufacturer: string;
  manufacturermodelname: string;
  stationname: string;
  deviceserialnumber: string;
  softwareversion: string;
  datecreation: Date;
  datemodify: Date;
  series = new Series();
}

export class Abreviatura {
  codigo: number;
  titulo: string;
  texto: string;
}

export class CID10 {
  codigo: number;
  sku: string;
  nome: string;
}

export class CBHPM {
  codigo: number;
  sku: string;
  procedimento: string;
  porte: string;
  valorporte: string;
  custooperacional: string;
  nauxiliares: number;
  porteanest: string;
  valortotal: string;
  filmes: number;
  incidencia: number;
  unidrdfarmaco: string;
  subgrupo = new SubgrupoCBHPM();
}

export class SubgrupoCBHPM {
  codigo: number;
  sku: string;
  subgrupo: string;
  grupo = new GrupoCBHPM();
}

export class GrupoCBHPM {
  codigo: number;
  sku: string;
  grupo: string;
}

export class CNES  {
  codigo: number;
  sku: string;
  razaosocial: string;
  nomefantasia: string;
  cnpj: string;
  cpf: string;
  codmunicipio: string;
  municipio: string;
}

export class Contato {
  email: string;
  telefone: string;
  telefone2: string;
  celular: string;
}

export class Convenio {
  codigo: number;
  nome: string;
  nomedocontato: string;
  telefone: string;
  fax: string;
  ativo: boolean;
  email: string;
  observacoes: string;
  numcopiasdolaudo: number;
  endereco = new Endereco();
}

export class Endereco {
  logradouro: string;
  complemento: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export class Crm {
  codigo: number;
  crm: string;
  nome: string;
  especialidades = [];
}

export class EspecialidadeMedica {
  codigo: number;
  nome: string;
}

export class GrupoCID10 {
  codigo: number;
  codigotexto: string;
  nome: string;
  capitulocid10 = new CapituloCID10();
}

export class CategoriaCID10 {
  codigo: number;
  codigotexto: string;
  nome: string;
  grupocid10 = new GrupoCID10();
}

export class SubcategoriaCid10 {
  codigo: number;
  codigotexto: string;
  nome: string;
  nome50: string;
  restrsexo: string;
  classificacao: string;
  causaobito: string;
  referencia: string;
  excluidos: string;
  categoriacid10 = new CategoriaCID10();
}

export class CapituloCID10 {
  codigo: number;
  codigotexto: string;
  nome: string;
}

export class GrupoProcedimento {
  codigo: number;
  nomegrupo: string;
}

export class ProcedimentoMedico {
  codigo: number;
  nome: string;
  diasparaentregadolaudo: string;
  margemtop: number;
  margembottom: number;
  restricaosexo: string;
  imagem1: string;
  imagem2: string;
  laudomodelo: boolean;
  grupo = new GrupoProcedimento();
}

export class Imagem {
  codigo: number;
  caminho: string;
  nomeimagem: string;
  extensao: string;
  imagem: any;
  procedimentoatendimento = new ProcedimentoAtendimento();
}

export class ProfissionalExecutante {
  codigo: number;
  nome: string;
  numnoconselho: string;
  contato = new Contato();
  endereco = new Endereco();
  conselho = new TissConselho();
  frasepessoal: string;
  asswidth: number;
  assheight: number;
  espacoass: number;
}

export class TissConselho {
  codigo: number;
  sigla = new Sigla();
  descricao: string;
  estado = new Estado();
}

export class ProfissionalSolicitante {
  codigo: number;
  nome: string;
  numnoconselho: string;
  conselho = new TissConselho();
}

export class TabelaDeProcedimentos {
  codigo: number;
  convenio = new Convenio();
}

export class TextoPessoal {
  codigo: number;
  abreviatura: string;
  texto: string;
}

export class Tagimagem {
  codigo: number;
  imagetype: string;
  sopclassuid: string;
  sopinstanceuid: string;
  studydate: string;
  seriesdate: string;
  acquisitiondate: string;
  contentdate: string;
  studytime: string;
  seriestime: string;
  acquisitiontime: string;
  contenttime: string;
  accessionnumber: string;
  modality: string;
  presentationintenttype: string;
  manufacturer: string;
  institutionname: string;
  institutionaddress: string;
  referringphysiciansname: string;
  stationname: string;
  studydescription: string;
  seriesdescription: string;
  institutionaldepartmentname: string;
  performingphysiciansname: string;
  operatorsname: string;
  manufacturersmodelname: string;
  referencedpatientsequence: string;
  anatomicregionsequence: string;
  primaryAnatomicstructuresequence: string;
  patientsname: string;
  patientid: string;
  softwareversions: string;
  imagerpixelspacing: string;
  positionertype: string;
  detectortype: string;
  detectordescription: string;
  detectormode: string;
  timeoflastdetectorcalibration: string;
  samplesperpixel: string;
  photometricinterpretation: string;
  rows: string;
  columns: string;
}

export class TagImagemGamb {
  tag: string;
  indentificacao: string;
  campo: string;
}

export class Atendimento {
  codigo: number;
  patient = new Patient();
  convenio = new Convenio();
  solicitante = new ProfissionalSolicitante();
  procedimentos = new Array<ProcedimentoAtendimento>();
  dataatendimento: Date;
  datacadastro: Date;
  observacoes: string;
  codigoprofexecutante: number;
  codigodecid: number;
  dataatestado: Date;
}

export class ProcedimentoAtendimento {
  codigo: number;
  profexecutante = new ProfissionalExecutante();
  profcodigo: number;
  procedimentomedico = new ProcedimentoMedico();
  procmedico: number;
  valorpaciente: string;
  valorconvenio: string;
  preventregalaudo: Date;
  dataexecucao: Date;
  atendimento = new Atendimento();
  listaimagem = new Array<Imagem>();
  laudo = new Laudo();
  codigoatdteste: number;

  constructor(codigo?: number, profexecutante?: ProfissionalExecutante,
              procedimentoMedico?: ProcedimentoMedico, valorpaciente?: string,
              valorconvenio?: string, preventreglaudo?: Date,
              dataexecucao?: Date, atendimento?: Atendimento,
              listaimagem?: Array<Imagem>, laudo?: Laudo) {
                this.codigo = codigo;
                this.profexecutante = profexecutante;
                this.procedimentomedico = procedimentoMedico;
                this.valorpaciente = valorpaciente;
                this.valorconvenio = valorconvenio;
                this.preventregalaudo = preventreglaudo;
                this.dataexecucao = dataexecucao;
                this.atendimento = atendimento;
                this.listaimagem = listaimagem;
                this.laudo = laudo;
              }
}

export class Modality {
  codigo: number;
  name: string;
  description: string;
  ip: string;
  port: number;
  timeout: number;
}

export class ParametrosDoSistema {
  codigo: number;
  logomarcalaudo: any;

}

export class Licenciado {
  codigo: number;
  cnpj: string;
  cnes: string;
  cpf: string;
  licenciadopara: string;
  razaosocial: string;
  endereco = new Endereco();
  telefone1: string;
  telefone2: string;
  email: string;
  site: string;
  serial: string;
  qtdeacessos: number;
  tipodelicenca: string;
}

export class Estado {
  codigo: number;
  uf: string;
  descricao: string;
}

export class Sigla {
  codigo: number;
  descricao: string;
}

export class ImagemImpressa {
  codigo: number;
  imagem = new Imagem();
  indice: number;
  pagina = new PaginaDeImagens();
  caminhoimagemjpeg: string;
}

export class ModeloDeLaudoDoProc {
  codigo: number;
  procedimentomedico = new ProcedimentoMedico();
  modelodelaudo = new ModeloDeLaudo();
  descricao: string;
  customstring: string;
  prioridade: number;
}

export class ModeloDeLaudo {
  codigo: number;
  nome: string;
  contexto: string;
  visao: string;
}

export class PaginaDeImagens {
  codigo: number;
  layout: LAYOUT_IMG;
  imagens = new Array<ImagemImpressa>();
  procedimentoatendimento = new ProcedimentoAtendimento();
}

export class Laudo {
  codigo: number;
  status: STATUS_LAUDO;
  laudosalvo: ParametroDoLaudo;
  modelodelaudo: ModeloDeLaudoDoProc;
  cidresultadodoexame: SubcategoriaCid10;
}

export class ParametroDoLaudo {
  codigo: number;
  index: number;
  valor: string;
}

export enum LAYOUT_IMG {
  LAYOUT_1_IMG = '1 Imagem grande (14 x 10,5 cm)',
  LAYOUT_1_IMG_PRINTER = '1 Imagem Média (10 x 7,3 cm) Printer',
  LAYOUT_2_IMG_GRANDES = '2 Images grandes (14 x 10,5 cm)',
  LAYOUT_2_IMG = '2 Imagens Médias (10 x 7,3 cm) Printer',
  LAYOUT_3_IMG = '3 Imagens Médias (8 x 6,6 cm)',
  LAYOUT_4_IMG_GRANDES = '4 Imagens Grandes (9 x 6,8 cm)',
  LAYOUT_4_IMG_MEDIAS = '4 Imagens Médias (8 x 6,6 cm)',
  LAYOUT_4_IMG_PEQUENAS = '4 Imagens Pequenas (6,5 x 5,0 cm)',
  LAYOUT_6_IMG = '6 Imagens Médias (8 x 6,6 cm)',
  LAYOUT_6_IMG_GRANDES = '6 Imagens Grandes (9 x 6,8 cm)',
  LAYOUT_8_IMG = '8 Imagens Pequenas (6,5 x 5 cm)',
  LAYOUT_8_IMG_GRANDES = '8 Imagens Grandes',
  LAYOUT_9_IMG = '9 Imagens Pequenas (5,5 x 4 cm)',
  LAYOUT_12_IMG = '12 Imagens Pequenas (5,5 x 4 cm)',
  LAYOUT_15_IMG = '15 Imagens Pequenas (5,5 x 4 cm)',
  LAYOUT_LAUDO_E_4_IMG = 'Laudo e 4 Imagens Pequenas(5,5 x 4 cm)',
  LAYOUT_LAUDO_E_5_IMG = 'Laudo e 5 Imagens Pequenas(5,5 x 4 cm)'
}

export enum STATUS_LAUDO {
  pendente = 'PENDENTE',
  pronto = 'PRONTO'
}
