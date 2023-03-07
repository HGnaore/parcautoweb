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
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-location-edition',
  templateUrl: './location-edition.component.html',
  styleUrls: ['./location-edition.component.scss'],
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
export class LocationEditionComponent {
  isLoadingResults = true;
  vehiculeLocationForm: FormGroup;
  id: string;
  reponse: any;
  enModif = false;
  fileToUpload1: File = null;
  fileToUpload2: File = null;
  listemarques: any = [];
  listemodelebymarques: any = [];
  listeenergies: any = [];
  listeusages: any = [];
  OneVehiculeLocation: any = [];
  //releve
  releves: any = [];
  listereleves: any = [];
  displayedColumns_rele: string[] = ['dateReleve', 'kilometrage', 'observation', 'action'];
  dataSource_rele: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator_rele: MatPaginator;
  @ViewChild(MatSort) sort_rele: MatSort;
  n_releves = 0;

    //a supprimer
    displayedColumns: string[] = ['dateReleve', 'kilometrage', 'action'];
    dataSource: MatTableDataSource<any>;

 /* displayedColumns_ass: string[] = ['dateAssurance', 'dateExpiration', 'rappel', 'fournisseurName', 'assuranceDocUrl', 'action'];
  dataSource_ass: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator_ass: MatPaginator;
  @ViewChild(MatSort) sort_ass: MatSort;*/

  ngAfterViewInit() {
    this.dataSource_rele.paginator = this.paginator_rele;
    this.dataSource_rele.sort = this.sort_rele;
  } 

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private vehiculeService: VehiculeService,
    private fournisseurService: FournisseurService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.dataSource = new MatTableDataSource();
    this.dataSource_rele = new MatTableDataSource(this.releves);
  
   /* this.dataSource_visi = new MatTableDataSource(this.visites);*/
  }


  ngOnInit(): void {
    this.loadOneVehicule();
    this.loadMarques();
    this.loadEnergies();
    this.loadUsages();
  }


  loadMarques() {
    this.vehiculeService.listeMarque().subscribe(reponse => {
      this.listemarques = reponse;
    });
  }

  loadEnergies() {
    this.vehiculeService.listeEnergies().subscribe(reponse => {
      this.listeenergies = reponse;
    });
  }

  loadUsages() {
    this.vehiculeService.listeUsages().subscribe(reponse => {
      this.listeusages = reponse;
    });
  }

  loadModelByMarques(Maqid) {
    this.vehiculeService.getMarqueModelebyMarqueId(Maqid).subscribe(reponse => {
      this.listemodelebymarques = reponse;
     
   //   this.vehiculeLocationForm.controls['modeleId'].setValue(this.listemodelebymarques[0].id);
    });
  } 


  loadOneVehicule() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.isLoadingResults = true;
      this.vehiculeService.getOneLocation(this.id).subscribe(reponse => {
        this.OneVehiculeLocation = reponse;
        this.releves = reponse.releveKilometriques;

        this.dataSource_rele.data = this.releves;
   
        this.vehiculeLocationForm.controls['dateDebut'].setValue(this.OneVehiculeLocation.dateDebut);
        this.vehiculeLocationForm.controls['dateFin'].setValue(this.OneVehiculeLocation.dateFin);
        this.vehiculeLocationForm.controls['montantJournalier'].setValue(this.OneVehiculeLocation.montantJournalier);
        this.vehiculeLocationForm.controls['libelleLocation'].setValue(this.OneVehiculeLocation.libelleLocation);
        this.vehiculeLocationForm.controls['contratUrl'].setValue(this.OneVehiculeLocation.contratUrl);
        this.vehiculeLocationForm.controls['comment'].setValue(this.OneVehiculeLocation.comment);
        this.vehiculeLocationForm.controls['dateExpirationAssurance'].setValue(this.OneVehiculeLocation.dateExpirationAssurance);
        this.vehiculeLocationForm.controls['assuranceComment'].setValue(this.OneVehiculeLocation.assuranceComment);
        this.vehiculeLocationForm.controls['assuranceUrl'].setValue(this.OneVehiculeLocation.assuranceUrl);
          this.vehiculeLocationForm.controls['dateExpirationVisiteTechnique'].setValue(this.OneVehiculeLocation.dateExpirationVisiteTechnique);
        this.vehiculeLocationForm.controls['visiteTechniqueComment'].setValue(this.OneVehiculeLocation.visiteTechniqueComment);
      /* alert(this.OneVehicule.energieId)*/
        this.vehiculeLocationForm.controls['visiteTechniqueUrl'].setValue(this.OneVehiculeLocation.visiteTechniqueUrl);
        this.vehiculeLocationForm.controls['immatriculation'].setValue(this.OneVehiculeLocation.immatriculation);
       this.vehiculeLocationForm.controls['numCarteGrise'].setValue(this.OneVehiculeLocation.numCarteGrise);
        this.vehiculeLocationForm.controls['usageId'].setValue(this.OneVehiculeLocation.usageId);
        this.vehiculeLocationForm.controls['dateMiseEnCirculation'].setValue(this.OneVehiculeLocation.dateMiseEnCirculation);
        this.loadModelByMarques(this.OneVehiculeLocation.marqueId);
        
        this.vehiculeLocationForm.controls['marqueId'].setValue(this.OneVehiculeLocation.marqueId);
        this.vehiculeLocationForm.controls['modeleId'].setValue(this.OneVehiculeLocation.modeleId);
         this.vehiculeLocationForm.controls['typeCommercial'].setValue(this.OneVehiculeLocation.typeCommercial);
        this.vehiculeLocationForm.controls['couleur'].setValue(this.OneVehiculeLocation.couleur);
        this.vehiculeLocationForm.controls['carroserie'].setValue(this.OneVehiculeLocation.carroserie);
      this.vehiculeLocationForm.controls['energieId'].setValue(this.OneVehiculeLocation.energieId);
        this.vehiculeLocationForm.controls['nbPlaceAssise'].setValue(this.OneVehiculeLocation.nbPlaceAssise);
         this.vehiculeLocationForm.controls['usageId'].setValue(this.OneVehiculeLocation.usageId);
         this.vehiculeLocationForm.controls['puissanceFiscale'].setValue(this.OneVehiculeLocation.puissanceFiscale);

         this.vehiculeLocationForm.controls['nbEssieux'].setValue(this.OneVehiculeLocation.nbEssieux);
         this.vehiculeLocationForm.controls['cylindree'].setValue(this.OneVehiculeLocation.cylindree);
         this.vehiculeLocationForm.controls['chassis'].setValue(this.OneVehiculeLocation.chassis);
         this.vehiculeLocationForm.controls['typeTechnique'].setValue(this.OneVehiculeLocation.typeTechnique);
         this.vehiculeLocationForm.controls['vehiculePictureUrl'].setValue(this.OneVehiculeLocation.vehiculePictureUrl);
         this.vehiculeLocationForm.controls['carteGrisePictureUrl'].setValue(this.OneVehiculeLocation.carteGrisePictureUrl);
       

    
         
        /* this.vehiculeForm.controls['comment'].setValue(this.OneVehicule.comment);*/
   
        this.isLoadingResults = false;
        console.log(reponse);
      });
    }
  }

  ajouter_rele(f) {
    console.log(f)
    this.isLoadingResults = true;
    var body = {
      "dateReleve": f.dateReleve,
      "kilometrage": f.kilometrage,
      "comment": f.comment_relev
    };

    //ajouter dans la liste
    this.releves.push(
      {
        "id": this.n_releves++,
        "dateReleve": f.dateReleve,
        "kilometrage": f.kilometrage,
        "comment": f.comment_relev,
        "isDeleted": false
      }
    )
    //mise à jour de la table
    //this.dataSource_rele.data = this.releves;
    const result = this.releves.filter(item => item.isDeleted === false);
    this.dataSource_rele.data = result;
   // console.log(this.releves);
  }

  supTable_rele(idC: any) {
    const index = this.releves.findIndex(id => id.id === idC);
    if (index !== -1) {
      // this.details.splice(index, 1);
      this.releves.find(item => item.id == idC).isDeleted = true;

      const result = this.releves.filter(item => item.isDeleted === false);
      this.dataSource_rele.data = result;
      console.log(this.releves);
    }
  }

  initForm() {
    this.isLoadingResults = false;

    this.vehiculeLocationForm = this.formBuilder.group({
      //Info location
      dateDebut: [new Date().toISOString().slice(0, 19)],
      dateFin: [new Date().toISOString().slice(0, 19)],
      montantJournalier: ['', Validators.required],
      libelleLocation: ['', Validators.required],
      comment: [''],
      contratUrl: [''],

      //carte grise
      immatriculation: [''],
      numCarteGrise: [''],
      dateMiseEnCirculation: [new Date().toISOString().slice(0, 19)],
      modeleId: [''],
      marqueId: [''],
      genre: [''],
      typeCommercial: [''],
      couleur: [''],
      carroserie: [''],
      energieId: [''],
      nbPlaceAssise: [0],
      usageId: [''],
      puissanceFiscale: [0],
      nbEssieux: [0],
      cylindree: [0],
      chassis: [''],
      typeTechnique: [''],
      vehiculePictureUrl: [''],
      carteGrisePictureUrl: [''],
      nombreJour: [''],
      //assurance
      dateExpirationAssurance: [new Date().toISOString().slice(0, 19)],
      assuranceComment: [''],
      assuranceUrl: [''],

      //visite
      dateExpirationVisiteTechnique: [new Date().toISOString().slice(0, 19)],
      visiteTechniqueComment: [''],
      visiteTechniqueUrl: [''],

      //Releve
      dateReleve: [new Date().toISOString().slice(0, 19)],
      kilometrage: [''],
      comment_relev: [''],


    });
  }


  onSubmitForm(f) {
    this.isLoadingResults = true;
    var body = {
      "dateDebut": f.dateDebut,
  "dateFin": f.dateFin,
  "montantJournalier": f.montantJournalier,
  "libelleLocation":f.libelleLocation,
  "contratUrl": f.contratUrl,
  "comment": f.comment,
  "dateExpirationAssurance": f.dateExpirationAssurance,
  "assuranceComment": f.assuranceComment,
  "assuranceUrl": f.assuranceUrl,
  "dateExpirationVisiteTechnique": f.dateExpirationVisiteTechnique,
  "visiteTechniqueComment": f.visiteTechniqueComment,
  "visiteTechniqueUrl": f.visiteTechniqueUrl,
  "immatriculation": f.immatriculation,
  "numCarteGrise": f.numCarteGrise,
  "dateMiseEnCirculation": f.dateMiseEnCirculation,
  "modeleId": f.modeleId,
  "marqueId": f.marqueId,
  "genre": f.genre,

  "typeCommercial": f.typeCommercial,
  "couleur": f.couleur,
  "carroserie": f.carroserie,
  "energieId": f.energieId,
  "nbPlaceAssise": f.nbPlaceAssise,
  "usageId": f.usageId,
  "puissanceFiscale": f.puissanceFiscale,
  "nbEssieux": f.nbEssieux,
  "cylindree": f.cylindree,
  "chassis": f.chassis,
  "typeTechnique": f.typeTechnique,
  "vehiculePictureUrl": f.vehiculePictureUrl,
  "carteGrisePictureUrl":f.carteGrisePictureUrl,
  "releveKilometriques": this.releves,
      //////////////////////////////////
     
    };

    this.id = this.route.snapshot.paramMap.get('id');

 if (this.id != '0') {
      //Modification
      this.vehiculeService.updateLocation(this.id, body).subscribe(result => {
        this.reponse = result;
        this.isLoadingResults = false;
        this.toastr.success("Modification terminée avec success");
        this.location.back();
      }, (ret) => {
        this.toastr.error(ret.message, "Erreur Code : " + ret.code);
        this.isLoadingResults = false;
      });
    } else {
      //Nouveau;
      this.vehiculeService.saveLocation(body).subscribe(result => {
        this.reponse = result;
        this.isLoadingResults = false;
        this.toastr.success("Enregistrement terminé avec success");
        this.enModif = true;
      }, (ret) => {
        this.toastr.error(ret.message, "Erreur Code : " + ret.code);
        this.isLoadingResults = false;
      });
    }

  }


  public changeMarque(event) {
    this.loadModelByMarques(event);
  }



}



/*export interface PeriodicElement {
  number:number;
  name: string;
  position: string;
  weight: string;
  symbol: string;
  etat: string;
  Kilometrage:string;
  obs:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {number:1, position: '10/03/2022', name: '10/02/2023', weight: '30', symbol: 'Collina Assurance', etat: 'SGS SICTA', Kilometrage: '1024', obs: 'Observation 99'},
  {number:2, position: '10/02/2021', name: '10/02/2022', weight: '30', symbol: 'Collina Assurance', etat: 'SGS SICTA', Kilometrage: '957', obs: 'Observation ii'},
  
];*/
