import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { DirectionService } from 'src/app/services/trombino/direction.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { PersonnelService } from 'src/app/services/trombino/personnel.service';
import { AssureurService } from 'src/app/services/assureur.service';
import { environment } from '../../../../../../environments/environment';
import { WorkflowService } from 'src/app/services/workflow.service';
import { WorkflowappService } from 'src/app/services/workflowAppli/workflowapp.service';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-modification-vehicule',
  templateUrl: './modification-vehicule.component.html',
  styleUrls: ['./modification-vehicule.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 1 }),
        animate(1000)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(1000, style({ opacity: 1 })))
    ])
  ]
})

export class ModificationVehiculeComponent implements OnInit {

  public Todate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  ProfilID = JSON.parse(localStorage.getItem('currentUser'));
  UserProfilID: any; 
  MyUserProfilID: any; 
  ////////////////////////////////////////
  selecetdFile : File;
  imagePreview: any;
  imagePreviewModif: any;
  imagePreviewVisiteTech: any;
    /////////////////////////////////////
    vehiculeForm: FormGroup;
    vehiculeFormCarteGrise: FormGroup;
    vehiculeFormVisiteTech: FormGroup;
    vehiculeFormAssurance: FormGroup;
    vehiculeFormValidation: FormGroup;
    
    isLoadingResults = true;
    OneVehicule: any = [];
    id: string;
    afficheReinit = false;
    reponse: any;
    IDDir: string;
    libDir: string;
    IDSuppression = '';
    imatriculation: any;
    modele: any;
    marque: any;
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
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
displayedColumns: string[] = ['number','lienPhoto','description', 'action'];
dataSource: MatTableDataSource<any>;

listeVehicules: any = [];
Vehicules: any = [];
@ViewChild(MatPaginator) paginatorVisiteTech: MatPaginator;
@ViewChild(MatSort) sortVisiteTech: MatSort;
displayedColumnsVisiteTech: string[] = ['number','datevisite','lieu', 'montantvisite','numerovignette','montantvignette','dateexpiration','rappel', 'action'];
dataSourceVisiteTech: MatTableDataSource<any>;

displayedColumnsCarteGrise: string[] = ['number','datevisite','lieu', 'montantvisite','numerovignette','montantvignette','dateexpiration','rappel', 'action'];
dataSourceCarteGrise: MatTableDataSource<any>;

displayedColumnsAssur: string[] = ['number','assure','assueur','numpolice', 'datedebut', 'datefin','rappel', 'action'];
dataSourceAssur: MatTableDataSource<any>;
@ViewChild(MatPaginator) paginatorAssur: MatPaginator;
@ViewChild(MatSort) sortAssur: MatSort;
VehiculesAssurance: any = [];
listeVehiculesAssurance: any = [];

ResponseVerifCircuit: any = [];
ResponseValidateurListe: any = [];
ListWorkflowValidateur = '';

selecetdFileDoc: any;
MediaFIlePreview: any;
reader: any;
listemodelebymarques: any = [];
listeFonction:any = [];
listemarques: any = [];
OneCarteGrise: any = [];
documentForm: FormGroup;
hidden = false;
hiddenPersone= false;
AficherImgx= true;
isLoadingResultsModif: boolean;
VerifCarteGrise: any;
IDcarteGrise: any;
imagePreviewCarteGrise: any;
ActionClose= true;
ActionOpen= false; 
addOrUpdate= true;
ActionCloseAssur= true;
ActionOpenAssur= false; 
addOrUpdateAssur= true;

hiddenCarteGrise= true;
  NameSuppression: any;
  fonctionVehicule: any;
  ActionCloseCarteGrise=true;
  ActionOpenCarteGrise=false;
  hiddenVisiteTech=true;
  hiddenAssurance=true;
  ActionOpenVisiteTech= false;
  ActionCloseVisiteTech=true;

OneVisite: any = [];
ModifsVisiteLoadingResults= false;
ModifsLoadingResults= false;
TabModifier= false;
TabCarteGrise= false;
TabVisiteTech= false;
TabMAssurance= false;
listeassureur: any = [];
OneAssurance: any = [];
imagePreviewAssurance: any;
  imatriculationSendEmail: any;
  valideVehicule: any;
  wcodeetape: any;


    constructor(
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private location: Location,
      private vehiculeService: VehiculeService,
      private directionService: DirectionService,
      private workflowappService: WorkflowappService,
      private configService: ConfigService,
      private workflowService: WorkflowService,
      private httpClient: HttpClient,
      private router: Router,
      private datePipe: DatePipe,
      private assureurService: AssureurService,
      private personnelService: PersonnelService,) {
        this.dataSource = new MatTableDataSource(this.Document);
        this.dataSourceVisiteTech = new MatTableDataSource(this.Vehicules);
        this.dataSourceCarteGrise= new MatTableDataSource(this.Vehicules);
        this.dataSourceAssur = new MatTableDataSource(this.VehiculesAssurance);
        this.id = this.route.snapshot.paramMap.get('id');
        this.activeMenu();
        this.initForm();
        this.initFormDocument();
        this.initFormCarteGrise();
        this.initFormVisiteTech();
        this.initFormAssurance();
        this.initFormvalideVehicule();
    }
  
    
  activeMenu(){
    this.configService.OngletConsultation = false;
    this.configService.OngletModification = true;
    this.configService.OngletTraitement = false;
  }
    //////////////
    onFileUpload(event){
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
      this.loadMarques();
      this.loadFonction();
      this.loadDirections();
      this.TlisteAddDocument(this.id);
      this.loadOneCarteGrise(this.id);
      this.loadEnergies();
      this.loadUsages();
      this.TlisteVisteVehicule();
      this.loadAssureur();
      this.TlisteAssuranceVehicule();
      
    }

    ngAfterViewInit() {
      this.dataSource.paginator= this.paginatorVisiteTech;
      this.dataSource.sort = this.sortVisiteTech;

      this.dataSourceVisiteTech.paginator = this.paginatorVisiteTech;
      this.dataSourceVisiteTech.sort = this.sortVisiteTech;

      this.dataSourceAssur.paginator = this.paginatorAssur;
      this.dataSourceAssur.sort = this.sortAssur;
    }
/////////////TOP MENU//////////////////////////
MenuTraitementVehicule(){ 
this.configService.ListMenuVehicule=true;
environment.SelectIDvehicule=this.id;
environment.SelectUserProfil = this.UserProfilID;
this.MyUserProfilID = environment.SelectUserProfil;
}

loadOneVehiculeHeaderInfo() {
this.isLoadingResults = true;
if (this.id !== '0') {
this.isLoadingResults = true; 
this.vehiculeService.getInfoVehiculebyID(this.id).subscribe(reponse => {
this.OneVehicule = reponse;
///resultatVehicule   
this.imatriculation = this.OneVehicule.results.resultatVehicule[0].imatriculation;
environment.imatriculationSendEmail = this.OneVehicule.results.resultatVehicule[0].imatriculation;
this.modele= this.OneVehicule.results.resultatVehicule[0].modele;
environment.modeleSendEmail= this.OneVehicule.results.resultatVehicule[0].modele;
this.marque= this.OneVehicule.results.resultatVehicule[0].marque; 
environment.marqueSendEmail= this.OneVehicule.results.resultatVehicule[0].marque; 

this.imagePreview = this.configService.urlgRTI+this.OneVehicule.results.resultatVehicule[0].lienPhoto;
this.vehiculeFormCarteGrise.controls['modele'].setValue(this.modele);
this.marque= this.OneVehicule.results.resultatVehicule[0].marque; 
///resultatCarteGrise
this.numeroCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].numero;
this.datemiseenserviceCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].datemiseenservice;
this.dateeditionCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].dateedition;
this.codeproprietaireCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].codeproprietaire;
this.couleurCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].couleur;
this.carrosserieCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].carrosserie;
this.nbreplaceCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].nbreplace;
this.ptacCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].ptac;
this.genreCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].genre;
this.puissanceCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].puissance;
this.poidsvideCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].poidsvide;
this.nbreessieuxCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].nbreessieux;
this.cylindreCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].cylindre;
this.chargeutileCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].chargeutile;
this.numchassisCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].numchassis;
this.typetechniqueCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].typetechnique;
this.energieCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].Libenergie;
this.usageCarteGrise= this.OneVehicule.results.resultatCarteGrise[0].Libusage;
///resultatVignette 
this.Vignettemontantvisite= this.OneVehicule.results.resultatVignette[0].montantvisite;
this.Vignettemontantvisite= this.OneVehicule.results.resultatVignette[0].montantvignette;
this.Vignettencc= this.OneVehicule.results.resultatVignette[0].ncc;
this.Vignettenumerovignette= this.OneVehicule.results.resultatVignette[0].numerovignette;
this.Vignetteobservation= this.OneVehicule.results.resultatVignette[0].observation;
this.Vignetterappel= this.OneVehicule.results.resultatVignette[0].rappel;
this.Vignettestat= this.OneVehicule.results.resultatVignette[0].stat;
this.Vignettelieu= this.OneVehicule.results.resultatVignette[0].lieu;
this.Vignettekms= this.OneVehicule.results.resultatVignette[0].kms;
this.VignettelienPhoto= this.OneVehicule.results.resultatVignette[0].lienPhoto;
this.Vignettedatevisite= this.OneVehicule.results.resultatVignette[0].datevisite;
this.Vignettedateexpiration= this.OneVehicule.results.resultatVignette[0].dateexpiration;
this.Vignettecat= this.OneVehicule.results.resultatVignette[0].cat;

///resultatAssurance  
this.Assuranceadresse= this.OneVehicule.results.resultatAssurance[0].adresse;
this.Assuranceassueur= this.OneVehicule.results.resultatAssurance[0].assueur;
this.Assuranceassure= this.OneVehicule.results.resultatAssurance[0].assure;
this.Assurancecontact= this.OneVehicule.results.resultatAssurance[0].contact;
this.Assurancedatedebut= this.OneVehicule.results.resultatAssurance[0].datedebut;
this.Assurancedatefin= this.OneVehicule.results.resultatAssurance[0].datefin; 
this.AssurancelienPhoto= this.OneVehicule.results.resultatAssurance[0].lienPhoto;
this.Assurancenumpolice= this.OneVehicule.results.resultatAssurance[0].numpolice;
this.Assuranceprofession= this.OneVehicule.results.resultatAssurance[0].profession;
this.Assurancerappel= this.OneVehicule.results.resultatAssurance[0].rappel;
this.TlisteDocument(this.id);
this.isLoadingResults = false; 
// console.log(reponse);
});
}
}

/////////////LOAD MODIFICATION VEHICULE///////////////////////
TlisteDocument(IdVehicule) {
this.vehiculeService.getMediabyIdVehicule(IdVehicule).subscribe(reponse => {
this.Document = reponse;
this.listeDocument = this.Document.results.resultat;
this.urlPhoto=this.configService.urlgRTI;
});
}

loadMarques() {
this.vehiculeService.listeMarque().subscribe(reponse => {
this.listemarques = reponse;
});
}

loadModelByMarques(Maqid) {
this.vehiculeService.getMarqueModelebyMarqueId(Maqid).subscribe(reponse => {
this.listemodelebymarques = reponse;
});
} 

loadFonction() {
this.vehiculeService.listFoction().subscribe(reponse => {
this.listeFonction = reponse;
});
}     
public changeMarque(event) {
this.loadModelByMarques(event);
}

initForm() {
this.vehiculeForm = this.formBuilder.group({
imatriculation: [''],//{ value: '', disabled: true }
marque_ID: [''],//{ value: '', disabled: true }
modele_ID: [''], //{ value: '', disabled: true }
typeacquisition: [''],//{ value: '', disabled: true }
fonction_ID:[''],
lienPhoto: [''],
Dir_libelle: [''],
Dir_NomPrenAgent: [''],
Ent_PieceJointe: [''],
Dir_id: [''],
Agent_id: [''],
comment: [''],
dotationCarburant: [''],
transmission: [''],
Kmachat: [],//{ value: '', disabled: true }
capReservoir: [''],
L100km: [''],
});
}

initFormDocument() {
//this.isLoadingResults = false;
this.documentForm = this.formBuilder.group({
Description: [''],
MediaFIle: [''],
});
}


loadOneVehiculeInfoModifier() {
this.isLoadingResultsModif = true;
if (this.id !== '0') {
this.isLoadingResultsModif = true;
this.vehiculeService.getOneVehicule(this.id).subscribe(reponse => {
this.OneVehicule = reponse;   
/* this.imatriculation = this.OneVehicule.results[0].imatriculation;
this.modele= this.OneVehicule.results[0].modele
this.marque= this.OneVehicule.results[0].marque; */
this.imagePreviewModif = this.configService.urlgRTI+this.OneVehicule.results[0].lienPhoto;
this.vehiculeForm.controls['imatriculation'].setValue(this.OneVehicule.results[0].imatriculation);
this.loadModelByMarques(this.OneVehicule.results[0].marque_ID);
this.vehiculeForm.controls['marque_ID'].setValue(this.OneVehicule.results[0].marque_ID);
this.vehiculeForm.controls['modele_ID'].setValue(this.OneVehicule.results[0].modele_ID);
this.vehiculeForm.controls['typeacquisition'].setValue(this.OneVehicule.results[0].typeacquisition);
this.vehiculeForm.controls['fonction_ID'].setValue(this.OneVehicule.results[0].fonctionvehicule_ID);
this.fonctionVehicule=this.OneVehicule.results[0].fonction;
environment.fonctionVehiculeSendEmail=this.OneVehicule.results[0].fonction;
this.vehiculeForm.controls['Dir_id'].setValue(this.OneVehicule.results[0].direction_ID);
this.loadPersonnelByDirections(this.OneVehicule.results[0].direction_ID);
this.vehiculeForm.controls['Agent_id'].setValue(this.OneVehicule.results[0].personnel_ID);
this.loadPersonnelByID(this.OneVehicule.results[0].personnel_ID);
this.vehiculeForm.controls['Dir_NomPrenAgent'].setValue(this.OneVehicule.results[0].personnel_nom);

/*********INFO VALIDTION VEHICUE*************** */
this.valideVehicule=this.OneVehicule.results[0].valide;
this.wcodeetape=this.OneVehicule.results[0].w_code_etape;
this.vehiculeFormValidation.controls['Valetapcode'].setValue(this.OneVehicule.results[0].w_code_etape);
this.vehiculeFormValidation.controls['ValvehiculeID'].setValue(this.id);


/*********FIN INFO VALIDTION VEHICUE*************** */
this.isLoadingResultsModif = false;
this.TabModifier = true;
// console.log(reponse);
});
}
}

onSubmitForm(f) {
this.isLoadingResultsModif = true;
const iD = JSON.parse(localStorage.getItem('currentUser'));
const varID = iD.ID;
const FormDataVeh = new FormData();
FormDataVeh.append('imatriculation', f.imatriculation);
FormDataVeh.append('marque_ID', f.marque_ID);
FormDataVeh.append('modele_ID', f.modele_ID);
FormDataVeh.append('typeacquisition', f.typeacquisition);
FormDataVeh.append('lienPhoto', this.selecetdFile);
FormDataVeh.append('direction_ID',  f.Dir_id);
FormDataVeh.append('fonctionvehicule_ID', f.fonction_ID);
FormDataVeh.append('personnel_ID', f.Agent_id);
FormDataVeh.append('authentification_ID', varID);
FormDataVeh.append('vehicule_ID', this.id);
FormDataVeh.append('personnel_nom', f.Dir_NomPrenAgent);

//Nouveau;
this.vehiculeService.updateVehicule(FormDataVeh).subscribe(result => {
if (result.success==true) { 
this.reponse = result;
this.toastr.success(result.message);
this.loadOneVehiculeHeaderInfo();

}
else{
this.toastr.error(result.message);
this.isLoadingResultsModif = false;
}



}, (ret) => {
this.toastr.error(ret.message, "Erreur Code : " + ret.code);
//this.isLoadingResults = false;
});


}

onSubmitFormDocument(f) {
this.isLoadingResults = true;
const iD = JSON.parse(localStorage.getItem('currentUser'));
const varID = iD.ID;
const FormDataDoc= new FormData();
FormDataDoc.append('description', f.Description);
FormDataDoc.append('lienPhoto', this.selecetdFileDoc);
FormDataDoc.append('authentification_ID', varID);
FormDataDoc.append('vehicule_ID', this.id);
//Nouveau;
this.vehiculeService.saveMedia(FormDataDoc).subscribe(result => {
if (result.success==true) { 
this.reponse = result;
this.toastr.success(result.message);
this.MediaFIlePreview='';
this.TlisteAddDocument(this.id);
//this.initFormDocument();
//this.getNavigation('admin/admin/vehiculeList','');

}
else{
this.toastr.error(result.message);
this.isLoadingResults = false;
} 

}, (ret) => {
this.toastr.error(ret.message, "Erreur Code : " + ret.code);
//this.isLoadingResults = false;
});


}

onFileUploadDocument(event){
this.selecetdFileDoc= event.target.files[0];
this.reader = new FileReader();
this.reader.onload = () => {
this.MediaFIlePreview = this.reader.result;
};
this.reader.readAsDataURL(this.selecetdFileDoc);
}
     
loadDirections() {
  this.directionService.readDirection().subscribe(
    dirData => {
      this.listDirection = dirData;
      /*console.log(this.listDirection);*/
    }
  );
}
 changeDirection(event) {
  const value = event.target.value;
  const selectEl = event.target;
  const libelledir = selectEl.options[selectEl.selectedIndex].getAttribute('dir-name');
  this.Dirlibelle = this.vehiculeForm.controls['Dir_libelle'].setValue(libelledir);
  this.dirID = value;
  this.loadPersonnelByDirections(value); /**/
}

loadPersonnelByDirections(id: string) {
  this.personnelService.readPersonnelByDirection(id).subscribe(
    personData => {
      this.listPersonnel = personData;
    }
  );
}

loadPersonnelByID(id: string) {
  this.personnelService.readonePersonnel(id).subscribe(
    personData => {
      this.onePersonnel = personData.Photo;
      this.PersoneImage = personData.Photo;
      this.vehiculeForm.controls['Ent_PieceJointe'].setValue(personData.Photo);
      this.hidden = true;
      this.hiddenPersone = true;
      this.AficherImgx= false;
    }
  );
}
onChangeSelectedPersonnelValue(event) {
  const selectEl = event.target;
  const imgx = selectEl.options[selectEl.selectedIndex].getAttribute('person-image');
  const imgxName = selectEl.options[selectEl.selectedIndex].getAttribute('person-name');
  this.PersoneImage = imgx;
  this.vehiculeForm.controls['Ent_PieceJointe'].setValue(imgx);
  this.vehiculeForm.controls['Dir_NomPrenAgent'].setValue(imgxName);
  this.hidden = true;
  this.hiddenPersone = true;
  this.AficherImgx= false;
   /* this.hidden = false;
     */
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

TlisteAddDocument(IdVehicule) {
  this.vehiculeService.getMediabyIdVehicule(IdVehicule).subscribe(reponse => {
    this.Document = reponse;
    this.listeDocument = this.Document.results.resultat;
    this.dataSource.data = this.listeDocument;
    this.isLoadingResults = false;
    this.urlPhoto=this.configService.urlgRTI;
  });
}

//////////////CARTE GRISE//////////////////////
loadUsages() {
  this.vehiculeService.listeUsages().subscribe(reponse => {
    this.listeusages = reponse;
  });
}

loadEnergies() {
  this.vehiculeService.listeEnergies().subscribe(reponse => {
    this.listeenergies = reponse;
  });
}
initFormCarteGrise() {
  //this.isLoadingResults = false;
  this.vehiculeFormCarteGrise = this.formBuilder.group({
    numero: ['', Validators.required],
    numchassis: ['', Validators.required],
    datemiseenservice: ['', Validators.required],
    dateedition: ['', Validators.required],
    codeproprietaire: ['', Validators.required],
    genre: ['', Validators.required],
    couleur: ['', Validators.required],
    energie_ID: ['', Validators.required],
    usage_ID: ['', Validators.required],
    modele: [{ value: '', disabled: true }],
    carrosserie: [''],
    nbreplace: ['', Validators.required],
    typetechnique: ['', Validators.required],
    ptac: [''],
    puissance: [''],
    poidsvide: [''],
    nbreessieux: [''],
    cylindre: [''],
    chargeutile: [''],
    lienPhoto: [''],
    vehicule_ID: [''],
    date_creation: [''],
    date_modification: [''],
    autentification_ID: [''],

   
  });
}
loadOneCarteGrise(VehiculeID) {
  this.isLoadingResults = true;
    this.vehiculeService.getCartegrisebyvehiculeId(VehiculeID).subscribe(reponse => {
      this.OneCarteGrise = reponse; 
      this.VerifCarteGrise= this.OneCarteGrise.results.total;
     /* if (this.VerifCarteGrise) {
        this.TabCarteGrise= true;
      }*/
     // alert(this.OneCarteGrise.results.resultat[0].numero)
      this.vehiculeFormCarteGrise.controls['numero'].setValue(this.OneCarteGrise.results.resultat[0].numero);
      this.vehiculeFormCarteGrise.controls['numchassis'].setValue(this.OneCarteGrise.results.resultat[0].numchassis);
      this.vehiculeFormCarteGrise.controls['datemiseenservice'].setValue(this.OneCarteGrise.results.resultat[0].datemiseenservice);
      this.vehiculeFormCarteGrise.controls['dateedition'].setValue(this.OneCarteGrise.results.resultat[0].dateedition);
      this.vehiculeFormCarteGrise.controls['codeproprietaire'].setValue(this.OneCarteGrise.results.resultat[0].codeproprietaire);
      this.vehiculeFormCarteGrise.controls['genre'].setValue(this.OneCarteGrise.results.resultat[0].genre);
      this.vehiculeFormCarteGrise.controls['couleur'].setValue(this.OneCarteGrise.results.resultat[0].couleur);
      this.vehiculeFormCarteGrise.controls['energie_ID'].setValue(this.OneCarteGrise.results.resultat[0].energie_ID);
      this.vehiculeFormCarteGrise.controls['usage_ID'].setValue(this.OneCarteGrise.results.resultat[0].usage_ID);
      this.vehiculeFormCarteGrise.controls['carrosserie'].setValue(this.OneCarteGrise.results.resultat[0].carrosserie);
      this.vehiculeFormCarteGrise.controls['nbreplace'].setValue(this.OneCarteGrise.results.resultat[0].nbreplace);
      this.vehiculeFormCarteGrise.controls['typetechnique'].setValue(this.OneCarteGrise.results.resultat[0].typetechnique);
      this.vehiculeFormCarteGrise.controls['ptac'].setValue(this.OneCarteGrise.results.resultat[0].ptac);
      this.vehiculeFormCarteGrise.controls['puissance'].setValue(this.OneCarteGrise.results.resultat[0].puissance);
      this.vehiculeFormCarteGrise.controls['poidsvide'].setValue(this.OneCarteGrise.results.resultat[0].poidsvide);
      this.vehiculeFormCarteGrise.controls['nbreessieux'].setValue(this.OneCarteGrise.results.resultat[0].nbreessieux);
      this.vehiculeFormCarteGrise.controls['cylindre'].setValue(this.OneCarteGrise.results.resultat[0].cylindre);
      this.vehiculeFormCarteGrise.controls['chargeutile'].setValue(this.OneCarteGrise.results.resultat[0].chargeutile);
      this.IDcarteGrise = this.OneCarteGrise.results.resultat[0].ID;
      this.imagePreviewCarteGrise = this.configService.urlgRTI+this.OneCarteGrise.results.resultat[0].lienPhoto;
      this.isLoadingResults = false;
     // this.TabCarteGrise= true;
    
    });

} 

onSubmitFormCarteGrise(f) {
  this.isLoadingResults = true;
  const iD = JSON.parse(localStorage.getItem('currentUser'));
  const varID = iD.ID;
  const FormDataVeh = new FormData();
  FormDataVeh.append('numero', f.numero);
  FormDataVeh.append('datemiseenservice', f.datemiseenservice);
  FormDataVeh.append('dateedition', f.dateedition);
  FormDataVeh.append('codeproprietaire', f.codeproprietaire);
  FormDataVeh.append('couleur', f.couleur);
  FormDataVeh.append('modele', this.modele);
  FormDataVeh.append('carrosserie', f.carrosserie);
  FormDataVeh.append('nbreplace', f.nbreplace);
  FormDataVeh.append('ptac', f.ptac);
  FormDataVeh.append('genre', f.genre);
  FormDataVeh.append('puissance', f.puissance);
  FormDataVeh.append('poidsvide', f.poidsvide);
  FormDataVeh.append('nbreessieux', f.nbreessieux);
  FormDataVeh.append('cylindre', f.cylindre);
  FormDataVeh.append('chargeutile', f.chargeutile);
  FormDataVeh.append('usage_ID', f.usage_ID);
  FormDataVeh.append('energie_ID', f.energie_ID);
  FormDataVeh.append('numchassis', f.numchassis);
  FormDataVeh.append('typetechnique', f.typetechnique);
  FormDataVeh.append('lienPhoto', this.selecetdFile);
  FormDataVeh.append('autentification_ID', varID);
  FormDataVeh.append('vehicule_ID', this.id);
  FormDataVeh.append('date_creation', f.date_creation);
  FormDataVeh.append('date_modification', f.date_modification);
  FormDataVeh.append('ID', this.IDcarteGrise);

    //Update;
    if (this.VerifCarteGrise != '0') {
    this.vehiculeService.updateCartegrise(FormDataVeh).subscribe(result => {
      if (result.success==true) { 
        this.reponse = result;
      this.toastr.success(result.message);
      this.loadOneVehiculeHeaderInfo();
      //this.initForm();
    //  this.getNavigation('admin/admin/vehiculeList','');
     
      }
      else{
        this.toastr.error(result.message);
        this.isLoadingResults = false;
      }

      
      
    }, (ret) => {
      this.toastr.error(ret.message, "Erreur Code : " + ret.code);
      //this.isLoadingResults = false;
    });
  } //Nouveau;
  else{
    this.vehiculeService.saveCartegrise(FormDataVeh).subscribe(result => {
      if (result.success==true) { 
        this.reponse = result;
      this.toastr.success(result.message);
      this.imagePreviewCarteGrise='';
      this.initForm();
      this.loadOneVehiculeHeaderInfo();
    //  this.getNavigation('admin/admin/vehiculeList','');
     
      }
      else{
        this.toastr.error(result.message);
        this.isLoadingResults = false;
      }

      
      
    }, (ret) => {
      this.toastr.error(ret.message, "Erreur Code : " + ret.code);
      //this.isLoadingResults = false;
    });
  }

}

onFileUploadCarteGrise(event){
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
      montantvisite: ['', Validators.required],
      cat: ['', Validators.required],
      kms: ['', Validators.required],
      stat: ['', Validators.required],
      datevisite: ['', Validators.required],
      dateexpiration: ['', Validators.required],
      rappel: ['30', Validators.required],
      observation: [''],
      montantvignette: ['', Validators.required],
      numerovignette: ['', Validators.required],
      ncc: [''],
      lieu: [''],
      lienPhotoVisiteTech: [''],
      VehiculeVignetteID: [''],
     
    });
  }

  TlisteVisteVehicule() {
    this.vehiculeService.getOneVisitebyVehiculeId(this.id).subscribe(reponse => {
      this.Vehicules = reponse;
      this.listeVehicules = this.Vehicules.results.resultat;
      this.dataSourceVisiteTech.data = this.listeVehicules;
      this.isLoadingResults = false;
      this.TabVisiteTech = true;
    });
  }



  

  onSubmitFormVisiteTech(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem('currentUser'));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append('montantvisite', f.montantvisite);
    FormDataVeh.append('cat', f.cat);
    FormDataVeh.append('kms', f.kms);
    FormDataVeh.append('stat', f.stat);
    FormDataVeh.append('datevisite', f.datevisite);
    FormDataVeh.append('dateexpiration', f.dateexpiration);
    FormDataVeh.append('rappel', f.rappel);
    FormDataVeh.append('observation', f.observation);
    FormDataVeh.append('montantvignette', f.montantvignette);
    FormDataVeh.append('numerovignette', f.numerovignette);
    FormDataVeh.append('ncc', f.ncc);
    FormDataVeh.append('lieu', f.lieu);
    FormDataVeh.append('lienPhoto', this.selecetdFile);
    FormDataVeh.append('authentification_ID', varID);
    FormDataVeh.append('vehicule_ID', this.id);
    FormDataVeh.append('ID', f.VehiculeVignetteID);
    if (f.VehiculeVignetteID != '') {
      //Nouveau;
      this.vehiculeService.updateVisiteTechnique(FormDataVeh).subscribe(result => {
        if (result.success==true) { 
          this.reponse = result;
        this.toastr.success(result.message);
        this.addOrUpdate= true;
        this.imagePreview='';
        this.initForm();
        this.TlisteVisteVehicule();
      //  this.getNavigation('admin/admin/vehiculeList','');
       
        }
        else{
          this.toastr.error(result.message);
          this.isLoadingResults = false;
        }
        
      }, (ret) => {
        this.toastr.error(ret.message, "Erreur Code : " + ret.code);
        //this.isLoadingResults = false;
      });
    }
    else{
      this.vehiculeService.saveVisiteTechVignette(FormDataVeh).subscribe(result => {
        if (result.success==true) { 
          this.reponse = result;
        this.toastr.success(result.message);
        this.imagePreview='';
        this.initFormVisiteTech();
        this.TlisteVisteVehicule();
        this.loadOneVehiculeHeaderInfo();
       
        }
        else{
          this.toastr.error(result.message);
          this.isLoadingResults = false;
        }
        
      }, (ret) => {
        this.toastr.error(ret.message, "Erreur Code : " + ret.code);
        //this.isLoadingResults = false;
      }); 
    }
  

  }

loadOneVisiteVignette(VignetteID) {
  this.addOrUpdate= false;
  this.OuvrirFormVisiteTech();
    this.vehiculeService.getVisiteTechniquebyId(VignetteID).subscribe(reponse => {
    this.OneVisite = reponse;  
    this.vehiculeFormVisiteTech.controls['VehiculeVignetteID'].setValue(this.OneVisite.results.resultat[0].ID);
    this.imagePreviewVisiteTech = this.configService.urlgRTI+this.OneVisite.results.resultat[0].lienPhoto;
      this.vehiculeFormVisiteTech.controls['montantvisite'].setValue(this.OneVisite.results.resultat[0].montantvisite);
      this.vehiculeFormVisiteTech.controls['cat'].setValue(this.OneVisite.results.resultat[0].cat);
     this.vehiculeFormVisiteTech.controls['kms'].setValue(this.OneVisite.results.resultat[0].kms);
      this.vehiculeFormVisiteTech.controls['stat'].setValue(this.OneVisite.results.resultat[0].stat);
      this.vehiculeFormVisiteTech.controls['datevisite'].setValue(this.OneVisite.results.resultat[0].datevisite);
      this.vehiculeFormVisiteTech.controls['dateexpiration'].setValue(this.OneVisite.results.resultat[0].dateexpiration);
      this.vehiculeFormVisiteTech.controls['rappel'].setValue(this.OneVisite.results.resultat[0].rappel);
      this.vehiculeFormVisiteTech.controls['observation'].setValue(this.OneVisite.results.resultat[0].observation);
      this.vehiculeFormVisiteTech.controls['montantvignette'].setValue(this.OneVisite.results.resultat[0].montantvignette);
      this.vehiculeFormVisiteTech.controls['numerovignette'].setValue(this.OneVisite.results.resultat[0].numerovignette);
      this.vehiculeFormVisiteTech.controls['ncc'].setValue(this.OneVisite.results.resultat[0].ncc);
      this.vehiculeFormVisiteTech.controls['lieu'].setValue(this.OneVisite.results.resultat[0].lieu);
      this.ModifsVisiteLoadingResults = false;
    });

}





///////////////ASSURENCE////////////////////
initFormAssurance() {
  //this.isLoadingResults = false;
  this.vehiculeFormAssurance = this.formBuilder.group({
    assure_ID: [''],
    assure: ['', Validators.required],
    adresse: ['', Validators.required],
    profession: [''],
    assureur_ID: ['', Validators.required],
    numpolice: ['', Validators.required],
    datedebut: ['', Validators.required],
    datefin: ['', Validators.required],
    rappel: ['30', Validators.required],
    lienPhoto: [''],
   
  });
}

loadAssureur() {
  this.assureurService.listeAssureur().subscribe(reponse => {
    this.listeassureur = reponse;
  });
}

TlisteAssuranceVehicule() {
  this.vehiculeService.getOneAssurancebyVehiculeId(this.id).subscribe(reponse => {
    this.VehiculesAssurance = reponse;
    this.listeVehiculesAssurance = this.VehiculesAssurance.results.resultat;
    this.dataSourceAssur.data = this.listeVehiculesAssurance;
    this.isLoadingResults = false;
    this.TabMAssurance = true;
  });
}

loadOneAssurance(AssurID) {
  this.addOrUpdate= false;
  this.OuvrirFormAssur();
  this.ModifsLoadingResults = true;
    this.vehiculeService.getAssurancebyId(AssurID).subscribe(reponse => {
    this.OneAssurance = reponse;  
    this.vehiculeFormAssurance.controls['assure_ID'].setValue(this.OneAssurance.results.resultat[0].ID);
    this.imagePreviewAssurance = this.configService.urlgRTI+this.OneAssurance.results.resultat[0].lienPhoto;
      this.vehiculeFormAssurance.controls['assure'].setValue(this.OneAssurance.results.resultat[0].assure);
      this.vehiculeFormAssurance.controls['adresse'].setValue(this.OneAssurance.results.resultat[0].adresse);
     this.vehiculeFormAssurance.controls['profession'].setValue(this.OneAssurance.results.resultat[0].profession);
      this.vehiculeFormAssurance.controls['numpolice'].setValue(this.OneAssurance.results.resultat[0].numpolice);
      this.vehiculeFormAssurance.controls['datedebut'].setValue(this.OneAssurance.results.resultat[0].datedebut);
      this.vehiculeFormAssurance.controls['datefin'].setValue(this.OneAssurance.results.resultat[0].datefin);
      this.vehiculeFormAssurance.controls['rappel'].setValue(this.OneAssurance.results.resultat[0].rappel);
      this.vehiculeFormAssurance.controls['assureur_ID'].setValue(this.OneAssurance.results.resultat[0].assureur_ID);
      this.ModifsLoadingResults = false;
    });

}


onSubmitFormAssurance(f) {
  this.isLoadingResults = true;
  const iD = JSON.parse(localStorage.getItem('currentUser'));
  const varID = iD.ID;
  const FormDataVeh = new FormData();
  FormDataVeh.append('ID', f.assure_ID);
  FormDataVeh.append('assure', f.assure);
  FormDataVeh.append('adresse', f.adresse);
  FormDataVeh.append('profession', f.profession);
  FormDataVeh.append('assureur_ID', f.assureur_ID);
  FormDataVeh.append('numpolice', f.numpolice);
  FormDataVeh.append('datedebut', f.datedebut);
  FormDataVeh.append('datefin', f.datefin);
  FormDataVeh.append('rappel', f.rappel);
  FormDataVeh.append('profession', f.profession);
  FormDataVeh.append('lienPhoto', this.selecetdFile);
  FormDataVeh.append('authentification_ID', varID);
  FormDataVeh.append('vehicule_ID', this.id);
  if (f.assure_ID != '') {
    //Nouveau;
    this.vehiculeService.updateAssurance(FormDataVeh).subscribe(result => {
      if (result.success==true) { 
        this.reponse = result;
      this.toastr.success(result.message);
      this.addOrUpdateAssur= true;
      this.imagePreviewAssurance='';
      this.initFormAssurance();
      this.TlisteAssuranceVehicule();
      this.loadOneVehiculeHeaderInfo();
    //  this.getNavigation('admin/admin/vehiculeList','');
     
      }
      else{
        this.toastr.error(result.message);
        this.isLoadingResults = false;
      }
      
    }, (ret) => {
      this.toastr.error(ret.message, "Erreur Code : " + ret.code);
      //this.isLoadingResults = false;
    });
  }
  else{
    this.vehiculeService.saveAssuranceVehicule(FormDataVeh).subscribe(result => {
      if (result.success==true) { 
        this.reponse = result;
      this.toastr.success(result.message);
      this.imagePreviewAssurance='';
      this.initFormAssurance();
      this.TlisteAssuranceVehicule();
      this.loadOneVehiculeHeaderInfo();
    //  this.getNavigation('admin/admin/vehiculeList','');
     
      }
      else{
        this.toastr.error(result.message);
        this.isLoadingResults = false;
      }
      
    }, (ret) => {
      this.toastr.error(ret.message, "Erreur Code : " + ret.code);
      //this.isLoadingResults = false;
    }); 
  }


}

onFileUploadAssurnace(event){
  this.selecetdFile = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
  this.imagePreviewAssurance = reader.result;
  };
  reader.readAsDataURL(this.selecetdFile);
  }

  actionCloseAssur(f){
    if (f!=1) {
     
      this.FermerFormAssur();
    } else {
     
      this.OuvrirFormAssur();
    }
  
  }

  OuvrirFormAssur(){
    this.hiddenAssurance=false;
    this.ActionCloseAssur= false;
    this.ActionOpenAssur= true;
    }
    
    FermerFormAssur(){
      this.hiddenAssurance=true;
    this.ActionCloseAssur= true;
    this.ActionOpenAssur= false;
    this.initFormAssurance();
    this.addOrUpdateAssur= true;
    this.imagePreviewAssurance='';
    }
  
    actionCloseCarteGrise(f){
      if (f!=1) {
       
        this.FermerFormCarteGrise();
      } else {
       
        this.OuvrirFormCarteGrise();
      }
    
    }
    
    OuvrirFormCarteGrise(){
    this.hiddenCarteGrise=false;
    this.ActionCloseCarteGrise= false;
    this.ActionOpenCarteGrise= true;
    }
    
    FermerFormCarteGrise(){
    this.hiddenCarteGrise=true;
    this.ActionCloseCarteGrise= true;
    this.ActionOpenCarteGrise= false;
    /*this.initFormVisiteTech();
    this.addOrUpdate= true;
    this.imagePreviewVisiteTech='';*/
    }

    actionCloseVisiteTech(f){
      if (f!=1) {
       
        this.FermerFormVisiteTech();
      } else {
       
        this.OuvrirFormVisiteTech();
      }
    
    }
    
    OuvrirFormVisiteTech(){
    this.hiddenVisiteTech=false;
    this.ActionCloseVisiteTech= false;
    this.ActionOpenVisiteTech= true;
    }
    
    FermerFormVisiteTech(){
    this.hiddenVisiteTech=true;
    this.ActionCloseVisiteTech= true;
    this.ActionOpenVisiteTech= false;
    this.initFormVisiteTech();
    this.addOrUpdate= true;
    this.imagePreviewVisiteTech='';
    }

    actionClose(f){
      if (f!=1) {
       
        this.FermerForm();
      } else {
       
        this.OuvrirForm();
      }
    
    }
    
    OuvrirForm(){
    this.hiddenCarteGrise=false;
    this.ActionClose= false;
    this.ActionOpen= true;
    }
    
    FermerForm(){
    this.hiddenCarteGrise=true;
    this.ActionClose= true;
    this.ActionOpen= false;
    this.initFormVisiteTech();
    this.addOrUpdate= true;
    this.imagePreviewVisiteTech='';
    }

    //////////SUPPRIMER/////////////
    ItemSupprime(id,name) {
      this.IDSuppression = id;
      this.NameSuppression = name;
      }

      supprime(){
        if (this.NameSuppression='media') {
          this.supprimeMedia();
        }
        if (this.NameSuppression='assurance') {
          this.supprimeAssurance();
        }
        if (this.NameSuppression='visite') {
          this.supprimeVisiteTech();
        }
      }
      
      supprimeMedia() {
      this.vehiculeService.deleteMedia(this.IDSuppression).subscribe(reponse => {
      this.toastr.success("Suppression terminée avec succès ! ");
      this.TlisteAddDocument(this.id);
      }, (ret) => {
      this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
      });
      }

      supprimeVisiteTech() {
        this.vehiculeService.deleteVisiteTechnique(this.IDSuppression).subscribe(reponse => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteVisteVehicule();
        }, (ret) => {
        this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
        });
        }

        supprimeAssurance() {
          this.vehiculeService.deleteAssurance(this.IDSuppression).subscribe(reponse => {
          this.toastr.success("Suppression terminée avec succès ! ");
          this.TlisteAssuranceVehicule();
          }, (ret) => {
          this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
          });
          }



          /////////ENVOIE POUR VALIDATION DE VEHICULE/////////
          SendToValideVhecule(){
            this.workflowService.VerificationcircuitWorkFlow(environment.EtapeWorkflowValideVehicule).subscribe(reponse => {
              this.ResponseVerifCircuit = reponse;
              if (this.ResponseVerifCircuit.results[0].nbre==1) {
                //Recherche de l'existance du code EtapeWorkflowValideVehicule de l'environement
                this.Get_validateur_liste_EtapeWorkflow(this.ResponseVerifCircuit.results[0].workf_etp_id);
                                
              }else{
                this.toastr.error("Erreur : " + this.ResponseVerifCircuit.message+', créer le circuit: '+ environment.EtapeWorkflowValideVehicule);
         
              }
              
            });
            

          }


          Get_validateur_liste_EtapeWorkflow(etapeID){
            //Initialisation de la recherche du code étape
           
            const code = 0;
            const date='';

            this.Get_validateur_liste(etapeID,code);
          }


  //Recherche des Etape de validateur du workFlow
  Get_validateur_liste(etapworkflowid,etapcode){
    this.workflowappService.validateurlisteEtapeWorkflow(etapworkflowid,etapcode, this.Todate).subscribe(reponse => {
      if (reponse.statut === true) {
      
      
          this.SendupdateVehiculeEtapeCodeForValidation(this.id, reponse.results[0].etape_code); 
          //Recuperation des emails validateurs
          reponse.results.forEach(element => {this.ListWorkflowValidateur += element.email + ',';});
          alert(this.ListWorkflowValidateur);
        
      }

     else{
    
         // this.isLoadingResults = false;
          this.toastr.error(reponse.message, 'ERROR');
      
      }

      
    });
  }
          

//UpdateVehiculeByCodeEtape

 


SendupdateVehiculeEtapeCodeForValidation(Idvehicule, Etapworkflowid) {
  /*Une demande de validation vous a &eacute;t&eacute; transmise.*/
  const SendObjet = new FormData();
  SendObjet.append('vehicule_ID', Idvehicule);
  SendObjet.append('w_code_etape', Etapworkflowid);
  if(Etapworkflowid == 999999){
    this.workflowService.TheEndValidationVehicule(SendObjet).subscribe(data => {
      this.toastr.success(data.message);
      //this.SendEtapworkflowidEmailListOfValidation();
      });
  }else{
  this.workflowService.updateVehiculeEtapeCodeForValidation(SendObjet).subscribe(data => {
  this.toastr.success(data.message);
  //this.SendEtapworkflowidEmailListOfValidation();
  });
}
}




SendEtapworkflowidEmailListOfValidation() {
  //Envoie de mail pour la validation du véhicule.
  const BodyMessage: string = 'Une demande de validation de véhicule vous a ete transmise.';
  const BodyButtom: string = 'RTI PARC AUTO - Gestion de la Flotte automobile';
  const BodyInfoVehicule = 'VEHICULE N&deg;:'+environment.imatriculationSendEmail+' - '+environment.marqueSendEmail+' '+environment.modeleSendEmail+' - '+environment.fonctionVehiculeSendEmail+'';
 const TextEnvoieMailValidationVehicule: string = '<style type="text/css">'
+'body, td { font-family: "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif; font-size:16px;}body { background-color: #fff; margin: 0; padding: 0; -webkit-text-size-adjust:none; -ms-text-size-adjust:none; }'
    +'h2{ padding-top:12px;color:#000; font-size:22px; }'
    
   +' @media only screen and (max-width: 480px) {' 

        +'table[class=w275], td[class=w275], img[class=w275] { width:135px !important;}'
       + 'table[class=w30], td[class=w30], img[class=w30] { width:10px !important; }' 
       + 'table[class=w580], td[class=w580], img[class=w580] { width:280px !important; }'
       + 'table[class=w640], td[class=w640], img[class=w640] { width:300px !important; }'
       + 'img{ height:auto;}'
       + 'table[class=w180], td[class=w180], img[class=w180] {' 
       + 'width:280px !important;' 
       + 'display:block;'
       + '}'    
       + 'td[class=w20]{ display:none; }'    
       +'}</style>'

       +'<body style="margin:0px; padding:0px; -webkit-text-size-adjust:none;">'

       +'<table width="100%" cellpadding="0" cellspacing="0" border="0">'
       +'<tbody>'
       +' <tr>'
       +'<td align="center" bgcolor="#F68537">'
       +' <table  cellpadding="0" cellspacing="0" border="0">'
       +'<tbody><tr><td class="w640"  width="640" height="10"></td></tr>'

                          
       +'<tr>'
       +'  <td class="w640"  width="640" height="10"></td></tr>'


                            
       +'<tr class="pagetoplogo">'
       +' <td class="w640"  width="640">'
       +' <table  class="w640"  width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">'
       +' <tbody>'
       +'  <tr>'
       +' <td class="w30"  width="30"></td>'
       +' <td  class="w580"  width="580" valign="middle" align="center">'
       +' <div class="pagetoplogo-content" style="padding:5px"><h1> RTI PARC AUTOMOBILE</h1>'

       //+'      <img src="'+this.configService.urlApplication+'assets/dist/img/logo-modern.png" alt="RTI" width="120" class="w580" style="text-decoration: none; display: block; color:#476688; font-size:30px;"/>'
       +'  </div>'
       +' </td> '
       +' <td class="w30"  width="30"></td>'
       +'</tr>'
                                    
       +' </tbody>'
       +'</table>'
       +'</td>'

       +'</tr>'
       +'<tr class="content">'
       +'<td class="w640" class="w640"  width="640">'
       +'<table class="w640"  width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">'
       +'<tbody>'
       +'<tr>'
       +'<td  class="w30"  width="30"></td>'
       +'<td  class="w580"  width="580" bgcolor="#ffffff">'
       +'<!-- une zone de contenu -->'


       +'<table class="w580"  width="580" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">'
       +'<tbody bgcolor="#ffffff">'                                                            
       +'<tr>'
       +'<td class="w580"  width="580">'
       +'<h2 style="font-size:16px; padding-top:12px;">'
       +'Bonjour, </h2>'

       +'<div align="left" class="article-content">'
       +'<p>'+BodyMessage+'</p>'
      // +'<p><strong><span style="text-transform:uppercase">".$TitreDemande."</span> '
       +'<span style="color:#F00; text-transform: uppercase; font-weight: 500;">'
       +''+BodyInfoVehicule+'</span></span>'

       +'</strong>'
       +'</p>'
       +'<p>veuillez vous connecter en cliquant sur le lien ci-dessous:</p>'
       +'<p><a href="http://parcauto.rti.ci" target="_blank">parcauto.rti.ci</a></p>'


       +'</div>'
       +'</td>'
       +'</tr>'
       +'<tr>'
       +'<td class="w580"  width="580" height="1" bgcolor="#fff"></td>'
       +'</tr>'
       +'</tbody>'
       +'</table>'                                              

                         
       +'</td>'
       +'<td class="w30" class="w30"  width="30"></td>'
       +'</tr>'
       +'</tbody>'
       +'</table>'
       +'</td>'
       +'</tr>'
       +'<tr>'
       +'<td class="w640"  width="640" height="15" bgcolor="#ffffff"></td>'
       +'</tr>'
       +'<tr class="pagebottom">'
       +'<td class="w640"  width="640">'
       +'<table class="w640"  width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#000">'
       +'<tbody>'
       +'<tr>'
       +'<td colspan="5" height="10"></td>'
       +'</tr>'
       +'<tr>'
       +'<td class="w30"  width="30"></td>'
       +'<td class="w580"  width="580" valign="top">'
       +'<p align="center" class="pagebottom-content-left">'
                                                        
       +'<span style="color:#fff;">'+BodyButtom+'</span><br>'
                                             
       +'</p>'
       +'</td>'

       +'<td class="w30"  width="30"></td>'
       +'</tr>'
     /*  +'<tr>'
       +'<td colspan="5" height="10"></td>'
       +'</tr>'
       +'</tbody>'
       +'</table>'
       +'</td>'
       +'</tr>'
       +'<tr>'*/
       //+'<td class="w640"  width="640" height="60"></td>'
      // +'</tr>'
       +'</tbody>'
       +'</table>'

       +'</body>'
       +'</html>';

       const SendMail = new FormData();
  SendMail.append('subjet', 'RTI PARC AUTO - DEMANDE DE VALIDATION VEHICULE');
  SendMail.append('message', TextEnvoieMailValidationVehicule);
  SendMail.append('destinataires', this.ListWorkflowValidateur);
  this.workflowappService.sendEmailEtapworkflowidEmailListOfValidation(SendMail).subscribe(data => {
    this.toastr.warning(data.message);
   
  });

//alert(this.configService.urlApplication+'assets/dist/img/logo-modern.png');
}



///Gestion Des validation de véhicule

initFormvalideVehicule() {
  //this.isLoadingResults = false;
  this.vehiculeFormValidation = this.formBuilder.group({
    Valetapcode: ['', Validators.required],
    ValvehiculeID: ['', Validators.required],
    ValvehiculeStaut: ['1'],
  });
}

onSubmitvalideVehicule() {

  this.workflowService.VerificationcircuitWorkFlow(environment.EtapeWorkflowValideVehicule).subscribe(reponse => {
    this.ResponseVerifCircuit = reponse;
      //Recherche de l'existance du code EtapeWorkflowValideVehicule de l'environement
      this.Get_validateur_liste(this.ResponseVerifCircuit.results[0].workf_etp_id,this.wcodeetape);
    
  });


 /* FormDataVeh.append('Valetapcode', f.Valetapcode);
  FormDataVeh.append('ValvehiculeID', f.ValvehiculeID);
  FormDataVeh.append('ValvehiculeStaut', f.ValvehiculeStaut);*/
 // this.Get_validateur_liste(this.Receivedworkfetpid,f.Valetapworkflowid);
 /* if (f.ValvehiculeStaut != 0) {
    //Nouveau;
   console.log(FormDataVeh);
   this.SendToValideVhecule();
  // 
  }
  else{
    this.vehiculeService.saveAssuranceVehicule(FormDataVeh).subscribe(result => {
      if (result.success==true) { 
        this.reponse = result;
      this.toastr.success(result.message);
      this.imagePreviewAssurance='';
      this.initFormAssurance();
      this.TlisteAssuranceVehicule();
      this.loadOneVehiculeHeaderInfo();
 
     
      }
      else{
        this.toastr.error(result.message);
        this.isLoadingResults = false;
      }
      
    }, (ret) => {
      this.toastr.error(ret.message, "Erreur Code : " + ret.code);
     
    }); 
  }*/


}

  
  
  }
