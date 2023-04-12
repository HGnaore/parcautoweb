import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Location } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { VehiculeService } from "src/app/services/vehicule.service";
import { DirectionService } from "src/app/services/trombino/direction.service";
import { FournisseurService } from "src/app/services/fournisseur.service";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "src/app/services/config.service";
import { PersonnelService } from "src/app/services/trombino/personnel.service";
import { AssureurService } from "src/app/services/assureur.service";
import { environment } from "src/environments/environment";
import { EntretienService } from "src/app/services/entretien.service";
import Swal from "sweetalert2";

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  etat: string;
  entretien: string;
  typeEntretienProgramme: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: "[2792 HY 01] - TOYOTA RAV4",
    entretien: "Changement de Pneus",
    typeEntretienProgramme: "OUI",
    name: "05/09/2021",
    weight: "250 000",
    symbol: "PLANÈTE AUTO",
    etat: "Parc",
  },
  {
    position: "[2792 HY 01] - TOYOTA RAV4",
    entretien: "Chaîne de distribution Citadine",
    typeEntretienProgramme: "OUI",
    name: "04/10/2021",
    weight: "250 000",
    symbol: "PLANÈTE AUTO",
    etat: "Parc",
  },
  {
    position: "[2792 HY 01] - TOYOTA RAV4",
    entretien: "parallélisme des roues",
    typeEntretienProgramme: "NON",
    name: "20/10/2021",
    weight: "250 000",
    symbol: "PLANÈTE AUTO",
    etat: "Parc",
  },
  {
    position: "[2792 HY 01] - TOYOTA RAV4",
    entretien: "parallélisme des roues",
    typeEntretienProgramme: "NON",
    name: "05/09/2021",
    weight: "250 000",
    symbol: "PLANÈTE AUTO",
    etat: "Parc",
  },
  {
    position: "[2792 HY 01] - TOYOTA RAV4",
    entretien: "parallélisme des roues",
    typeEntretienProgramme: "NON",
    name: "05/09/2021",
    weight: "250 000",
    symbol: "PLANÈTE AUTO",
    etat: "Reparation",
  },
];

export interface PeriodicElementDetail {
  number: number;
  name: string;
  position: string;
  weight: string;
  symbol: string;
  etat: string;
  date: string;
  typeEntretien: string;
}

export interface PeriodicElementDetailReparation {
  number: number;
  name: string;
  position: string;
  weight: string;
  symbol: string;
  etat: string;
  date: string;
  typeEntretien: string;
}

const ELEMENT_DATADetail: PeriodicElementDetail[] = [
  {
    number: 1,
    position: "Cylindre de roue AR",
    date: "01/02/2022",
    typeEntretien: "parallélisme des roues",
    name: "2",
    weight: "25000",
    symbol: "50000",
    etat: "Parc",
  },
  {
    number: 2,
    position: "Jeu de garniture AR",
    date: "01/02/2022",
    typeEntretien: "parallélisme des roues",
    name: "1",
    weight: "60000",
    symbol: "60000",
    etat: "Parc",
  },
  {
    number: 3,
    position: "Tambou de frein AR",
    date: "01/02/2022",
    typeEntretien: "parallélisme des roues",
    name: "2",
    weight: "90000",
    symbol: "180000",
    etat: "Parc",
  },
  {
    number: 4,
    position: "Main d'oeuvre (Heures)",
    date: "01/02/2022",
    typeEntretien: "parallélisme des roues",
    name: "6",
    weight: "5000",
    symbol: "30000",
    etat: "Parc",
  },
];

const ELEMENT_DATADetailReparation: PeriodicElementDetailReparation[] = [
  {
    number: 1,
    position: "Cylindre de roue AR",
    date: "01/02/2022",
    typeEntretien: "[Panne] - Problème de liquide de refroidissement",
    name: "2",
    weight: "25000",
    symbol: "50000",
    etat: "Parc",
  },
  {
    number: 2,
    position: "Jeu de garniture AR",
    date: "01/02/2022",
    typeEntretien: "[Sinistre] - 	Accident de la circulation",
    name: "1",
    weight: "60000",
    symbol: "60000",
    etat: "Parc",
  },
];

export interface PeriodicElementPro {
  nameMat: string;
  positionMat: string;
  prochainMat: string;
  repectMat: string;
  executeMat: string;
  numberMat: number;
}

const ELEMENTDATAPro: PeriodicElementPro[] = [
  {
    numberMat: 1,
    positionMat: "2039 HF 01",
    nameMat: "Changement de Pneus",
    repectMat: "14 Mois",
    prochainMat: "60000 Km",
    executeMat: "En attente",
  },
  {
    numberMat: 2,
    positionMat: "2039 HF 01",
    nameMat: "Vidange (Huile Moteur, Filtre air, Filtre à huile) Citadine",
    repectMat: "6 Mois",
    prochainMat: "3000 Km",
    executeMat: "En attente",
  },
];

/*export interface PeriodicElementPanne {
  namePanne: string;
  positionPanne: string;
  weightPanne: string;
  symbolPanne: string;
  etatPanne: string;
}

const ELEMENT_DATAPanne: PeriodicElementPanne[] = [
  {
    positionPanne: "[5384 GG 01] - DOUBLE CABINE NISSAN PICK-UP",
    namePanne: "05/09/2021",
    weightPanne: "Problème de liquide de refroidissement",
    symbolPanne: "PLANÈTE AUTO",
    etatPanne: "Parc",
  },
  {
    positionPanne: "[8335 HE 01] - HYUNDAI COUNTY",
    namePanne: "05/09/2021",
    weightPanne: "Des problèmes avec l'huile moteur",
    symbolPanne: "PLANÈTE AUTO",
    etatPanne: "Reparation",
  },
];*/

export interface PeriodicElementSinistre {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  etat: string;
}

const ELEMENT_DATASinistre: PeriodicElementSinistre[] = [
  {
    position: "[5452 FK 01] - BREAK 4X4 MITSUBISHI",
    name: "05/09/2021",
    weight: "Accident de la circulation",
    symbol: "Robert AHOH",
    etat: "Parc",
  },
  /* {position: '1475KP01', name: '04/10/2021', weight: '250 000', symbol: 'PLANÈTE AUTO', etat: 'Parc'},
  {position: '1475KP01', name: '20/10/2021', weight: '250 000', symbol: 'PLANÈTE AUTO', etat: 'Parc'},
  {position: '1475KP01', name: '05/09/2021', weight: '250 000', symbol: 'PLANÈTE AUTO', etat: 'Parc'},
  {position: '1475KP01', name: '05/09/2021', weight: '250 000', symbol: 'PLANÈTE AUTO', etat: 'Reparation'},*/
];

export interface PeriodicElementReleveKilom {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  etat: string;
}

const ELEMENT_DATAReleveKilom: PeriodicElementReleveKilom[] = [
  {
    position: "[5452 FK 01] - BREAK 4X4 MITSUBISHI",
    name: "05/09/2021",
    weight: "Accident de la circulation",
    symbol: "Robert AHOH",
    etat: "Parc",
  },
];

export interface PeriodicElementInfraction {
  vehicule: string;
  date: string;
  adresse: string;
  citation: string;
  infraction: string;
  vitesse: string;
  nom: string;
  montant: string;
}

const ELEMENT_DATAInfraction: PeriodicElementInfraction[] = [
  {
    vehicule: "[2792 HY 01] - TOYOTA RAV4",
    date: "29/11/2021 10:37:18",
    adresse: "BVD PONT FERAILLE",
    citation: "C00000000000068404035",
    infraction: "C29-Excès de vitesse",
    vitesse: "81",
    nom: "RTI",
    montant: "2000",
  },
  /* {position: '1475KP01', name: '04/10/2021', weight: '250 000', symbol: 'PLANÈTE AUTO', etat: 'Parc'},
  {position: '1475KP01', name: '20/10/2021', weight: '250 000', symbol: 'PLANÈTE AUTO', etat: 'Parc'},
  {position: '1475KP01', name: '05/09/2021', weight: '250 000', symbol: 'PLANÈTE AUTO', etat: 'Parc'},
  {position: '1475KP01', name: '05/09/2021', weight: '250 000', symbol: 'PLANÈTE AUTO', etat: 'Reparation'},*/
];

export interface PeriodicElementCarburant {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  etat: string;
  typeCarb: string;
  kmdepart: string;
  kmretour: string;
}

const ELEMENT_DATACarburant: PeriodicElementCarburant[] = [
  {
    position: "[2792 HY 01] - TOYOTA RAV4",
    typeCarb: "[CARTE] - 45587",
    name: "10/05/2022",
    weight: "30",
    symbol: "650",
    etat: "16 650",
    kmdepart: "16 650",
    kmretour: "16 650",
  },
  {
    position: "[2792 HY 01] - TOYOTA RAV4",
    typeCarb: "[CARTE] - 45588",
    name: "05/09/2021",
    weight: "30",
    symbol: "650",
    etat: "19 650",
    kmdepart: "16 650",
    kmretour: "16 650",
  },
];

export interface PeriodicElementRepare {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  etat: string;
}

const ELEMENTDATAReparer: PeriodicElementRepare[] = [
  {
    position: "[2792 HY 01] - TOYOTA RAV4",
    name: "05/09/2021",
    weight: "320 000",
    symbol: "PLANÈTE AUTO",
    etat: "Parc",
  },
  {
    position: "[2792 HY 01] - TOYOTA RAV4",
    name: "04/10/2021",
    weight: "250 000",
    symbol: "PLANÈTE AUTO",
    etat: "Parc",
  },
  {
    position: "[2792 HY 01] - TOYOTA RAV4",
    name: "20/10/2021",
    weight: "750 000",
    symbol: "PLANÈTE AUTO",
    etat: "Parc",
  },
];

@Component({
  selector: "app-traitement-vehicule",
  templateUrl: "./traitement-vehicule.component.html",
  styleUrls: ["./traitement-vehicule.component.scss"],
  animations: [
    // the fade-in/fade-out animation.
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 1 }), animate(1000)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(":leave", animate(1000, style({ opacity: 1 }))),
    ]),
  ],
})
export class TraitementVehiculeComponent implements OnInit {
  ProfilID = JSON.parse(localStorage.getItem("currentUser"));
  UserProfilID: any;
  ////////////////////////////////////////
  selecetdFile: File;
  imagePreview: any;
  imagePreviewModif: any;
  imagePreviewVisiteTech: any;
  /////////////////////////////////////
  vehiculeForm: FormGroup;
  vehiculeFormCarteGrise: FormGroup;
  vehiculeFormVisiteTech: FormGroup;
  vehiculeFormAssurance: FormGroup;

  isLoadingResults = true;
  OneVehicule: any = [];
  id: string;
  afficheReinit = false;
  reponse: any;
  IDDir: string;
  libDir: string;
  IDSuppression = "";
  imatriculation: any;
  modele: any;
  marque: any;
  listeTypeEntret: any = [];
  listeGaragiste: any = [];
  ///resultatCarteGrise
  numeroCarteGrise: any;
  datemiseenserviceCarteGrise: any;
  dateeditionCarteGrise: any;
  codeproprietaireCarteGrise: any;
  couleurCarteGrise: any;
  carrosserieCarteGrise: any;
  nbreplaceCarteGrise: any;
  ptacCarteGrise: any;
  genreCarteGrise: any;
  puissanceCarteGrise: any;
  poidsvideCarteGrise: any;
  nbreessieuxCarteGrise: any;
  cylindreCarteGrise: any;
  chargeutileCarteGrise: any;
  typetechniqueCarteGrise: any;
  energieCarteGrise: any;
  numchassisCarteGrise: any;
  usageCarteGrise: any;
  Vignettemontantvisite: any;
  Vignettencc: any;
  numerovignette: any;
  Vignettenumerovignette: any;
  Vignetteobservation: any;
  Vignetterappel: any;
  Vignettestat: any;
  Vignettelieu: any;
  Vignettekms: any;
  VignettelienPhoto: any;
  Vignettedatevisite: any;
  Vignettedateexpiration: any;
  Vignettecat: any;
  Assuranceadresse: any;
  Assuranceassueur: any;
  Assuranceassure: any;
  Assurancecontact: any;
  Assurancedatedebut: any;
  Assurancedatefin: any;
  AssurancelienPhoto: any;
  Assurancenumpolice: any;
  Assuranceprofession: any;
  Assurancerappel: any;

  Document: any = [];
  listeDocument: any = [];
  urlPhoto: string;
  //FICHIER UPLOAD

  public listDirection: any = [];
  public listPersonnel: any = [];
  public onePersonnel: any = [];
  listeusages: any = [];
  listeenergies: any = [];
  PersoneImage: any;
  PersoneName: any;
  Dirlibelle;
  dirID: any;
  displayedColumns: string[] = [
    "position",
    "name",
    "entretien",
    "typeEntretienProgramme",
    "weight",
    "symbol",
    "action",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumnsDetail: string[] = [
    "number",
    "date",
    "typeEntretien",
    "position",
    "name",
    "weight",
    "symbol",
    "action",
  ];
  dataSourceDetail = new MatTableDataSource<PeriodicElementDetail>(
    ELEMENT_DATADetail
  );

  displayedColumnsDetailReparation: string[] = [
    "number",
    "date",
    "typeEntretien",
    "position",
    "name",
    "weight",
    "symbol",
    "action",
  ];
  dataSourceDetailReparation = new MatTableDataSource<PeriodicElementDetail>(
    ELEMENT_DATADetailReparation
  );

  displayedColumnsPro: string[] = [
    "numberMat",
    "nameMat",
    "repectMat",
    "prochainMat",
    "actionMat",
  ];
  dataSourcePro = new MatTableDataSource<PeriodicElementPro>(ELEMENTDATAPro);
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  ///////////////////DEBUT PANNES//////////////////////
  displayedColumnsPanne: string[] = [
    "number",
    "panneDate",
    "panneLibelle",
    "panneKilometrage",
    "StatutKilometrage",
    "actionPanne",
  ];
  dataSourcePanne: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorPanne: MatPaginator;
  @ViewChild(MatSort) sortPanne: MatSort;
  Pannes: any = [];
  listePannes: any = [];
  Pannesareparer: any = [];
  listePannesareparer: any = [];

  ///////////////////FIN PANNES//////////////////////

  ///////////////////DEBUT SINISTRE//////////////////////
  displayedColumnsSinistreNew: string[] = [
    "number",
    "sinistreDate",
    "sinistreNature",
    "sinistreLieu",
    "sinistreConducteur",
    "actionSinistre",
  ];
  dataSourceSinistreNew: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorSinistreNew: MatPaginator;
  @ViewChild(MatSort) sortSinistreNew: MatSort;
  Sinistre: any = [];
  listeSinistre: any = [];
  Sinistreareparer: any = [];
  listeSinistreareparer: any = [];
  ///////////////////FIN SINISTRE//////////////////////

  ///////////////////DEBUT REPARATION//////////////////////

  displayedColumnsReparation: string[] = [
    "number",
    "reparationDate",
    "reparationLibelle",
    "reparationStatut",
    "actionRepare",
  ];
  dataSourceReparation: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorReparation: MatPaginator;
  @ViewChild(MatSort) sortReparation: MatSort;
  Reparation: any = [];
  listeReparation: any = [];

  hiddenTabReparation = false;
  hiddenTabReparationSave = true;

  displayedColumnsReparationDetail: string[] = [
    "numberDet",
    "reparationDetailDesignation",
    "reparationDetailQuantite",
    "reparationDetailPrixUnit",
    "reparationDetailPrixTotal",
    "actionRepareDetail",
  ];
  dataSourceReparationDetail: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorReparationDetail: MatPaginator;
  @ViewChild(MatSort) sortReparationDetail: MatSort;
  ReparationDetail: any = [];
  listeReparationDetail: any = [];

  @ViewChild("selectreparationFactureProforma")
  myInputVariableFactureProforma: ElementRef;
  @ViewChild("reparationBondeCommande")
  myInputVariableBondeCommande: ElementRef;
  @ViewChild("selectFileFacture") myInputVariableFacture: ElementRef;

  ///////////////////FIN REPARATION//////////////////////

  ///////////////////DEBUT ENTRETIEN//////////////////////

  displayedColumnsEntretien: string[] = [
    "number",
    "datesaisie",
    "entretienlibelle",
    "typeentretienLib",
    "actionEntretien",
  ];
  dataSourceEntretien: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorEntretien: MatPaginator;
  @ViewChild(MatSort) sortEntretien: MatSort;
  Entretien: any = [];
  listeEntretien: any = [];

  hiddenTabEntretienSave = true;
  hiddenTabEntretein = false;
  displayedColumnsEntretienDetail: string[] = [
    "numberDet",
    "entretienDetailDesignation",
    "entretienDetailQuantite",
    "entretienDetailPrixUnit",
    "entretienDetailPrixTotal",
    "entretienDetailTraveauObserve",
    "actioneEntretienDetail",
  ];
  dataSourceEntretienDetail: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorEntretienDetail: MatPaginator;
  @ViewChild(MatSort) sortEntretienDetail: MatSort;
  EntretienDetail: any = [];
  listeEntretienDetail: any = [];

  displayedColumnsEntretienProgrammeDetail: string[] = [
    "numberDet",
    "programmeDate",
    "entretienParametre",
    "Repetertous",
    "entretienrappelKilo",
    "actioneProgram",
  ];
  dataSourceEntretienProgrammeDetail: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorEntretienProgrammeDetail: MatPaginator;
  @ViewChild(MatSort) sortEntretienProgrammeDetail: MatSort;
  EntretienProgrammeDetail: any = [];
  listeEntretienProgrammeDetail: any = [];

  @ViewChild("entretienFacProforma")
  myInputVariableentretienFactureProforma: ElementRef;
  @ViewChild("entretienBonCommande")
  myInputVariableentretienBonCommande: ElementRef;
  @ViewChild("entretienDocFacture")
  myInputVariableentretienDocFacture: ElementRef;

  ///////////////////FIN ENTRETIEN//////////////////////

  ///////////////////DEBUT KILOMETRAGE//////////////////////
  displayedColumnsKilometrage: string[] = [
    "number",
    "datesaisie",
    "kilometrageDate",
    "kilometrageData",
    "kilometrageObservation",
    "actionKilom",
  ];
  dataSourceKilometrage: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorKilometrage: MatPaginator;
  @ViewChild(MatSort) sortKilometrage: MatSort;
  Kilometrage: any = [];
  listeKilometrage: any = [];

  ///////////////////FIN KILOMETRAGE//////////////////////

  ///////////////////DEBUT INFRACTION//////////////////////
  displayedColumnsInfraction: string[] = [
    "number",
    "infractiondate",
    "infractionlibelle",
    "infractionnomconducteur",
    "infractionnmontantamende",
    "infractionvitesse",
    "actioninfraction",
  ];
  dataSourceInfraction: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorInfraction: MatPaginator;
  @ViewChild(MatSort) sortInfraction: MatSort;
  Infraction: any = [];
  listeInfraction: any = [];
  ///////////////////FIN INFRACTION//////////////////////

  displayedColumnsReparer: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "action",
  ];
  dataSourceReparer = new MatTableDataSource<PeriodicElementRepare>(
    ELEMENTDATAReparer
  );

  displayedColumnsSinistre: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "action",
  ];
  dataSourceSinistre = new MatTableDataSource<PeriodicElementSinistre>(
    ELEMENT_DATASinistre
  );

  displayedColumnsCarburant: string[] = [
    "position",
    "name",
    "typeCarb",
    "weight",
    "symbol",
    "etat",
    "action",
  ];
  dataSourceCarburant = new MatTableDataSource<PeriodicElementCarburant>(
    ELEMENT_DATACarburant
  );

  displayedColumnsReleveKilom: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "action",
  ];
  dataSourceReleveKilom = new MatTableDataSource<PeriodicElementReleveKilom>(
    ELEMENT_DATAReleveKilom
  );

  /*displayedColumnsInfraction: string[] = [
    "vehicule",
    "date",
    "adresse",
    "citation",
    "infraction",
    "vitesse",
    "montant",
    "action",
  ];
  dataSourceInfraction = new MatTableDataSource<PeriodicElementInfraction>(
    ELEMENT_DATAInfraction
  );*/

  listeVehicules: any = [];
  Vehicules: any = [];

  @ViewChild(MatPaginator) paginatorVisiteTech: MatPaginator;
  @ViewChild(MatSort) sortVisiteTech: MatSort;
  displayedColumnsVisiteTech: string[] = [
    "number",
    "datevisite",
    "lieu",
    "montantvisite",
    "numerovignette",
    "montantvignette",
    "dateexpiration",
    "rappel",
    "action",
  ];
  dataSourceVisiteTech: MatTableDataSource<any>;

  displayedColumnsAssur: string[] = [
    "number",
    "assure",
    "assueur",
    "numpolice",
    "datedebut",
    "datefin",
    "rappel",
    "action",
  ];
  dataSourceAssur: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorAssur: MatPaginator;
  @ViewChild(MatSort) sortAssur: MatSort;
  VehiculesAssurance: any = [];
  listeVehiculesAssurance: any = [];

  selecetdFileDoc: any;
  selecetdFileSinistre: any;
  selecetdFileFactureProforma: any;
  selecetdFileBondeCommande: any;
  selecetdFileFacture: any;
  MediaFIlePreview: any;
  reader: any;
  listemodelebymarques: any = [];
  listeDetailEntret: any = [];
  listeFonction: any = [];
  listemarques: any = [];
  listenaturesinistre: any = [];
  OneCarteGrise: any = [];
  documentForm: FormGroup;
  hidden = false;
  hiddenPersone = false;
  AficherImgx = true;
  isLoadingResultsModif: boolean;
  isLoadingResultsEntretient: boolean;
  VerifCarteGrise: any;
  IDcarteGrise: any;
  imagePreviewCarteGrise: any;
  ActionClose = true;
  ActionOpen = false;

  addOrUpdate = true;
  ActionCloseAssur = true;
  ActionOpenAssur = false;
  addOrUpdateAssur = true;
  OneVisite: any = [];
  OnePanne: any = [];
  OneKilometre: any = [];
  OneSinistre: any = [];
  OneInfraction: any = [];
  OneReparation: any = [];
  OneEntretien: any = [];
  ModifsVisiteLoadingResults = false;
  ModifsLoadingResults = false;
  TabModifier = false;
  TabCarteGrise = false;
  TabVisiteTech = false;
  TabMAssurance = false;
  listeassureur: any = [];
  OneAssurance: any = [];
  imagePreviewAssurance: any;
  hiddenDetailProgramme = true;
  hiddenSaveButtom = false;
  hiddenListeEntretien = false;
  hiddenListeProgramable = true;

  ActionCloseEntretien = true;
  ActionOpenEntretien = false;
  hiddenEntretien = true;

  ActionClosePanne = true;
  ActionOpenPanne = false;
  hiddenPanne = true;

  ActionCloseSinistre = true;
  ActionOpenSinistre = false;
  hiddenSinistre = true;

  ActionCloseReparation = true;
  ActionOpenReparation = false;
  hiddenReparation = true;

  ActionCloseCarburant = true;
  ActionOpenCarburant = false;
  hiddenCarburant = true;

  ActionCloseKilometrage = true;
  ActionOpenKilometrage = false;
  hiddenKilometrage = true;

  ActionCloseInfraction = true;
  ActionOpenInfraction = false;
  hiddenInfraction = true;

  NameSuppression: any;

  /*///////traitemVehicule////////** */
  hiddenCarteGrise = true;
  vehiculeFormEntretien: FormGroup;
  vehiculeFormPanne: FormGroup;
  vehiculeFormSinistre: FormGroup;
  vehiculeFormReparation: FormGroup;
  vehiculeFormKilometage: FormGroup;
  vehiculeFormInfraction: FormGroup;
  vehiculeFormDetailReparation: FormGroup;
  vehiculeFormDetailEntretient: FormGroup;
  vehiculeFormProgrammeEntreien: FormGroup;
  fonctionVehicule: any;
  sinistreFile: any;
  DetailreparationID: any;
  reparationpanneOrSinistreID: any;
  reparationLeBondeCommande: string;
  reparationFactureProforma: string;
  reparationFacture: string;
  entretienDocFacture: string;
  entretienDocBonCommande: string;
  entretienDocFacProforma: string;
  selecetdFileInfraction: any;
  selecetdFileInfractionAff: string;
  DateDernierentretien: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private vehiculeService: VehiculeService,
    private directionService: DirectionService,
    private fournisseurService: FournisseurService,
    private configService: ConfigService,
    private httpClient: HttpClient,
    private router: Router,
    private assureurService: AssureurService,
    private personnelService: PersonnelService,
    private cdr: ChangeDetectorRef,
    private entretienService: EntretienService
  ) {
    this.dataSourcePanne = new MatTableDataSource(this.Pannes);
    this.dataSourceSinistreNew = new MatTableDataSource(this.Sinistre);
    this.dataSourceReparation = new MatTableDataSource(this.Reparation);
    this.dataSourceReparationDetail = new MatTableDataSource(
      this.ReparationDetail
    );
    this.dataSourceEntretien = new MatTableDataSource(this.Entretien);
    this.dataSourceEntretienDetail = new MatTableDataSource(
      this.EntretienDetail
    );
    this.dataSourceEntretienProgrammeDetail = new MatTableDataSource(
      this.EntretienProgrammeDetail
    );
    this.dataSourceKilometrage = new MatTableDataSource(this.Kilometrage);
    this.dataSourceInfraction = new MatTableDataSource(this.Infraction);

    /* this.dataSource = new MatTableDataSource(this.Document);
        this.dataSourceVisiteTech = new MatTableDataSource(this.Vehicules);
        this.dataSourceAssur = new MatTableDataSource(this.VehiculesAssurance);*/
    this.id = this.route.snapshot.paramMap.get("id");
    this.activeMenu();
    this.initFormEntretien();
    this.initFormPanne();
    this.initFormSinistre();
    this.initFormReparation();
    this.initFormDetailReparation();
    this.initFormDetailEntretien();
    this.initFormProgrammeEntreien();
    this.initFormKilometrage();
    this.initFormInfraction();
    /*  this.initFormDocument();
        this.initFormCarteGrise();
        this.initFormVisiteTech();
        this.initFormAssurance();*/
  }

  activeMenu() {
    this.configService.OngletConsultation = false;
    this.configService.OngletModification = false;
    this.configService.OngletTraitement = true;
  }

  //////////////
  onFileUpload(event) {
    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewModif = reader.result;
    };
    reader.readAsDataURL(this.selecetdFile);
  }

  ///////////////
  ngOnInit() {
    this.UserProfilID = this.ProfilID.prof_id;
    this.MenuTraitementVehicule();
    this.loadOneVehiculeHeaderInfo();
    this.loadOneVehiculeInfoModifier();
    this.loadTypeEntretien();
    this.loadGaragiste();
    this.TlistePanne();
    this.TlisteSinistre();
    /*  this.loadMarques();
      this.loadFonction();
      this.loadDirections();
    this.TlisteAddDocument(this.id);
      this.loadOneCarteGrise(this.id);
      this.loadEnergies();
      this.loadUsages();
      this.TlisteVisteVehicule();
      this.loadAssureur();
      this.TlisteAssuranceVehicule();*/
  }

  ngAfterViewInit() {
    this.dataSourcePanne.paginator = this.paginatorPanne;
    this.dataSourcePanne.sort = this.sortPanne;

    this.dataSourceSinistreNew.paginator = this.paginatorSinistreNew;
    this.dataSourceSinistreNew.sort = this.sortSinistreNew;

    this.dataSourceReparation.paginator = this.paginatorReparation;
    this.dataSourceReparation.sort = this.sortReparation;

    this.dataSourceReparationDetail.paginator = this.paginatorReparationDetail;
    this.dataSourceReparationDetail.sort = this.sortReparationDetail;

    this.dataSourceEntretien.paginator = this.paginatorEntretien;
    this.dataSourceEntretien.sort = this.sortEntretien;

    this.dataSourceEntretienDetail.paginator = this.paginatorEntretienDetail;
    this.dataSourceEntretienDetail.sort = this.sortEntretienDetail;

    this.dataSourceEntretienProgrammeDetail.paginator =
      this.paginatorEntretienProgrammeDetail;
    this.dataSourceEntretienProgrammeDetail.sort =
      this.sortEntretienProgrammeDetail;

    this.dataSource.paginator = this.paginator;
    this.dataSourceDetail.paginator = this.paginator;
    this.dataSourcePro.paginator = this.paginator;

    this.dataSourceReparer.paginator = this.paginator;
    this.dataSourceDetailReparation.paginator = this.paginator;
    this.dataSourceCarburant.paginator = this.paginator;
    this.dataSourceInfraction.paginator = this.paginator;
    this.dataSourceReleveKilom.paginator = this.paginator;

    this.dataSourceKilometrage.paginator = this.paginatorKilometrage;
    this.dataSourceKilometrage.sort = this.sortKilometrage;

    this.dataSourceInfraction.paginator = this.paginatorInfraction;
    this.dataSourceInfraction.sort = this.sortInfraction;

    /*  this.dataSource.sort = this.sortVisiteTech;*/

    /*  this.dataSourceVisiteTech.paginator = this.paginatorVisiteTech;
      this.dataSourceVisiteTech.sort = this.sortVisiteTech;*/

    /*  this.dataSourceAssur.paginator = this.paginatorAssur;
      this.dataSourceAssur.sort = this.sortAssur;*/
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePanne.filter = filterValue.trim().toLowerCase();
    this.dataSourceSinistreNew.filter = filterValue.trim().toLowerCase();
    this.dataSourceReparation.filter = filterValue.trim().toLowerCase();
    this.dataSourceReparationDetail.filter = filterValue.trim().toLowerCase();
    this.dataSourceEntretien.filter = filterValue.trim().toLowerCase();
    this.dataSourceEntretienDetail.filter = filterValue.trim().toLowerCase();
    this.dataSourceEntretienProgrammeDetail.filter = filterValue
      .trim()
      .toLowerCase();

    this.dataSourceKilometrage.filter = filterValue.trim().toLowerCase();

    this.dataSourceInfraction.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcePanne.paginator) {
      this.dataSourcePanne.paginator.firstPage();
    }

    if (this.dataSourceSinistreNew.paginator) {
      this.dataSourceSinistreNew.paginator.firstPage();
    }
    if (this.dataSourceReparation.paginator) {
      this.dataSourceReparation.paginator.firstPage();
    }
    if (this.dataSourceEntretien.paginator) {
      this.dataSourceEntretien.paginator.firstPage();
    }
    if (this.dataSourceReparationDetail.paginator) {
      this.dataSourceReparationDetail.paginator.firstPage();
    }
    if (this.dataSourceEntretienDetail.paginator) {
      this.dataSourceEntretienDetail.paginator.firstPage();
    }
    if (this.dataSourceEntretienProgrammeDetail.paginator) {
      this.dataSourceEntretienProgrammeDetail.paginator.firstPage();
    }
    if (this.dataSourceKilometrage.paginator) {
      this.dataSourceKilometrage.paginator.firstPage();
    }
    if (this.dataSourceInfraction.paginator) {
      this.dataSourceInfraction.paginator.firstPage();
    }
  }
  /////////////TOP MENU//////////////////////////
  MenuTraitementVehicule() {
    this.configService.ListMenuVehicule = true;
    environment.SelectIDvehicule = this.id;
    environment.SelectUserProfil = this.UserProfilID;
  }

  loadOneVehiculeHeaderInfo() {
    this.isLoadingResults = true;
    if (this.id !== "0") {
      this.isLoadingResults = true;
      this.vehiculeService.getInfoVehiculebyID(this.id).subscribe((reponse) => {
        this.OneVehicule = reponse;
        ///resultatVehicule
        this.imatriculation =
          this.OneVehicule.results.resultatVehicule[0].imatriculation;
        this.modele = this.OneVehicule.results.resultatVehicule[0].modele;
        this.marque = this.OneVehicule.results.resultatVehicule[0].marque;
        this.imagePreview =
          this.configService.urlgRTI +
          this.OneVehicule.results.resultatVehicule[0].lienPhoto;
        //this.vehiculeFormCarteGrise.controls['modele'].setValue(this.modele);
        ///resultatCarteGrise
        this.numeroCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].numero;
        this.datemiseenserviceCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].datemiseenservice;
        this.dateeditionCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].dateedition;
        this.codeproprietaireCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].codeproprietaire;
        this.couleurCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].couleur;
        this.carrosserieCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].carrosserie;
        this.nbreplaceCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].nbreplace;
        this.ptacCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].ptac;
        this.genreCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].genre;
        this.puissanceCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].puissance;
        this.poidsvideCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].poidsvide;
        this.nbreessieuxCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].nbreessieux;
        this.cylindreCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].cylindre;
        this.chargeutileCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].chargeutile;
        this.numchassisCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].numchassis;
        this.typetechniqueCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].typetechnique;
        this.energieCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].Libenergie;
        this.usageCarteGrise =
          this.OneVehicule.results.resultatCarteGrise[0].Libusage;
        ///resultatVignette
        this.Vignettemontantvisite =
          this.OneVehicule.results.resultatVignette[0].montantvisite;
        this.Vignettemontantvisite =
          this.OneVehicule.results.resultatVignette[0].montantvignette;
        this.Vignettencc = this.OneVehicule.results.resultatVignette[0].ncc;
        this.Vignettenumerovignette =
          this.OneVehicule.results.resultatVignette[0].numerovignette;
        this.Vignetteobservation =
          this.OneVehicule.results.resultatVignette[0].observation;
        this.Vignetterappel =
          this.OneVehicule.results.resultatVignette[0].rappel;
        this.Vignettestat = this.OneVehicule.results.resultatVignette[0].stat;
        this.Vignettelieu = this.OneVehicule.results.resultatVignette[0].lieu;
        this.Vignettekms = this.OneVehicule.results.resultatVignette[0].kms;
        this.VignettelienPhoto =
          this.OneVehicule.results.resultatVignette[0].lienPhoto;
        this.Vignettedatevisite =
          this.OneVehicule.results.resultatVignette[0].datevisite;
        this.Vignettedateexpiration =
          this.OneVehicule.results.resultatVignette[0].dateexpiration;
        this.Vignettecat = this.OneVehicule.results.resultatVignette[0].cat;

        ///resultatAssurance
        this.Assuranceadresse =
          this.OneVehicule.results.resultatAssurance[0].adresse;
        this.Assuranceassueur =
          this.OneVehicule.results.resultatAssurance[0].assueur;
        this.Assuranceassure =
          this.OneVehicule.results.resultatAssurance[0].assure;
        this.Assurancecontact =
          this.OneVehicule.results.resultatAssurance[0].contact;
        this.Assurancedatedebut =
          this.OneVehicule.results.resultatAssurance[0].datedebut;
        this.Assurancedatefin =
          this.OneVehicule.results.resultatAssurance[0].datefin;
        this.AssurancelienPhoto =
          this.OneVehicule.results.resultatAssurance[0].lienPhoto;
        this.Assurancenumpolice =
          this.OneVehicule.results.resultatAssurance[0].numpolice;
        this.Assuranceprofession =
          this.OneVehicule.results.resultatAssurance[0].profession;
        this.Assurancerappel =
          this.OneVehicule.results.resultatAssurance[0].rappel;
        this.TlisteDocument(this.id);
        this.isLoadingResults = false;
        // console.log(reponse);
      });
    }
  }

  /////////////LOAD MODIFICATION VEHICULE///////////////////////
  TlisteDocument(IdVehicule) {
    this.vehiculeService
      .getMediabyIdVehicule(IdVehicule)
      .subscribe((reponse) => {
        this.Document = reponse;
        this.listeDocument = this.Document.results.resultat;
        this.urlPhoto = this.configService.urlgRTI;
      });
  }

  loadMarques() {
    this.vehiculeService.listeMarque().subscribe((reponse) => {
      this.listemarques = reponse;
    });
  }

  loadModelByMarques(Maqid) {
    this.vehiculeService
      .getMarqueModelebyMarqueId(Maqid)
      .subscribe((reponse) => {
        this.listemodelebymarques = reponse;
      });
  }

  loadFonction() {
    this.vehiculeService.listFoction().subscribe((reponse) => {
      this.listeFonction = reponse;
    });
  }
  public changeMarque(event) {
    this.loadModelByMarques(event);
  }

  initFormPanne() {
    this.vehiculeFormPanne = this.formBuilder.group({
      LpanneID: [""],
      panneDate: ["", Validators.required],
      panneLibelle: ["", Validators.required], //, Validators.required
      panneKilometrage: ["", Validators.required],
      panneDescription: [""],
      panneStatut: ["", Validators.required],
      panneImmobilise: [""],
    });
  }

  initFormDocument() {
    //this.isLoadingResults = false;
    this.documentForm = this.formBuilder.group({
      Description: [""],
      MediaFIle: [""],
    });
  }

  loadOneVehiculeInfoModifier() {
    this.isLoadingResultsModif = true;
    if (this.id !== "0") {
      this.isLoadingResultsModif = true;
      this.vehiculeService.getOneVehicule(this.id).subscribe((reponse) => {
        this.OneVehicule = reponse;

        /* this.imatriculation = this.OneVehicule.results[0].imatriculation;
this.modele= this.OneVehicule.results[0].modele
this.marque= this.OneVehicule.results[0].marque; */
        /*this.imagePreviewModif = this.configService.urlgRTI+this.OneVehicule.results[0].lienPhoto;
this.vehiculeForm.controls['imatriculation'].setValue(this.OneVehicule.results[0].imatriculation);
this.loadModelByMarques(this.OneVehicule.results[0].marque_ID);
this.vehiculeForm.controls['marque_ID'].setValue(this.OneVehicule.results[0].marque_ID);
this.vehiculeForm.controls['modele_ID'].setValue(this.OneVehicule.results[0].modele_ID);
this.vehiculeForm.controls['typeacquisition'].setValue(this.OneVehicule.results[0].typeacquisition);
this.vehiculeForm.controls['fonction_ID'].setValue(this.OneVehicule.results[0].fonctionvehicule_ID);*/

        this.fonctionVehicule = this.OneVehicule.results[0].fonction;
        /*this.vehiculeForm.controls['Dir_id'].setValue(this.OneVehicule.results[0].direction_ID);
this.loadPersonnelByDirections(this.OneVehicule.results[0].direction_ID);
this.vehiculeForm.controls['Agent_id'].setValue(this.OneVehicule.results[0].personnel_ID);
this.loadPersonnelByID(this.OneVehicule.results[0].personnel_ID);
this.vehiculeForm.controls['Dir_NomPrenAgent'].setValue(this.OneVehicule.results[0].personnel_nom);


this.TabModifier = true;*/
        // console.log(reponse);
        this.isLoadingResultsModif = false;
      });
    }
  }

  /////////////////////PANNE///////////////////////////

  onSubmitFormPanne(f) {
    this.isLoadingResultsModif = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    /* this.hiddenDetailProgramme = false;
    this.hiddenSaveButtom = true;
    this.hiddenListeEntretien = true;*/

    FormDataVeh.append("LpanneID", f.LpanneID);
    FormDataVeh.append("panneDate", f.panneDate);
    FormDataVeh.append("panneLibelle", f.panneLibelle);
    FormDataVeh.append("panneKilometrage", f.panneKilometrage);
    FormDataVeh.append("panneDescription", f.panneDescription);
    FormDataVeh.append("panneStatut", f.panneStatut);
    FormDataVeh.append("vehicule_ID", this.id);
    FormDataVeh.append("panneReparer", "0");
    if (f.LpanneID != "") {
      //Modif;
      this.vehiculeService.updatePanne(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.initFormPanne();
            this.TlistePanne();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsModif = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    } else {
      //Nouveau;
      this.vehiculeService.savePanne(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.initFormPanne();
            this.TlistePanne();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsModif = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    }
  }

  TlistePanne() {
    this.vehiculeService.getPannebyIdVehicule(this.id).subscribe((reponse) => {
      this.Pannes = reponse;
      this.listePannes = this.Pannes.results.resultat;
      this.dataSourcePanne.data = this.listePannes;
      /* this.isLoadingResults = false;
      this.urlPhoto = this.configService.urlgRTI;*/
    });
  }

  listPanneaReparer() {
    this.vehiculeService
      .getListePanneAreparerbyIdVehicule(this.id)
      .subscribe((reponse) => {
        this.Pannesareparer = reponse;
        this.listePannesareparer = this.Pannesareparer.results.resultat;
      });
  }

  listPanneaReparerByID(ID) {
    this.vehiculeService.getListePanneAreparerbyId(ID).subscribe((reponse) => {
      this.Pannesareparer = reponse;
      this.listePannesareparer = this.Pannesareparer.results.resultat;
    });
  }

  loadOnePanne(PanneID) {
    //  this.addOrUpdate = false;
    this.OuvrirFormPanne();
    this.vehiculeService.getPannebyId(PanneID).subscribe((reponse) => {
      this.OnePanne = reponse;
      this.vehiculeFormPanne.controls["LpanneID"].setValue(
        this.OnePanne.results[0].ID
      );
      this.vehiculeFormPanne.controls["panneDate"].setValue(
        this.OnePanne.results[0].panneDate
      );
      this.vehiculeFormPanne.controls["panneLibelle"].setValue(
        this.OnePanne.results[0].panneLibelle
      );
      this.vehiculeFormPanne.controls["panneKilometrage"].setValue(
        this.OnePanne.results[0].panneKilometrage
      );
      this.vehiculeFormPanne.controls["panneDescription"].setValue(
        this.OnePanne.results[0].panneDescription
      );
      this.vehiculeFormPanne.controls["panneStatut"].setValue(
        this.OnePanne.results[0].panneStatut
      );
      //this.ModifsVisiteLoadingResults = false;
    });
  }

  /////////////////////FIN PANNE///////////////////////////

  /////////////////////DEBUT Sinistre///////////////////////////

  initFormSinistre() {
    this.vehiculeFormSinistre = this.formBuilder.group({
      LsinistreID: [""],
      sinistreLieu: ["", Validators.required],
      sinistreDate: ["", Validators.required],
      sinistreHeure: [""],
      sinistreNature: [""],
      naturesinistre_ID: [""],
      sinistreKilometrage: ["", Validators.required],
      sinistreConducteur: ["", Validators.required],
      panneSinistre: ["", Validators.required],
      sinistreAutreacteur: [""],
      sinistreVehiculeconcerne: [""],
      marque_ID: [""],
      modele_ID: [""],
      sinistreAutreacteurNomPrenoms: [""],
      sinistreAutreacteurContact: [""],
      sinistreAutreacteurPoliceAsurance: [""],
      sinistreAutreacteurAsurance: [""],
      sinistreAutreacteurDateDebutAsurance: [""],
      sinistreAutreacteurDateFinAsurance: [""],
      sinistreDescription: [""],
      sinistreFileModif: [""],
    });
    //Chargement des marques des vehicules
    this.sinistreFile = "";
    this.loadNatureSinistre();
    this.loadMarques();
  }

  onSubmitFormSinistre(f) {
    this.isLoadingResultsModif = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    /* this.hiddenDetailProgramme = false;
      this.hiddenSaveButtom = true;
      this.hiddenListeEntretien = true;*/

    FormDataVeh.append("LsinistreID", f.LsinistreID);
    FormDataVeh.append("sinistreLieu", f.sinistreLieu);
    FormDataVeh.append("sinistreDate", f.sinistreDate);
    FormDataVeh.append("sinistreHeure", f.sinistreHeure);
    FormDataVeh.append("sinistreNature", f.sinistreNature);
    FormDataVeh.append("sinistreKilometrage", f.sinistreKilometrage);
    FormDataVeh.append("sinistreConducteur", f.sinistreConducteur);
    FormDataVeh.append("panneSinistre", f.panneSinistre);
    FormDataVeh.append("sinistreAutreacteur", f.sinistreAutreacteur);
    FormDataVeh.append("sinistreVehiculeconcerne", f.sinistreVehiculeconcerne);
    FormDataVeh.append("marque_ID", f.marque_ID);
    FormDataVeh.append("modele_ID", f.modele_ID);
    FormDataVeh.append("naturesinistre_ID", f.naturesinistre_ID);

    FormDataVeh.append(
      "sinistreAutreacteurNomPrenoms",
      f.sinistreAutreacteurNomPrenoms
    );
    FormDataVeh.append(
      "sinistreAutreacteurContact",
      f.sinistreAutreacteurContact
    );

    FormDataVeh.append(
      "sinistreAutreacteurPoliceAsurance",
      f.sinistreAutreacteurPoliceAsurance
    );
    FormDataVeh.append(
      "sinistreAutreacteurAsurance",
      f.sinistreAutreacteurAsurance
    );
    FormDataVeh.append(
      "sinistreAutreacteurDateDebutAsurance",
      f.sinistreAutreacteurDateDebutAsurance
    );
    FormDataVeh.append(
      "sinistreAutreacteurDateFinAsurance",
      f.sinistreAutreacteurDateFinAsurance
    );
    FormDataVeh.append("sinistreDescription", f.sinistreDescription);
    FormDataVeh.append("sinistreFile", this.selecetdFileSinistre);
    FormDataVeh.append("sinistreFileModif", f.sinistreFileModif);

    FormDataVeh.append("vehicule_ID", this.id);
    FormDataVeh.append("sinistreReparer", "0");

    if (f.LsinistreID != "") {
      //Modif;
      this.vehiculeService.updateSinistre(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.initFormSinistre();
            this.selecetdFileSinistre = "";
            this.TlisteSinistre();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsModif = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    } else {
      //Nouveau;
      this.vehiculeService.saveSinistre(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.initFormSinistre();
            this.selecetdFileSinistre = "";
            this.TlisteSinistre();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsModif = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    }
  }

  loadNatureSinistre() {
    this.vehiculeService.listeNatureSinistre().subscribe((reponse) => {
      this.listenaturesinistre = reponse;
    });
  }

  TlisteSinistre() {
    this.vehiculeService
      .getSinistrebyIdVehicule(this.id)
      .subscribe((reponse) => {
        this.Sinistre = reponse;
        this.listeSinistre = this.Sinistre.results.resultat;
        this.dataSourceSinistreNew.data = this.listeSinistre;
        /* this.isLoadingResults = false;
        this.urlPhoto = this.configService.urlgRTI;*/
      });
  }

  listSinistreaReparer() {
    this.vehiculeService
      .getListeSinistreAreparerbyIdVehicule(this.id)
      .subscribe((reponse) => {
        this.Sinistreareparer = reponse;
        this.listeSinistreareparer = this.Sinistreareparer.results.resultat;
      });
  }

  listSinistreaReparerByID(ID) {
    this.vehiculeService
      .getListeSinistreAreparerbyId(ID)
      .subscribe((reponse) => {
        this.Sinistreareparer = reponse;
        this.listeSinistreareparer = this.Sinistreareparer.results.resultat;
      });
  }

  loadOneSinistre(SinistreID) {
    //  this.addOrUpdate = false;
    this.OuvrirFormSinistre();
    this.vehiculeService.getSinistrebyId(SinistreID).subscribe((reponse) => {
      this.OneSinistre = reponse;
      this.vehiculeFormSinistre.controls["LsinistreID"].setValue(
        this.OneSinistre.results[0].ID
      );
      this.vehiculeFormSinistre.controls["sinistreLieu"].setValue(
        this.OneSinistre.results[0].sinistreLieu
      );
      this.vehiculeFormSinistre.controls["sinistreDate"].setValue(
        this.OneSinistre.results[0].sinistreDate
      );
      this.vehiculeFormSinistre.controls["sinistreHeure"].setValue(
        this.OneSinistre.results[0].sinistreHeure
      );
      this.vehiculeFormSinistre.controls["sinistreNature"].setValue(
        this.OneSinistre.results[0].sinistreNature
      );
      this.vehiculeFormSinistre.controls["sinistreKilometrage"].setValue(
        this.OneSinistre.results[0].sinistreKilometrage
      );

      this.vehiculeFormSinistre.controls["naturesinistre_ID"].setValue(
        this.OneSinistre.results[0].naturesinistre_ID
      );

      this.vehiculeFormSinistre.controls["sinistreConducteur"].setValue(
        this.OneSinistre.results[0].sinistreConducteur
      );
      this.vehiculeFormSinistre.controls["panneSinistre"].setValue(
        this.OneSinistre.results[0].panneSinistre
      );
      this.vehiculeFormSinistre.controls["sinistreAutreacteur"].setValue(
        this.OneSinistre.results[0].sinistreAutreacteur
      );
      this.vehiculeFormSinistre.controls["sinistreVehiculeconcerne"].setValue(
        this.OneSinistre.results[0].sinistreVehiculeconcerne
      );
      this.vehiculeFormSinistre.controls["marque_ID"].setValue(
        this.OneSinistre.results[0].marque_ID
      );
      this.vehiculeFormSinistre.controls["modele_ID"].setValue(
        this.OneSinistre.results[0].modele_ID
      );
      this.loadModelByMarques(this.OneSinistre.results[0].marque_ID);

      this.vehiculeFormSinistre.controls[
        "sinistreAutreacteurNomPrenoms"
      ].setValue(this.OneSinistre.results[0].sinistreAutreacteurNomPrenoms);
      this.vehiculeFormSinistre.controls["sinistreAutreacteurContact"].setValue(
        this.OneSinistre.results[0].sinistreAutreacteurContact
      );
      this.vehiculeFormSinistre.controls[
        "sinistreAutreacteurPoliceAsurance"
      ].setValue(this.OneSinistre.results[0].sinistreAutreacteurPoliceAsurance);
      this.vehiculeFormSinistre.controls[
        "sinistreAutreacteurAsurance"
      ].setValue(this.OneSinistre.results[0].sinistreAutreacteurAsurance);
      this.vehiculeFormSinistre.controls[
        "sinistreAutreacteurDateDebutAsurance"
      ].setValue(
        this.OneSinistre.results[0].sinistreAutreacteurDateDebutAsurance
      );
      this.vehiculeFormSinistre.controls[
        "sinistreAutreacteurDateFinAsurance"
      ].setValue(
        this.OneSinistre.results[0].sinistreAutreacteurDateFinAsurance
      );

      this.vehiculeFormSinistre.controls["sinistreDescription"].setValue(
        this.OneSinistre.results[0].sinistreDescription
      );
      if (this.OneSinistre.results[0].sinistreFile) {
        this.sinistreFile =
          this.configService.urlgRTI + this.OneSinistre.results[0].sinistreFile;
      } else {
        this.sinistreFile = "";
      }

      this.vehiculeFormSinistre.controls["sinistreFileModif"].setValue(
        this.OneSinistre.results[0].sinistreFile
      );
      //this.ModifsVisiteLoadingResults = false;
    });
  }

  onFileUploadSinistre(event) {
    this.selecetdFileSinistre = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewAssurance = reader.result;
    };
    reader.readAsDataURL(this.selecetdFileSinistre);
  }

  /////////////////////FIN SINISTRE///////////////////////////

  /////////////////////DEBUT REPARATION///////////////////////////

  initFormReparation() {
    this.vehiculeFormReparation = this.formBuilder.group({
      LreparationID: [""],
      reparationpanneOrSinistreID: ["", Validators.required],
      reparationGaragisteID: ["", Validators.required],
      reparationDate: ["", Validators.required],
      reparationLibelle: ["", Validators.required],
      reparationKilometrage: ["", Validators.required],
      reparationDescription: [""],
      reparationStatut: ["", Validators.required],
      reparationFactureProformaModif: [""],
      reparationBondeCommandeModif: [""],
      reparationFactureModif: [""],
      reparationFactureProformaModifNew: [""],
      reparationBondeCommandeModifNew: [""],
      reparationFactureModifNew: [""],
    });
    //Chargement des marques des vehicules
    this.listPanneaReparer();
    this.listSinistreaReparer();
    this.TlisteReparation();
  }

  initFormDetailReparation() {
    this.vehiculeFormDetailReparation = this.formBuilder.group({
      LreparationDetailID: ["", Validators.required],
      reparationDetailDesignation: ["", Validators.required],
      reparationDetailQuantite: ["", Validators.required],
      reparationDetailPrixUnit: ["", Validators.required],
    });
    //Chargement des marques des vehicules
  }

  onSubmitFormReparation(f) {
    this.isLoadingResultsModif = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    /* this.hiddenDetailProgramme = false;
      this.hiddenSaveButtom = true;
      this.hiddenListeEntretien = true;*/

    FormDataVeh.append("LreparationID", f.LreparationID);
    FormDataVeh.append(
      "reparationpanneOrSinistreID",
      f.reparationpanneOrSinistreID
    );
    FormDataVeh.append("reparationGaragisteID", f.reparationGaragisteID);
    FormDataVeh.append("reparationDate", f.reparationDate);
    FormDataVeh.append("reparationLibelle", f.reparationLibelle);
    FormDataVeh.append("reparationKilometrage", f.reparationKilometrage);
    FormDataVeh.append("reparationDescription", f.reparationDescription);
    FormDataVeh.append("reparationStatut", f.reparationStatut);
    FormDataVeh.append(
      "reparationFactureProformaModif",
      this.selecetdFileFactureProforma
    );
    FormDataVeh.append(
      "reparationBondeCommandeModif",
      this.selecetdFileBondeCommande
    );
    FormDataVeh.append("reparationFactureModif", this.selecetdFileFacture);
    FormDataVeh.append("vehicule_ID", this.id);
    FormDataVeh.append(
      "reparationFactureProformaModifNew",
      f.reparationFactureProformaModifNew
    );
    FormDataVeh.append(
      "reparationBondeCommandeModifNew",
      f.reparationBondeCommandeModifNew
    );
    FormDataVeh.append(
      "reparationFactureModifNew",
      f.reparationFactureModifNew
    );
    if (f.LreparationID != "") {
      //Modif;
      this.vehiculeService.updateReparation(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.TlisteReparation();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsModif = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    } else {
      //Nouveau;

      this.vehiculeService.saveReparation(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.vehiculeFormReparation.disable();
            this.updatePanneOrSinistre(f.reparationpanneOrSinistreID, this.id);

            this.vehiculeFormDetailReparation.controls[
              "LreparationDetailID"
            ].setValue(result.results.lastInsertId);
            //montrer et cacher les boutons
            this.hiddenTabReparationSave = false;
            this.hiddenTabReparation = true;

            this.TlisteReparation();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsModif = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    }
  }

  onSubmitFormDetailReparation(f) {
    this.isLoadingResultsModif = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append("LreparationDetailID", f.LreparationDetailID);
    FormDataVeh.append(
      "reparationDetailDesignation",
      f.reparationDetailDesignation
    );
    FormDataVeh.append("reparationDetailQuantite", f.reparationDetailQuantite);
    FormDataVeh.append("reparationDetailPrixUnit", f.reparationDetailPrixUnit);
    //Nouveau;

    this.vehiculeService.saveReparationDetail(FormDataVeh).subscribe(
      (result) => {
        if (result.success == true) {
          this.reponse = result;
          this.toastr.success(result.message);
          this.vehiculeFormDetailReparation.controls[
            "reparationDetailDesignation"
          ].setValue("");
          this.vehiculeFormDetailReparation.controls[
            "reparationDetailQuantite"
          ].setValue("");
          this.vehiculeFormDetailReparation.controls[
            "reparationDetailPrixUnit"
          ].setValue("");
          this.TlisteReparationDetail(f.LreparationDetailID); //
        } else {
          this.toastr.error(result.message);
          this.isLoadingResultsModif = false;
        }
      },
      (ret) => {
        this.toastr.error(ret.message, "Erreur Code : " + ret.code);
        //this.isLoadingResults = false;
      }
    );
  }

  TlisteReparationDetail(DetailID) {
    this.vehiculeService
      .getReparationDetailbyIdVehicule(DetailID)
      .subscribe((reponse) => {
        this.ReparationDetail = reponse;
        this.listeReparationDetail = this.ReparationDetail.results.resultat;
        this.dataSourceReparationDetail.data = this.listeReparationDetail;

        /* this.isLoadingResults = false;
        this.urlPhoto = this.configService.urlgRTI;*/
      });
  }

  TlisteReparation() {
    this.vehiculeService
      .getReparationbyIdVehicule(this.id)
      .subscribe((reponse) => {
        this.Reparation = reponse;
        this.listeReparation = this.Reparation.results.resultat;
        this.dataSourceReparation.data = this.listeReparation;
        /* this.isLoadingResults = false;
        this.urlPhoto = this.configService.urlgRTI;*/
      });
  }

  loadOneReparation(reparationID) {
    //  this.addOrUpdate = false;
    this.actionCloseReparation(1);
    this.vehiculeFormReparation.controls[
      "reparationpanneOrSinistreID"
    ].disable();
    this.vehiculeService
      .getReparationbyId(reparationID)
      .subscribe((reponse) => {
        this.OneReparation = reponse;
        this.vehiculeFormReparation.controls["LreparationID"].setValue(
          this.OneReparation.results[0].reparationID
        );
        this.vehiculeFormDetailReparation.controls[
          "LreparationDetailID"
        ].setValue(this.OneReparation.results[0].reparationID);
        this.vehiculeFormReparation.controls[
          "reparationpanneOrSinistreID"
        ].setValue(this.OneReparation.results[0].reparationpanneOrSinistreID);
        this.listPanneaReparerByID(
          this.OneReparation.results[0].reparationpanneOrSinistreID
        );
        this.listSinistreaReparerByID(
          this.OneReparation.results[0].reparationpanneOrSinistreID
        );
        this.vehiculeFormReparation.controls["reparationGaragisteID"].setValue(
          this.OneReparation.results[0].reparationGaragisteID
        );
        this.vehiculeFormReparation.controls["reparationDate"].setValue(
          this.OneReparation.results[0].reparationDate
        );
        this.vehiculeFormReparation.controls["reparationLibelle"].setValue(
          this.OneReparation.results[0].reparationLibelle
        );
        this.vehiculeFormReparation.controls["reparationKilometrage"].setValue(
          this.OneReparation.results[0].reparationKilometrage
        );
        this.vehiculeFormReparation.controls["reparationDescription"].setValue(
          this.OneReparation.results[0].reparationDescription
        );
        this.vehiculeFormReparation.controls["reparationStatut"].setValue(
          this.OneReparation.results[0].reparationStatut
        );
        this.vehiculeFormReparation.controls[
          "reparationFactureProformaModifNew"
        ].setValue(this.OneReparation.results[0].reparationFactureProforma);

        this.vehiculeFormReparation.controls[
          "reparationBondeCommandeModifNew"
        ].setValue(this.OneReparation.results[0].reparationBondeCommande);

        this.vehiculeFormReparation.controls[
          "reparationFactureModifNew"
        ].setValue(this.OneReparation.results[0].reparationFacture);

        if (this.OneReparation.results[0].reparationFactureProforma) {
          this.reparationFactureProforma =
            this.configService.urlgRTI +
            this.OneReparation.results[0].reparationFactureProforma;
        } else {
          this.reparationFactureProforma = "";
        }

        if (this.OneReparation.results[0].reparationBondeCommande) {
          this.reparationLeBondeCommande =
            this.configService.urlgRTI +
            this.OneReparation.results[0].reparationBondeCommande;
        } else {
          this.reparationLeBondeCommande = "";
        }

        if (this.OneReparation.results[0].reparationFacture) {
          this.reparationFacture =
            this.configService.urlgRTI +
            this.OneReparation.results[0].reparationFacture;
        } else {
          this.reparationFacture = "";
        }

        this.vehiculeFormSinistre.controls["sinistreFileModif"].setValue(
          this.OneSinistre.results[0].sinistreFile
        );

        //this.ModifsVisiteLoadingResults = false;
      });
    this.hiddenTabReparation = true;
    this.TlisteReparationDetail(reparationID);
    this.myInputVariableFacture.nativeElement.value = "";
    this.myInputVariableFactureProforma.nativeElement.value = "";
    this.myInputVariableBondeCommande.nativeElement.value = "";
  }

  onFileUploadFactureProforma(event) {
    this.selecetdFileFactureProforma = event.target.files[0];
    const reader = new FileReader();
    /* reader.onload = () => {
      this.imagePreviewAssurance = reader.result;
    };
    reader.readAsDataURL(this.selecetdFileFactureProforma);*/
  }

  onFileUploadBondeCommande(event) {
    this.selecetdFileBondeCommande = event.target.files[0];
    /* const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewAssurance = reader.result;
    };
    reader.readAsDataURL(this.selecetdFileBondeCommande);*/
  }

  onFileUploadFacture(event) {
    this.selecetdFileFacture = event.target.files[0];
    const reader = new FileReader();
    /* reader.onload = () => {
      this.imagePreviewAssurance = reader.result;
    };
    reader.readAsDataURL(this.selecetdFileFacture);*/
  }

  updatePanneOrSinistre(ID, IDvehicule) {
    this.vehiculeService.updatePanneOrSinistreId(ID, IDvehicule).subscribe(
      (reponse) => {
        this.toastr.success("Modifucation terminée avec succès ! ");
        //this.TlisteReparation();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }

  supprimeReparation() {
    this.vehiculeService.deleteReparation(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.updatePanneOrSinistreToZERO();
        this.TlisteReparationDetail(this.DetailreparationID);
        this.TlisteReparation();
        this.ResetFormReparationAndDetail();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }

  ResetFormReparationAndDetail() {
    this.initFormReparation();
    this.initFormDetailReparation();
    this.cdr.detectChanges();
    this.vehiculeFormReparation.enable();
    this.hiddenTabReparationSave = true;
    this.hiddenTabReparation = false;
    this.FermerFormReparation();
    this.myInputVariableFacture.nativeElement.value = "";
    this.myInputVariableFactureProforma.nativeElement.value = "";
    this.myInputVariableBondeCommande.nativeElement.value = "";
  }

  updatePanneOrSinistreToZERO() {
    this.vehiculeService
      .updatePanneOrSinistreIdToZERO(this.reparationpanneOrSinistreID, this.id)
      .subscribe(
        (reponse) => {
          this.toastr.success("Modifucation terminée avec succès ! ");
          //this.TlisteReparation();
        },
        (ret) => {
          this.toastr.error(
            ret.error.message +
              " : " +
              ret.error.description +
              "[" +
              ret.message +
              "]",
            "Erreur Code : " + ret.error.code
          );
        }
      );
  }

  supprimeReparationDetail() {
    this.vehiculeService.deleteReparationDetail(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteReparationDetail(this.DetailreparationID);
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }

  /////////////////////FIN REPARATION///////////////////////////

  //////////////////////DEBUT ENTRETIEN//////////////////////////////

  initFormEntretien() {
    this.vehiculeFormEntretien = this.formBuilder.group({
      lentretientID: [""],
      entretientype: ["", Validators.required],
      entretienGarage: ["", Validators.required], //, Validators.required
      entretienDateDepart: ["", Validators.required],
      entretienkilometrageDepart: ["", Validators.required],
      entretienDateRetour: ["", Validators.required],
      entretienkilometrageRetour: [""],
      entretienlibelle: ["", Validators.required],
      entretienMontantRepar: ["", Validators.required],
      entretienDescription: [""],
      entretienFacProforma: [""],
      entretienBonCommande: [""],
      entretienFacture: [""],
      entretienFacProformaNew: [""],
      entretienBonCommandeNew: [""],
      entretienFactureNew: [""],
      lentretientDetailID: [""],
    });
    this.TlisteEntretien();
  }

  initFormDetailEntretien() {
    this.vehiculeFormDetailEntretient = this.formBuilder.group({
      lentretientDetailID: [""],
      entretienDetailTraveauEffec: ["", Validators.required],
      entretienDetailTraveauQuant: ["", Validators.required],
      entretienDetailTraveauPrix: ["", Validators.required],
      entretienDetailTraveauObserv: [""],
    });
    //Chargement des marques des vehicules
    //this.TlisteEntretienDetail(3)
  }

  initFormProgrammeEntreien() {
    this.vehiculeFormProgrammeEntreien = this.formBuilder.group({
      lentretientProgrammeID: ["", Validators.required],
      programmeentretientype: ["", Validators.required],
      programmeRappel: ["", Validators.required],
      programmeDate: ["", Validators.required],
      programmeRappelPeriode: ["1", Validators.required],
      programmeRappelKilo: [""],
    });
    //Chargement des marques des vehicules
    this.TlisteEntretienProgrammeDetail();
  }

  onSubmitFormEntretien(f) {
    this.isLoadingResultsEntretient = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    /* this.hiddenDetailProgramme = false;
    this.hiddenSaveButtom = true;
    this.hiddenListeEntretien = true;*/

    FormDataVeh.append("lentretientID", f.lentretientID);
    FormDataVeh.append("entretientypeID", f.entretientype);
    FormDataVeh.append("entretienGarageID", f.entretienGarage);
    FormDataVeh.append("entretienDateDepart", f.entretienDateDepart);
    FormDataVeh.append(
      "entretienkilometrageDepart",
      f.entretienkilometrageDepart
    );
    FormDataVeh.append("entretienDateRetour", f.entretienDateRetour);
    FormDataVeh.append(
      "entretienkilometrageRetour",
      f.entretienkilometrageRetour
    );
    FormDataVeh.append("entretienlibelle", f.entretienlibelle);
    FormDataVeh.append("entretienDescription", f.entretienDescription);
    FormDataVeh.append(
      "entretienFacProforma",
      this.selecetdFileFactureProforma
    );
    FormDataVeh.append("entretienBonCommande", this.selecetdFileBondeCommande);
    FormDataVeh.append("entretienFacture", this.selecetdFileFacture);
    FormDataVeh.append("vehicule_ID", this.id);
    FormDataVeh.append("entretienFacProformaNew", f.entretienFacProformaNew);
    FormDataVeh.append("entretienBonCommandeNew", f.entretienBonCommandeNew);
    FormDataVeh.append("entretienFactureNew", f.entretienFactureNew);
    FormDataVeh.append("entretienMontantRepar", f.entretienMontantRepar);

    if (f.lentretientID != "") {
      //Modif;
      this.vehiculeService.updateEntretien(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.TlisteEntretien();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsEntretient = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    } else {
      //Nouveau;

      this.vehiculeService.saveEntretien(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.vehiculeFormEntretien.disable();
            this.vehiculeFormDetailEntretient.controls[
              "lentretientDetailID"
            ].setValue(result.results.lastInsertId);
            this.vehiculeFormProgrammeEntreien.controls[
              "lentretientProgrammeID"
            ].setValue(result.results.lastInsertId);
            //montrer et cacher les boutons
            this.hiddenTabEntretienSave = false;
            this.hiddenTabEntretein = true;

            this.TlisteEntretien();
            this.programmable(f.entretientype);
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsEntretient = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    }
  }

  loadOneEntretien(entretienID) {
    this.isLoadingResultsEntretient = true;
    this.actionCloseEntretien(1);
    this.hiddenTabEntretein = true;
    this.vehiculeService.getEntretienyId(entretienID).subscribe((reponse) => {
      this.OneEntretien = reponse;
      this.vehiculeFormEntretien.controls["lentretientID"].setValue(
        this.OneEntretien.results[0].ID
      );
      this.vehiculeFormDetailEntretient.controls[
        "lentretientDetailID"
      ].setValue(this.OneEntretien.results[0].ID);
      this.vehiculeFormProgrammeEntreien.controls[
        "lentretientProgrammeID"
      ].setValue(this.OneEntretien.results[0].ID);
      this.vehiculeFormEntretien.controls["entretientype"].setValue(
        this.OneEntretien.results[0].entretientypeID
      );
      this.vehiculeFormEntretien.controls["entretientype"].disable();
      this.vehiculeFormProgrammeEntreien.controls[
        "programmeentretientype"
      ].setValue(this.OneEntretien.results[0].entretientypeID);

      this.programmable(this.OneEntretien.results[0].entretientypeID);

      this.vehiculeFormEntretien.controls["entretienGarage"].setValue(
        this.OneEntretien.results[0].entretienGarageID
      );

      this.vehiculeFormEntretien.controls["entretienDateDepart"].setValue(
        this.OneEntretien.results[0].entretienDateDepart
      );
      this.vehiculeFormEntretien.controls[
        "entretienkilometrageDepart"
      ].setValue(this.OneEntretien.results[0].entretienkilometrageDepart);
      this.vehiculeFormEntretien.controls["entretienDateRetour"].setValue(
        this.OneEntretien.results[0].entretienDateRetour
      );
      this.vehiculeFormEntretien.controls[
        "entretienkilometrageRetour"
      ].setValue(this.OneEntretien.results[0].entretienkilometrageRetour);
      this.vehiculeFormEntretien.controls["entretienlibelle"].setValue(
        this.OneEntretien.results[0].entretienlibelle
      );
      this.vehiculeFormEntretien.controls["entretienMontantRepar"].setValue(
        this.OneEntretien.results[0].entretienMontantRepar
      );

      this.vehiculeFormEntretien.controls["entretienDescription"].setValue(
        this.OneEntretien.results[0].entretienDescription
      );
      this.vehiculeFormEntretien.controls["entretienFacProformaNew"].setValue(
        this.OneEntretien.results[0].entretienFacProforma
      );

      this.vehiculeFormEntretien.controls["entretienBonCommandeNew"].setValue(
        this.OneEntretien.results[0].entretienBonCommande
      );

      this.vehiculeFormEntretien.controls["entretienFactureNew"].setValue(
        this.OneEntretien.results[0].entretienFacture
      );

      if (this.OneEntretien.results[0].entretienFacProforma) {
        this.entretienDocFacProforma =
          this.configService.urlgRTI +
          this.OneEntretien.results[0].entretienFacProforma;
      } else {
        this.entretienDocFacProforma = "";
      }

      if (this.OneEntretien.results[0].entretienBonCommande) {
        this.entretienDocBonCommande =
          this.configService.urlgRTI +
          this.OneEntretien.results[0].entretienBonCommande;
      } else {
        this.entretienDocBonCommande = "";
      }

      if (this.OneEntretien.results[0].entretienFacture) {
        this.entretienDocFacture =
          this.configService.urlgRTI +
          this.OneEntretien.results[0].entretienFacture;
      } else {
        this.entretienDocFacture = "";
      }

      /*  this.vehiculeFormSinistre.controls["sinistreFileModif"].setValue(
          this.OneSinistre.results[0].sinistreFile
        );*/
      this.getAllDetailsByID(this.OneEntretien.results[0].entretientypeID);
      this.TlisteEntretienDetail(this.OneEntretien.results[0].ID);

      //this.ModifsVisiteLoadingResults = false;
    });
    this.hiddenTabReparation = true;
    // this.TlisteReparationDetail(ID);
    this.myInputVariableentretienFactureProforma.nativeElement.value = "";
    this.myInputVariableentretienBonCommande.nativeElement.value = "";
    this.myInputVariableentretienDocFacture.nativeElement.value = "";
    this.isLoadingResultsEntretient = false;
  }

  onSubmitFormDetailEntretein(f) {
    this.isLoadingResultsEntretient = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append("lentretientDetailID", f.lentretientDetailID);
    FormDataVeh.append(
      "entretienDetailTraveauEffec",
      f.entretienDetailTraveauEffec
    );
    FormDataVeh.append(
      "entretienDetailTraveauQuant",
      f.entretienDetailTraveauQuant
    );
    FormDataVeh.append(
      "entretienDetailTraveauPrix",
      f.entretienDetailTraveauPrix
    );
    FormDataVeh.append(
      "entretienDetailTraveauObserv",
      f.entretienDetailTraveauObserv
    );

    //Nouveau;

    this.vehiculeService.saveEntretienDetail(FormDataVeh).subscribe(
      (result) => {
        if (result.success == true) {
          this.reponse = result;
          this.toastr.success(result.message);
          this.vehiculeFormDetailEntretient.controls[
            "entretienDetailTraveauEffec"
          ].setValue("");
          this.vehiculeFormDetailEntretient.controls[
            "entretienDetailTraveauQuant"
          ].setValue("");
          this.vehiculeFormDetailEntretient.controls[
            "entretienDetailTraveauPrix"
          ].setValue("");
          this.vehiculeFormDetailEntretient.controls[
            "entretienDetailTraveauObserv"
          ].setValue("");

          this.TlisteEntretienDetail(f.lentretientDetailID); //
        } else {
          this.toastr.error(result.message);
          this.isLoadingResultsEntretient = false;
        }
      },
      (ret) => {
        this.toastr.error(ret.message, "Erreur Code : " + ret.code);
        //this.isLoadingResults = false;
      }
    );
  }

  onSubmitFormEntreteinProgramme(f) {
    this.isLoadingResultsEntretient = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append("lentretientProgrammeID", f.lentretientProgrammeID);
    FormDataVeh.append("programmeentretientype", f.programmeentretientype);
    FormDataVeh.append("programmeDate", f.programmeDate);
    FormDataVeh.append("programmeRappel", f.programmeRappel);
    FormDataVeh.append("programmeRappelPeriode", "1");
    FormDataVeh.append("programmeRappelKilo", f.programmeRappelKilo);
    FormDataVeh.append("vehicule_ID", this.id);
    //Nouveau;

    this.vehiculeService.saveEntretienProgramme(FormDataVeh).subscribe(
      (result) => {
        if (result.success == true) {
          this.reponse = result;
          this.toastr.success(result.message);
          /*this.vehiculeFormProgrammeEntreien.controls[
            "programmeentretientype"
          ].setValue("");*/
          this.vehiculeFormProgrammeEntreien.controls[
            "programmeRappel"
          ].setValue("");
          this.vehiculeFormProgrammeEntreien.controls["programmeDate"].setValue(
            ""
          );
          this.vehiculeFormProgrammeEntreien.controls[
            "programmeRappelPeriode"
          ].setValue("1");
          this.vehiculeFormProgrammeEntreien.controls[
            "programmeRappelKilo"
          ].setValue("");
          this.TlisteEntretienProgrammeDetail();
        } else {
          this.toastr.error(result.message);
          this.isLoadingResultsEntretient = false;
        }
      },
      (ret) => {
        this.toastr.error(ret.message, "Erreur Code : " + ret.code);
        //this.isLoadingResults = false;
      }
    );
  }

  TlisteEntretienProgrammeDetail() {
    this.vehiculeService
      .getEntretienProgrammeDetailbyIdVehicule(this.id)
      .subscribe((reponse) => {
        this.EntretienProgrammeDetail = reponse;
        this.listeEntretienProgrammeDetail =
          this.EntretienProgrammeDetail.results.resultat;
        this.dataSourceEntretienProgrammeDetail.data =
          this.listeEntretienProgrammeDetail;
      });
  }

  TlisteEntretienDetail(DetailID) {
    this.vehiculeService
      .getEntretienDetailbyIdVehicule(DetailID)
      .subscribe((reponse) => {
        this.EntretienDetail = reponse;
        this.listeEntretienDetail = this.EntretienDetail.results.resultat;
        this.dataSourceEntretienDetail.data = this.listeEntretienDetail;
      });
  }

  TlisteEntretien() {
    this.vehiculeService
      .getEntretienbyIdVehicule(this.id)
      .subscribe((reponse) => {
        this.Entretien = reponse;
        this.listeEntretien = this.Entretien.results.resultat;
        this.dataSourceEntretien.data = this.listeEntretien;
      });
  }

  ItemSupprimeDetailEntretien(id, name, reparationID) {
    this.IDSuppression = id;
    this.NameSuppression = name;
    this.DetailreparationID = reparationID;
  }

  supprimeEntretienDetail() {
    this.vehiculeService.deleteEntretienDetail(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteEntretienDetail(this.DetailreparationID);
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }

  supprimeEntretienProgramm() {
    this.vehiculeService.deleteEntretienProgramm(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteEntretienProgrammeDetail();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }
  supprimeEntretien() {
    this.isLoadingResultsEntretient = true;
    this.vehiculeService.deleteEntretien(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteEntretien();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
    this.isLoadingResultsEntretient = false;
  }

  ResetFormEntretienAndDetail() {
    this.initFormEntretien();
    this.initFormDetailEntretien();
    this.cdr.detectChanges();
    this.vehiculeFormEntretien.enable();
    this.hiddenTabEntretienSave = true;
    this.hiddenTabEntretein = false;
    this.FermerFormEntretien();
    this.myInputVariableentretienFactureProforma.nativeElement.value = "";
    this.myInputVariableentretienBonCommande.nativeElement.value = "";
    this.myInputVariableentretienDocFacture.nativeElement.value = "";
  }

  actionCloseEntretien(f) {
    if (f != 1) {
      this.FermerFormEntretien();
      this.ResetFormEntretienAndDetail();
    } else {
      this.OuvrirFormEntretien();
    }
  }

  OuvrirFormEntretien() {
    this.hiddenEntretien = false;
    this.ActionCloseEntretien = false;
    this.ActionOpenEntretien = true;
    this.hiddenListeEntretien = true;
    this.hiddenListeProgramable = true;
  }

  FermerFormEntretien() {
    this.hiddenEntretien = true;
    this.ActionCloseEntretien = true;
    this.ActionOpenEntretien = false;
    //this.initFormVisiteTech();
    //this.addOrUpdate= true;
    this.imagePreviewVisiteTech = "";
    this.hiddenListeEntretien = false;
    this.entretienDocFacture = "";
    this.entretienDocFacProforma = "";
    this.entretienDocBonCommande = "";
    this.isLoadingResultsEntretient = false;
  }

  loadTypeEntretien() {
    this.vehiculeService.listTypeEntretien().subscribe((reponse) => {
      this.listeTypeEntret = reponse;
      //this.isLoadingResults = false;
    });
  }

  public changeTypeEntretien(event) {
    //alert(event + " / " + this.id);
    this.getDateDernierTypeentretienByVeh(event, this.id);
    this.getAllDetailsByID(event);
    this.getOneTypeentretienById(event);
    this.vehiculeFormProgrammeEntreien.controls[
      "programmeentretientype"
    ].setValue(event);
  }

  getAllDetailsByID(id) {
    this.vehiculeFormDetailEntretient.controls[
      "entretienDetailTraveauEffec"
    ].setValue("");
    this.entretienService.getAllDetailsTypeentretien(id).subscribe((ret) => {
      this.reponse = ret;
      this.listeDetailEntret = this.reponse.results;
    });
  }

  getDateDernierTypeentretienByVeh(entretientypeID, vehicule_ID) {
    this.DateDernierentretien = "";
    this.entretienService
      .getDateDernierTypeentretien(entretientypeID, vehicule_ID)
      .subscribe((ret) => {
        this.reponse = ret;
        if (this.reponse.results.length > 0) {
          this.DateDernierentretien =
            this.reponse.results[0].entretienDateDepart;
          // alert(this.DateDernierentretien);
        }
      });
  }

  getOneTypeentretienById(entretientypeID) {
    this.entretienService
      .getOneTypeentretienById(entretientypeID)
      .subscribe((ret) => {
        this.reponse = ret;
        //comparaison
        if (this.reponse.results[0].controlle == 1) {
          const date1 = new Date(this.DateDernierentretien);
          const date2 = new Date();
          date1.setDate(date1.getDate() + this.reponse.results[0].nbjourlimite);
          var d1: number = date1.getTime();
          var d2: number = date2.getTime();
          if (d1 > d2) {
            Swal.fire({
              title: "Alert!",
              text: "Un entretient de ce type a été fait ressement",
              icon: "warning",
              confirmButtonText: "Ok",
            });
          }
        }
        // alert(this.reponse.results[0].programable);
        /*if(this.reponse.results[0].programable == 1){
this.hiddenListeProgramable=false;
          }else{
            this.hiddenListeProgramable=true;
          }*/
      });
  }

  programmable(entretientypeID) {
    this.entretienService
      .getOneTypeentretienById(entretientypeID)
      .subscribe((ret) => {
        this.reponse = ret;
        //comparaison
        //alert(this.reponse.results[0].programable);
        if (this.reponse.results[0].programable == 1) {
          this.hiddenListeProgramable = false;
        } else {
          this.hiddenListeProgramable = true;
        }
      });
  }

  //////////////////////FIN  ENTRETIEN//////////////////////////////

  /////////////////////DEBUT KILOMETRAGE///////////////////////////

  initFormKilometrage() {
    this.vehiculeFormKilometage = this.formBuilder.group({
      LkilometrageID: [""],
      kilometrageDate: ["", Validators.required],
      kilometrageData: ["", Validators.required],
      kilometrageObservation: [""],
    });
    //Chargement des marques des vehicules
    this.TlisteKilometage();
  }

  onSubmitFormKilometrage(f) {
    this.isLoadingResultsModif = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append("LkilometrageID", f.LkilometrageID);
    FormDataVeh.append("kilometrageDate", f.kilometrageDate);
    FormDataVeh.append("kilometrageData", f.kilometrageData);
    FormDataVeh.append("kilometrageObservation", f.kilometrageObservation);
    FormDataVeh.append("vehicule_ID", this.id);
    if (f.LkilometrageID != "") {
      //Modif;
      this.vehiculeService.updateKilometrage(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.initFormKilometrage();
            this.TlisteKilometage();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsModif = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          this.isLoadingResultsModif = false;
        }
      );
    } else {
      //Nouveau;
      this.vehiculeService.saveKilometrage(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.initFormKilometrage();
            this.TlisteKilometage();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsModif = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          this.isLoadingResultsModif = false;
        }
      );
    }
  }

  TlisteKilometage() {
    this.vehiculeService
      .getKilometragebyIdVehicule(this.id)
      .subscribe((reponse) => {
        this.Kilometrage = reponse;
        this.listeKilometrage = this.Kilometrage.results.resultat;
        this.dataSourceKilometrage.data = this.listeKilometrage;
        this.isLoadingResultsModif = false;
      });
  }

  loadOneKilometrage(KilomeID) {
    this.isLoadingResultsModif = true;
    this.OuvrirFormKilometrage();
    this.vehiculeService.getKilometragebyId(KilomeID).subscribe((reponse) => {
      this.OneKilometre = reponse;
      this.vehiculeFormKilometage.controls["LkilometrageID"].setValue(
        this.OneKilometre.results[0].ID
      );
      this.vehiculeFormKilometage.controls["kilometrageDate"].setValue(
        this.OneKilometre.results[0].kilometrageDate
      );
      this.vehiculeFormKilometage.controls["kilometrageData"].setValue(
        this.OneKilometre.results[0].kilometrageData
      );
      this.vehiculeFormKilometage.controls["kilometrageObservation"].setValue(
        this.OneKilometre.results[0].kilometrageObservation
      );
      this.isLoadingResultsModif = false;
    });
  }

  supprimekilometrage() {
    this.isLoadingResultsModif = true;
    this.vehiculeService.deletekilometrage(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteKilometage();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }

  /////////////////////FIN KILOMETRAGE///////////////////////////

  /////////////////////DEBUT INFRACTION///////////////////////////

  initFormInfraction() {
    this.vehiculeFormInfraction = this.formBuilder.group({
      LinfractionID: [""],
      infractiondate: ["", Validators.required],
      infractionadresse: ["", Validators.required],
      infractioncitation: ["", Validators.required],
      infractionlibelle: ["", Validators.required],
      infractionvitesse: ["", Validators.required],
      infractionidentification: ["", Validators.required],
      infractionnomconducteur: ["", Validators.required],
      infractionnmontantamende: ["", Validators.required],
      InfractionFileModif: [""],
    });
    //Chargement des marques des vehicules
    this.TlisteInfraction();
  }

  onSubmitFormInfraction(f) {
    this.isLoadingResultsModif = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    /* this.hiddenDetailProgramme = false;
        this.hiddenSaveButtom = true;
        this.hiddenListeEntretien = true;*/

    FormDataVeh.append("LinfractionID", f.LinfractionID);
    FormDataVeh.append("infractiondate", f.infractiondate);
    FormDataVeh.append("infractionadresse", f.infractionadresse);
    FormDataVeh.append("infractioncitation", f.infractioncitation);
    FormDataVeh.append("infractionlibelle", f.infractionlibelle);
    FormDataVeh.append("infractionvitesse", f.infractionvitesse);
    FormDataVeh.append("infractionidentification", f.infractionidentification);
    FormDataVeh.append("infractionnomconducteur", f.infractionnomconducteur);
    FormDataVeh.append("infractionnmontantamende", f.infractionnmontantamende);
    FormDataVeh.append("InfractionFile", this.selecetdFileInfraction);
    FormDataVeh.append("InfractionFileModif", f.InfractionFileModif);
    FormDataVeh.append("vehicule_ID", this.id);

    if (f.LinfractionID != "") {
      //Modif;
      this.vehiculeService.updateInfraction(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.initFormInfraction();
            this.selecetdFileInfractionAff = "";
            this.TlisteInfraction();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsModif = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          this.isLoadingResultsModif = false;
        }
      );
    } else {
      //Nouveau;
      this.vehiculeService.saveInfraction(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.initFormInfraction();
            this.selecetdFileInfractionAff = "";
            this.TlisteInfraction();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResultsModif = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          this.isLoadingResultsModif = false;
        }
      );
    }
  }

  TlisteInfraction() {
    this.vehiculeService
      .getInfractionbyIdVehicule(this.id)
      .subscribe((reponse) => {
        this.Infraction = reponse;
        this.listeInfraction = this.Infraction.results.resultat;
        this.dataSourceInfraction.data = this.listeInfraction;
        this.isLoadingResultsModif = false;
      });
  }

  loadOneInfraction(InfractionID) {
    this.isLoadingResultsModif = true;
    this.OuvrirFormInfraction();
    this.vehiculeService
      .getInfractionbyId(InfractionID)
      .subscribe((reponse) => {
        this.OneInfraction = reponse;
        this.vehiculeFormInfraction.controls["LinfractionID"].setValue(
          this.OneInfraction.results[0].ID
        );
        this.vehiculeFormInfraction.controls["infractiondate"].setValue(
          this.OneInfraction.results[0].infractiondate
        );
        this.vehiculeFormInfraction.controls["infractionadresse"].setValue(
          this.OneInfraction.results[0].infractionadresse
        );
        this.vehiculeFormInfraction.controls["infractioncitation"].setValue(
          this.OneInfraction.results[0].infractioncitation
        );
        this.vehiculeFormInfraction.controls["infractionlibelle"].setValue(
          this.OneInfraction.results[0].infractionlibelle
        );
        this.vehiculeFormInfraction.controls["infractionvitesse"].setValue(
          this.OneInfraction.results[0].infractionvitesse
        );

        this.vehiculeFormInfraction.controls[
          "infractionidentification"
        ].setValue(this.OneInfraction.results[0].infractionidentification);
        this.vehiculeFormInfraction.controls[
          "infractionnomconducteur"
        ].setValue(this.OneInfraction.results[0].infractionnomconducteur);
        this.vehiculeFormInfraction.controls[
          "infractionnmontantamende"
        ].setValue(this.OneInfraction.results[0].infractionnmontantamende);
        if (this.OneInfraction.results[0].InfractionFile) {
          this.selecetdFileInfractionAff =
            this.configService.urlgRTI +
            this.OneInfraction.results[0].InfractionFile;
        } else {
          this.selecetdFileInfractionAff = "";
        }

        this.vehiculeFormInfraction.controls["InfractionFileModif"].setValue(
          this.OneInfraction.results[0].InfractionFile
        );
      });
    this.isLoadingResultsModif = false;
  }

  onFileUploadInfraction(event) {
    this.selecetdFileInfraction = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewAssurance = reader.result;
    };
    reader.readAsDataURL(this.selecetdFileInfraction);
  }

  supprimeInfraction() {
    this.isLoadingResultsModif = true;
    this.vehiculeService.deleteInfraction(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteInfraction();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }
  /////////////////////FIN INFRACTION///////////////////////////

  onSubmitFormDocument(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataDoc = new FormData();
    FormDataDoc.append("description", f.Description);
    FormDataDoc.append("lienPhoto", this.selecetdFileDoc);
    FormDataDoc.append("authentification_ID", varID);
    FormDataDoc.append("vehicule_ID", this.id);
    //Nouveau;
    this.vehiculeService.saveMedia(FormDataDoc).subscribe(
      (result) => {
        if (result.success == true) {
          this.reponse = result;
          this.toastr.success(result.message);
          this.MediaFIlePreview = "";
          this.TlisteAddDocument(this.id);
          //this.initFormDocument();
          //this.getNavigation('admin/admin/vehiculeList','');
        } else {
          this.toastr.error(result.message);
          this.isLoadingResults = false;
        }
      },
      (ret) => {
        this.toastr.error(ret.message, "Erreur Code : " + ret.code);
        //this.isLoadingResults = false;
      }
    );
  }

  onFileUploadDocument(event) {
    this.selecetdFileDoc = event.target.files[0];
    this.reader = new FileReader();
    this.reader.onload = () => {
      this.MediaFIlePreview = this.reader.result;
    };
    this.reader.readAsDataURL(this.selecetdFileDoc);
  }

  loadDirections() {
    this.directionService.readDirection().subscribe((dirData) => {
      this.listDirection = dirData;
      /*console.log(this.listDirection);*/
    });
  }
  changeDirection(event) {
    const value = event.target.value;
    const selectEl = event.target;
    const libelledir =
      selectEl.options[selectEl.selectedIndex].getAttribute("dir-name");
    this.Dirlibelle =
      this.vehiculeForm.controls["Dir_libelle"].setValue(libelledir);
    this.dirID = value;
    this.loadPersonnelByDirections(value); /**/
  }

  loadPersonnelByDirections(id: string) {
    this.personnelService
      .readPersonnelByDirection(id)
      .subscribe((personData) => {
        this.listPersonnel = personData;
      });
  }

  loadPersonnelByID(id: string) {
    this.personnelService.readonePersonnel(id).subscribe((personData) => {
      this.onePersonnel = personData.Photo;
      this.PersoneImage = personData.Photo;
      this.vehiculeForm.controls["Ent_PieceJointe"].setValue(personData.Photo);
      this.hidden = true;
      this.hiddenPersone = true;
      this.AficherImgx = false;
    });
  }
  onChangeSelectedPersonnelValue(event) {
    const selectEl = event.target;
    const imgx =
      selectEl.options[selectEl.selectedIndex].getAttribute("person-image");
    const imgxName =
      selectEl.options[selectEl.selectedIndex].getAttribute("person-name");
    this.PersoneImage = imgx;
    this.vehiculeForm.controls["Ent_PieceJointe"].setValue(imgx);
    this.vehiculeForm.controls["Dir_NomPrenAgent"].setValue(imgxName);
    this.hidden = true;
    this.hiddenPersone = true;
    this.AficherImgx = false;
    /* this.hidden = false;
     */
  }

  TlisteAddDocument(IdVehicule) {
    this.vehiculeService
      .getMediabyIdVehicule(IdVehicule)
      .subscribe((reponse) => {
        this.Document = reponse;
        this.listeDocument = this.Document.results.resultat;
        this.dataSource.data = this.listeDocument;
        this.isLoadingResults = false;
        this.urlPhoto = this.configService.urlgRTI;
      });
  }

  //////////////CARTE GRISE//////////////////////
  loadUsages() {
    this.vehiculeService.listeUsages().subscribe((reponse) => {
      this.listeusages = reponse;
    });
  }

  loadEnergies() {
    this.vehiculeService.listeEnergies().subscribe((reponse) => {
      this.listeenergies = reponse;
    });
  }
  initFormCarteGrise() {
    //this.isLoadingResults = false;
    this.vehiculeFormCarteGrise = this.formBuilder.group({
      numero: ["", Validators.required],
      numchassis: ["", Validators.required],
      datemiseenservice: ["", Validators.required],
      dateedition: ["", Validators.required],
      codeproprietaire: ["", Validators.required],
      genre: ["", Validators.required],
      couleur: ["", Validators.required],
      energie_ID: ["", Validators.required],
      usage_ID: ["", Validators.required],
      modele: [{ value: "", disabled: true }],
      carrosserie: [""],
      nbreplace: ["", Validators.required],
      typetechnique: ["", Validators.required],
      ptac: [""],
      puissance: [""],
      poidsvide: [""],
      nbreessieux: [""],
      cylindre: [""],
      chargeutile: [""],
      lienPhoto: [""],
      vehicule_ID: [""],
      date_creation: [""],
      date_modification: [""],
      autentification_ID: [""],
    });
  }
  loadOneCarteGrise(VehiculeID) {
    this.isLoadingResults = true;
    this.vehiculeService
      .getCartegrisebyvehiculeId(VehiculeID)
      .subscribe((reponse) => {
        this.OneCarteGrise = reponse;
        this.VerifCarteGrise = this.OneCarteGrise.results.total;
        /* if (this.VerifCarteGrise) {
        this.TabCarteGrise= true;
      }*/
        this.vehiculeFormCarteGrise.controls["numero"].setValue(
          this.OneCarteGrise.results.resultat[0].numero
        );
        this.vehiculeFormCarteGrise.controls["numchassis"].setValue(
          this.OneCarteGrise.results.resultat[0].numchassis
        );
        this.vehiculeFormCarteGrise.controls["datemiseenservice"].setValue(
          this.OneCarteGrise.results.resultat[0].datemiseenservice
        );
        this.vehiculeFormCarteGrise.controls["dateedition"].setValue(
          this.OneCarteGrise.results.resultat[0].dateedition
        );
        this.vehiculeFormCarteGrise.controls["codeproprietaire"].setValue(
          this.OneCarteGrise.results.resultat[0].codeproprietaire
        );
        this.vehiculeFormCarteGrise.controls["genre"].setValue(
          this.OneCarteGrise.results.resultat[0].genre
        );
        this.vehiculeFormCarteGrise.controls["couleur"].setValue(
          this.OneCarteGrise.results.resultat[0].couleur
        );
        this.vehiculeFormCarteGrise.controls["energie_ID"].setValue(
          this.OneCarteGrise.results.resultat[0].energie_ID
        );
        this.vehiculeFormCarteGrise.controls["usage_ID"].setValue(
          this.OneCarteGrise.results.resultat[0].usage_ID
        );
        this.vehiculeFormCarteGrise.controls["carrosserie"].setValue(
          this.OneCarteGrise.results.resultat[0].carrosserie
        );
        this.vehiculeFormCarteGrise.controls["nbreplace"].setValue(
          this.OneCarteGrise.results.resultat[0].nbreplace
        );
        this.vehiculeFormCarteGrise.controls["typetechnique"].setValue(
          this.OneCarteGrise.results.resultat[0].typetechnique
        );
        this.vehiculeFormCarteGrise.controls["ptac"].setValue(
          this.OneCarteGrise.results.resultat[0].ptac
        );
        this.vehiculeFormCarteGrise.controls["puissance"].setValue(
          this.OneCarteGrise.results.resultat[0].puissance
        );
        this.vehiculeFormCarteGrise.controls["poidsvide"].setValue(
          this.OneCarteGrise.results.resultat[0].poidsvide
        );
        this.vehiculeFormCarteGrise.controls["nbreessieux"].setValue(
          this.OneCarteGrise.results.resultat[0].nbreessieux
        );
        this.vehiculeFormCarteGrise.controls["cylindre"].setValue(
          this.OneCarteGrise.results.resultat[0].cylindre
        );
        this.vehiculeFormCarteGrise.controls["chargeutile"].setValue(
          this.OneCarteGrise.results.resultat[0].chargeutile
        );
        this.IDcarteGrise = this.OneCarteGrise.results.resultat[0].ID;
        this.imagePreviewCarteGrise =
          this.configService.urlgRTI +
          this.OneCarteGrise.results.resultat[0].lienPhoto;
        this.isLoadingResults = false;
        // this.TabCarteGrise= true;
      });
  }

  onSubmitFormCarteGrise(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append("numero", f.numero);
    FormDataVeh.append("datemiseenservice", f.datemiseenservice);
    FormDataVeh.append("dateedition", f.dateedition);
    FormDataVeh.append("codeproprietaire", f.codeproprietaire);
    FormDataVeh.append("couleur", f.couleur);
    FormDataVeh.append("modele", this.modele);
    FormDataVeh.append("carrosserie", f.carrosserie);
    FormDataVeh.append("nbreplace", f.nbreplace);
    FormDataVeh.append("ptac", f.ptac);
    FormDataVeh.append("genre", f.genre);
    FormDataVeh.append("puissance", f.puissance);
    FormDataVeh.append("poidsvide", f.poidsvide);
    FormDataVeh.append("nbreessieux", f.nbreessieux);
    FormDataVeh.append("cylindre", f.cylindre);
    FormDataVeh.append("chargeutile", f.chargeutile);
    FormDataVeh.append("usage_ID", f.usage_ID);
    FormDataVeh.append("energie_ID", f.energie_ID);
    FormDataVeh.append("numchassis", f.numchassis);
    FormDataVeh.append("typetechnique", f.typetechnique);
    FormDataVeh.append("lienPhoto", this.selecetdFile);
    FormDataVeh.append("autentification_ID", varID);
    FormDataVeh.append("vehicule_ID", this.id);
    FormDataVeh.append("date_creation", f.date_creation);
    FormDataVeh.append("date_modification", f.date_modification);
    FormDataVeh.append("ID", this.IDcarteGrise);

    //Update;
    if (this.VerifCarteGrise != "0") {
      this.vehiculeService.updateCartegrise(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.loadOneVehiculeHeaderInfo();
            //this.initForm();
            //  this.getNavigation('admin/admin/vehiculeList','');
          } else {
            this.toastr.error(result.message);
            this.isLoadingResults = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    } //Nouveau;
    else {
      this.vehiculeService.saveCartegrise(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.imagePreviewCarteGrise = "";
            //this.initForm();
            this.loadOneVehiculeHeaderInfo();
            //  this.getNavigation('admin/admin/vehiculeList','');
          } else {
            this.toastr.error(result.message);
            this.isLoadingResults = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    }
  }

  onFileUploadCarteGrise(event) {
    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewCarteGrise = reader.result;
    };
    reader.readAsDataURL(this.selecetdFile);
  }

  ////////////////VISITE TECHNIQUE//////////////////////

  initFormVisiteTech() {
    //this.isLoadingResults = false;
    this.vehiculeFormVisiteTech = this.formBuilder.group({
      montantvisite: ["", Validators.required],
      cat: ["", Validators.required],
      kms: ["", Validators.required],
      stat: ["", Validators.required],
      datevisite: ["", Validators.required],
      dateexpiration: ["", Validators.required],
      rappel: ["30", Validators.required],
      observation: [""],
      montantvignette: ["", Validators.required],
      numerovignette: ["", Validators.required],
      ncc: [""],
      lieu: [""],
      lienPhotoVisiteTech: [""],
      VehiculeVignetteID: [""],
    });
  }

  TlisteVisteVehicule() {
    this.vehiculeService
      .getOneVisitebyVehiculeId(this.id)
      .subscribe((reponse) => {
        this.Vehicules = reponse;
        this.listeVehicules = this.Vehicules.results.resultat;
        this.dataSourceVisiteTech.data = this.listeVehicules;
        this.isLoadingResults = false;
        this.TabVisiteTech = true;
      });
  }

  onSubmitFormVisiteTech(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append("montantvisite", f.montantvisite);
    FormDataVeh.append("cat", f.cat);
    FormDataVeh.append("kms", f.kms);
    FormDataVeh.append("stat", f.stat);
    FormDataVeh.append("datevisite", f.datevisite);
    FormDataVeh.append("dateexpiration", f.dateexpiration);
    FormDataVeh.append("rappel", f.rappel);
    FormDataVeh.append("observation", f.observation);
    FormDataVeh.append("montantvignette", f.montantvignette);
    FormDataVeh.append("numerovignette", f.numerovignette);
    FormDataVeh.append("ncc", f.ncc);
    FormDataVeh.append("lieu", f.lieu);
    FormDataVeh.append("lienPhoto", this.selecetdFile);
    FormDataVeh.append("authentification_ID", varID);
    FormDataVeh.append("vehicule_ID", this.id);
    FormDataVeh.append("ID", f.VehiculeVignetteID);
    if (f.VehiculeVignetteID != "") {
      //Nouveau;
      this.vehiculeService.updateVisiteTechnique(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.addOrUpdate = true;
            this.imagePreview = "";
            //this.initForm();
            this.TlisteVisteVehicule();
            //  this.getNavigation('admin/admin/vehiculeList','');
          } else {
            this.toastr.error(result.message);
            this.isLoadingResults = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    } else {
      this.vehiculeService.saveVisiteTechVignette(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.imagePreview = "";
            this.initFormVisiteTech();
            this.TlisteVisteVehicule();
            this.loadOneVehiculeHeaderInfo();
          } else {
            this.toastr.error(result.message);
            this.isLoadingResults = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    }
  }

  loadOneVisiteVignette(VignetteID) {
    this.addOrUpdate = false;
    this.OuvrirForm();
    this.vehiculeService
      .getVisiteTechniquebyId(VignetteID)
      .subscribe((reponse) => {
        this.OneVisite = reponse;
        this.vehiculeFormVisiteTech.controls["VehiculeVignetteID"].setValue(
          this.OneVisite.results.resultat[0].ID
        );
        this.imagePreviewVisiteTech =
          this.configService.urlgRTI +
          this.OneVisite.results.resultat[0].lienPhoto;
        this.vehiculeFormVisiteTech.controls["montantvisite"].setValue(
          this.OneVisite.results.resultat[0].montantvisite
        );
        this.vehiculeFormVisiteTech.controls["cat"].setValue(
          this.OneVisite.results.resultat[0].cat
        );
        this.vehiculeFormVisiteTech.controls["kms"].setValue(
          this.OneVisite.results.resultat[0].kms
        );
        this.vehiculeFormVisiteTech.controls["stat"].setValue(
          this.OneVisite.results.resultat[0].stat
        );
        this.vehiculeFormVisiteTech.controls["datevisite"].setValue(
          this.OneVisite.results.resultat[0].datevisite
        );
        this.vehiculeFormVisiteTech.controls["dateexpiration"].setValue(
          this.OneVisite.results.resultat[0].dateexpiration
        );
        this.vehiculeFormVisiteTech.controls["rappel"].setValue(
          this.OneVisite.results.resultat[0].rappel
        );
        this.vehiculeFormVisiteTech.controls["observation"].setValue(
          this.OneVisite.results.resultat[0].observation
        );
        this.vehiculeFormVisiteTech.controls["montantvignette"].setValue(
          this.OneVisite.results.resultat[0].montantvignette
        );
        this.vehiculeFormVisiteTech.controls["numerovignette"].setValue(
          this.OneVisite.results.resultat[0].numerovignette
        );
        this.vehiculeFormVisiteTech.controls["ncc"].setValue(
          this.OneVisite.results.resultat[0].ncc
        );
        this.vehiculeFormVisiteTech.controls["lieu"].setValue(
          this.OneVisite.results.resultat[0].lieu
        );
        this.ModifsVisiteLoadingResults = false;
      });
  }

  actionClose(f) {
    if (f != 1) {
      this.FermerForm();
    } else {
      this.OuvrirForm();
    }
  }

  OuvrirForm() {
    this.hiddenCarteGrise = false;
    this.ActionClose = false;
    this.ActionOpen = true;
  }

  FermerForm() {
    this.hiddenCarteGrise = true;
    this.ActionClose = true;
    this.ActionOpen = false;
    this.initFormVisiteTech();
    this.addOrUpdate = true;
    this.imagePreviewVisiteTech = "";
    this.hiddenListeEntretien = false;
  }

  loadGaragiste() {
    this.vehiculeService.listGaragiste().subscribe((reponse) => {
      this.listeGaragiste = reponse;
      //this.isLoadingResults = false;
    });
  }

  ///////////////////////

  actionClosePanne(f) {
    if (f != 1) {
      this.FermerFormPanne();
    } else {
      this.OuvrirFormPanne();
    }
  }

  OuvrirFormPanne() {
    this.hiddenPanne = false;
    this.ActionClosePanne = false;
    this.ActionOpenPanne = true;
  }

  FermerFormPanne() {
    this.hiddenPanne = true;
    this.ActionClosePanne = true;
    this.ActionOpenPanne = false;
    //this.initFormVisiteTech();
    //this.addOrUpdate= true;
    this.imagePreviewVisiteTech = "";
    this.hiddenListeEntretien = false;
  }
  ////////////////////////
  actionCloseSinistre(f) {
    if (f != 1) {
      this.FermerFormSinistre();
    } else {
      this.OuvrirFormSinistre();
    }
    this.initFormSinistre();
  }

  OuvrirFormSinistre() {
    this.initFormSinistre();
    this.hiddenSinistre = false;
    this.ActionCloseSinistre = false;
    this.ActionOpenSinistre = true;
  }

  FermerFormSinistre() {
    this.hiddenSinistre = true;
    this.ActionCloseSinistre = true;
    this.ActionOpenSinistre = false;
    //this.initFormVisiteTech();
    //this.addOrUpdate= true;
    this.imagePreviewVisiteTech = "";
    this.hiddenListeEntretien = false;
  }
  /////////////////////

  actionCloseReparation(f) {
    if (f != 1) {
      this.FermerFormReparation();
      this.ResetFormReparationAndDetail();
    } else {
      this.OuvrirFormReparation();
    }
  }

  OuvrirFormReparation() {
    this.hiddenReparation = false;
    this.ActionCloseReparation = false;
    this.ActionOpenReparation = true;
  }

  FermerFormReparation() {
    this.hiddenReparation = true;
    this.ActionCloseReparation = true;
    this.ActionOpenReparation = false;
    //this.initFormVisiteTech();
    //this.addOrUpdate= true;
    this.imagePreviewVisiteTech = "";
    this.hiddenListeEntretien = false;
  }

  ///////////////
  actionCloseCarburant(f) {
    if (f != 1) {
      this.FermerFormCarburant();
    } else {
      this.OuvrirFormCarburant();
    }
  }

  OuvrirFormCarburant() {
    this.hiddenCarburant = false;
    this.ActionCloseCarburant = false;
    this.ActionOpenCarburant = true;
  }

  FermerFormCarburant() {
    this.hiddenCarburant = true;
    this.ActionCloseCarburant = true;
    this.ActionOpenCarburant = false;
    //this.initFormVisiteTech();
    //this.addOrUpdate= true;
    /*this.imagePreviewVisiteTech='';
this.hiddenListeEntretien= false;*/
  }

  ///////////////
  actionCloseInfraction(f) {
    if (f != 1) {
      this.FermerFormInfraction();
    } else {
      this.OuvrirFormInfraction();
    }
  }

  OuvrirFormInfraction() {
    this.hiddenInfraction = false;
    this.ActionCloseInfraction = false;
    this.ActionOpenInfraction = true;
  }

  FermerFormInfraction() {
    this.hiddenInfraction = true;
    this.ActionCloseInfraction = true;
    this.ActionOpenInfraction = false;
    this.initFormInfraction();
    //this.initFormVisiteTech();
    //this.addOrUpdate= true;
    /*this.imagePreviewVisiteTech='';
this.hiddenListeEntretien= false;*/
  }

  ///////////////
  actionCloseKilometrage(f) {
    if (f != 1) {
      this.FermerFormKilometrage();
    } else {
      this.OuvrirFormKilometrage();
    }
  }

  OuvrirFormKilometrage() {
    this.hiddenKilometrage = false;
    this.ActionCloseKilometrage = false;
    this.ActionOpenKilometrage = true;
  }

  FermerFormKilometrage() {
    this.hiddenKilometrage = true;
    this.ActionCloseKilometrage = true;
    this.ActionOpenKilometrage = false;
    this.initFormKilometrage();
    //this.initFormVisiteTech();
    //this.addOrUpdate= true;
    /*this.imagePreviewVisiteTech='';
this.hiddenListeEntretien= false;*/
  }

  ///////////////ASSURENCE////////////////////
  initFormAssurance() {
    //this.isLoadingResults = false;
    this.vehiculeFormAssurance = this.formBuilder.group({
      assure_ID: [""],
      assure: ["", Validators.required],
      adresse: ["", Validators.required],
      profession: [""],
      assureur_ID: ["", Validators.required],
      numpolice: ["", Validators.required],
      datedebut: ["", Validators.required],
      datefin: ["", Validators.required],
      rappel: ["30", Validators.required],
      lienPhoto: [""],
    });
  }

  loadAssureur() {
    this.assureurService.listeAssureur().subscribe((reponse) => {
      this.listeassureur = reponse;
    });
  }

  TlisteAssuranceVehicule() {
    this.vehiculeService
      .getOneAssurancebyVehiculeId(this.id)
      .subscribe((reponse) => {
        this.VehiculesAssurance = reponse;
        this.listeVehiculesAssurance = this.VehiculesAssurance.results.resultat;
        this.dataSourceAssur.data = this.listeVehiculesAssurance;
        this.isLoadingResults = false;
        this.TabMAssurance = true;
      });
  }

  loadOneAssurance(AssurID) {
    this.addOrUpdate = false;
    this.OuvrirFormAssur();
    this.ModifsLoadingResults = true;
    this.vehiculeService.getAssurancebyId(AssurID).subscribe((reponse) => {
      this.OneAssurance = reponse;
      this.vehiculeFormAssurance.controls["assure_ID"].setValue(
        this.OneAssurance.results.resultat[0].ID
      );
      this.imagePreviewAssurance =
        this.configService.urlgRTI +
        this.OneAssurance.results.resultat[0].lienPhoto;
      this.vehiculeFormAssurance.controls["assure"].setValue(
        this.OneAssurance.results.resultat[0].assure
      );
      this.vehiculeFormAssurance.controls["adresse"].setValue(
        this.OneAssurance.results.resultat[0].adresse
      );
      this.vehiculeFormAssurance.controls["profession"].setValue(
        this.OneAssurance.results.resultat[0].profession
      );
      this.vehiculeFormAssurance.controls["numpolice"].setValue(
        this.OneAssurance.results.resultat[0].numpolice
      );
      this.vehiculeFormAssurance.controls["datedebut"].setValue(
        this.OneAssurance.results.resultat[0].datedebut
      );
      this.vehiculeFormAssurance.controls["datefin"].setValue(
        this.OneAssurance.results.resultat[0].datefin
      );
      this.vehiculeFormAssurance.controls["rappel"].setValue(
        this.OneAssurance.results.resultat[0].rappel
      );
      this.vehiculeFormAssurance.controls["assureur_ID"].setValue(
        this.OneAssurance.results.resultat[0].assureur_ID
      );
      this.ModifsLoadingResults = false;
    });
  }

  onSubmitFormAssurance(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append("ID", f.assure_ID);
    FormDataVeh.append("assure", f.assure);
    FormDataVeh.append("adresse", f.adresse);
    FormDataVeh.append("profession", f.profession);
    FormDataVeh.append("assureur_ID", f.assureur_ID);
    FormDataVeh.append("numpolice", f.numpolice);
    FormDataVeh.append("datedebut", f.datedebut);
    FormDataVeh.append("datefin", f.datefin);
    FormDataVeh.append("rappel", f.rappel);
    FormDataVeh.append("profession", f.profession);
    FormDataVeh.append("lienPhoto", this.selecetdFile);
    FormDataVeh.append("authentification_ID", varID);
    FormDataVeh.append("vehicule_ID", this.id);
    if (f.assure_ID != "") {
      //Nouveau;
      this.vehiculeService.updateAssurance(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.addOrUpdateAssur = true;
            this.imagePreviewAssurance = "";
            this.initFormAssurance();
            this.TlisteAssuranceVehicule();
            this.loadOneVehiculeHeaderInfo();
            //  this.getNavigation('admin/admin/vehiculeList','');
          } else {
            this.toastr.error(result.message);
            this.isLoadingResults = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    } else {
      this.vehiculeService.saveAssuranceVehicule(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.imagePreviewAssurance = "";
            this.initFormAssurance();
            this.TlisteAssuranceVehicule();
            this.loadOneVehiculeHeaderInfo();
            //  this.getNavigation('admin/admin/vehiculeList','');
          } else {
            this.toastr.error(result.message);
            this.isLoadingResults = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    }
  }

  onFileUploadAssurnace(event) {
    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewAssurance = reader.result;
    };
    reader.readAsDataURL(this.selecetdFile);
  }

  actionCloseAssur(f) {
    if (f != 1) {
      this.FermerFormAssur();
    } else {
      this.OuvrirFormAssur();
    }
  }

  OuvrirFormAssur() {
    this.hidden = false;
    this.ActionCloseAssur = false;
    this.ActionOpenAssur = true;
  }

  FermerFormAssur() {
    this.hidden = true;
    this.ActionCloseAssur = true;
    this.ActionOpenAssur = false;
    this.initFormAssurance();
    this.addOrUpdateAssur = true;
    this.imagePreviewAssurance = "";
  }

  //////////SUPPRIMER/////////////
  ItemSupprime(id, name) {
    this.IDSuppression = id;
    this.NameSuppression = name;
  }

  ItemSupprimeDetailReparation(id, name, reparationID) {
    this.IDSuppression = id;
    this.NameSuppression = name;
    this.DetailreparationID = reparationID;
  }

  ItemSupprimeReparation(id, name, IDreparationpanneOrSinistreID) {
    this.IDSuppression = id;
    this.NameSuppression = name;
    this.reparationpanneOrSinistreID = IDreparationpanneOrSinistreID;
  }

  ItemSupprimeEntretienProgramm(id, name) {
    this.IDSuppression = id;
    this.NameSuppression = name;
  }

  ItemSupprimeEntretien(id, name) {
    this.IDSuppression = id;
    this.NameSuppression = name;
  }

  supprime() {
    if (this.NameSuppression == "panne") {
      this.supprimePanne();
      return;
    } else if (this.NameSuppression == "sinistre") {
      this.supprimeSinistre();
      return;
    } else if (this.NameSuppression == "reparation") {
      this.supprimeReparation();
      return;
    } else if (this.NameSuppression == "reparationDetail") {
      this.supprimeReparationDetail();
      return;
    } else if (this.NameSuppression == "kilometrage") {
      this.supprimekilometrage();
      return;
    } else if (this.NameSuppression == "entretienDetail") {
      this.supprimeEntretienDetail();
      return;
    } else if (this.NameSuppression == "entretienprogramm") {
      this.supprimeEntretienProgramm();
      return;
    } else if (this.NameSuppression == "infraction") {
      this.supprimeInfraction();
      return;
    } else if (this.NameSuppression == "entretien") {
      this.supprimeEntretien();
      return;
    } else {
    }
  }

  supprimeMedia() {
    this.vehiculeService.deleteMedia(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteAddDocument(this.id);
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }

  supprimeVisiteTech() {
    this.vehiculeService.deleteVisiteTechnique(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteVisteVehicule();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }

  supprimeAssurance() {
    this.vehiculeService.deleteAssurance(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteAssuranceVehicule();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }

  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  ItemsSupprime(id) {
    this.IDSuppression = id;
  }

  supprimePanne() {
    this.vehiculeService.deletePanne(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlistePanne();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }

  supprimeSinistre() {
    this.vehiculeService.deleteSinistre(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteSinistre();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }
}
