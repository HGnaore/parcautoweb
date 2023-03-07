import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { DirectionService } from 'src/app/services/trombino/direction.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consultation-vehicule',
  templateUrl: './consultation-vehicule.component.html',
  styleUrls: ['./consultation-vehicule.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(1000, style({ opacity: 0 })))
    ])
  ]
})
export class ConsultationVehiculeComponent implements OnInit {
  ProfilID = JSON.parse(localStorage.getItem('currentUser'));
  UserProfilID: any;
  ////////////////////////////////////////
selecetdFile : File;
imagePreview: any;


  /////////////////////////////////////
  vehiculeForm: FormGroup;
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
  fonctionVehicule: any;
  //FICHIER UPLOAD

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private vehiculeService: VehiculeService,
    private directionService: DirectionService,
    private fournisseurService: FournisseurService,
    private configService: ConfigService,
    private httpClient: HttpClient) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.activeMenu();
  }
  activeMenu(){
    this.configService.OngletConsultation = true;
    this.configService.OngletModification = false;
    this.configService.OngletTraitement = false;
  }
  //////////////
  onFileUpload(event){
    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selecetdFile);
    }

  ///////////////
  ngOnInit() {
    this.UserProfilID = this.ProfilID.prof_id;
    this.MenuTraitementVehicule();
    this.loadOneVehiculeInfo();
    this.loadOneVehiculeInfoModifier();  
  }

  MenuTraitementVehicule(){ 
    this.configService.ListMenuVehicule=true;
    environment.SelectIDvehicule=this.id;
    environment.SelectUserProfil = this.UserProfilID;
  }

  


  loadOneVehiculeInfo() {
    this.isLoadingResults = true;
    if (this.id !== '0') {
      this.isLoadingResults = true;
      this.vehiculeService.getInfoVehiculebyID(this.id).subscribe(reponse => {
        this.OneVehicule = reponse;
        ///resultatVehicule   
        this.imatriculation = this.OneVehicule.results.resultatVehicule[0].imatriculation;
        this.modele= this.OneVehicule.results.resultatVehicule[0].modele;
        this.marque= this.OneVehicule.results.resultatVehicule[0].marque; 
        this.imagePreview = this.configService.urlgRTI+this.OneVehicule.results.resultatVehicule[0].lienPhoto;

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


  TlisteDocument(IdVehicule) {
    this.vehiculeService.getMediabyIdVehicule(IdVehicule).subscribe(reponse => {
      this.Document = reponse;
      this.listeDocument = this.Document.results.resultat;
      this.urlPhoto=this.configService.urlgRTI;
    });
  }


  loadOneVehiculeInfoModifier() {
   // this.isLoadingResultsModif = true;
    if (this.id !== '0') {
   // this.isLoadingResultsModif = true;
    this.vehiculeService.getOneVehicule(this.id).subscribe(reponse => {
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
    
    this.fonctionVehicule=this.OneVehicule.results[0].fonction;
    /*this.vehiculeForm.controls['Dir_id'].setValue(this.OneVehicule.results[0].direction_ID);
    this.loadPersonnelByDirections(this.OneVehicule.results[0].direction_ID);
    this.vehiculeForm.controls['Agent_id'].setValue(this.OneVehicule.results[0].personnel_ID);
    this.loadPersonnelByID(this.OneVehicule.results[0].personnel_ID);
    this.vehiculeForm.controls['Dir_NomPrenAgent'].setValue(this.OneVehicule.results[0].personnel_nom);
    
    
    this.TabModifier = true;*/
    // console.log(reponse);
   // this.isLoadingResultsModif = false;
    });
    }
    }

}
