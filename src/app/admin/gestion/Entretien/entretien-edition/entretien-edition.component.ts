import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EntretienService } from 'src/app/services/entretien.service';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ActivatedRoute } from '@angular/router';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entretien-edition',
  templateUrl: './entretien-edition.component.html',
  styleUrls: ['./entretien-edition.component.scss'],
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
export class EntretienEditionComponent implements OnInit {

  EntretienForm: FormGroup;
  listefournisseur;
  libFournisseur;
  listevehicule;
  listeTypeEntretien;
  id: string;
  pushtypeEntretienName: any;
  pushttypeEnretretienId: any;
  isLoadingResults = true;
  reponse: any;
  enModif = false;
  detailEntretien: any = [];
  n_detailEntretien = 0;
  detailentretienProgrammes: any = [];
  OneEntretien: any = [];
  n_detailentretienProgrammes = 0;
  displayedColumns: string[] = ['number','designation', 'quantite', 'prixUnitaire', 'action'];
  dataSourceDetailTravaux: MatTableDataSource<any>;

  /*displayedColumns_rele: string[] = ['dateReleve', 'kilometrage', 'observation', 'action'];
  dataSource_rele: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator_rele: MatPaginator;
  @ViewChild(MatSort) sort_rele: MatSort;*/


  displayedColumnsProgramme: string[] = ['numberMat', 'typeEntretienName','frequenceCode', 'kilometrage','rappel','rappelKilometrage', 'actionMat'];
  dataSourceProgramme:  MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSourceDetailTravaux.paginator = this.paginator;
    this.dataSourceProgramme.paginator = this.paginator;
  }

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vehiculeService: VehiculeService,
    private entretienService: EntretienService,
    private location: Location,
    private fournisseurService: FournisseurService) {
    this.id = this.route.snapshot.paramMap.get('id');
   this.initForm();
   this.dataSourceDetailTravaux = new MatTableDataSource(this.detailEntretien);
   this.dataSourceProgramme = new MatTableDataSource(this.detailentretienProgrammes);
   /*  this.dataSource_ass = new MatTableDataSource();
    this.dataSource_rele = new MatTableDataSource(this.releves);
    this.dataSource_visi = new MatTableDataSource(this.visites);*/
  }

  ngOnInit(): void {
    this.loadVehicule();
    this.loadFournisseur();
    this.loadTypeEntretien();
    this.loadOneEntretien();
  }

  loadFournisseur() {
    this.fournisseurService.listeFournisseur().subscribe(reponse => {
      this.listefournisseur = reponse;
    
    });
  }

  loadVehicule() {
    this.vehiculeService.listeVehicule().subscribe(reponse => {
      this.listevehicule = reponse;
     
    });
  }

  loadTypeEntretien() {
    this.entretienService.listeTypeEntretiens().subscribe(reponse => {
      this.listeTypeEntretien = reponse;
     
    });
  }

  
  
  onChangeVehicule(id) {
    this.EntretienForm.controls['vehiculeIdProgram'].setValue(id);
   

   // console.log(id);
  }


  initForm() {
    this.isLoadingResults = false;

    this.EntretienForm = this.formBuilder.group({
      //Edition ENtretien
      dateEntretien: [new Date().toISOString().slice(0, 19)],
      fournisseurId: [''],
      vehiculeId: [''],
      kilometrage: [''],
      objetEntretien: [''],
      profomaUrl: [''],
      bonCommandeUrl: [''],
      factureUrl: [''],
      comment: [''],

      ///DETAIL TRAVEAUX
      DetailDesignation: [''],
      DetailQuantite: [''],
      DetailPrixUnit: [''],
      DetailPrixTotal: [''],
      //ENTRETIEN PROGRAMME
      vehiculeIdProgram: [{value: '', disabled: true}],
      typeEnretretienId: [''],
      typeEntretienName: [''],
      repetition: [''],
      frequenceCode: [''],
      frequenceName: [''],
      rappel: [''],
      rappelPeriodeCode: [''],
      rappelPeriodeName: [''],
      rappelKilometrage: [''],
      //carte grise
   
    });
  }

  onSubmitForm(f) {
    this.isLoadingResults = true;
    var body = {
      "vehiculeId": f.vehiculeId,
      "fournisseurId": f.fournisseurId,
      "dateEntretien": f.dateEntretien,
      "kilometrage": f.kilometrage,
      "objetEntretien": f.objetEntretien,
      "profomaUrl": f.profomaUrl,
      "bonCommandeUrl": f.bonCommandeUrl,
      "factureUrl": f.factureUrl,
      "comment": f.comment,
      "details": this.detailEntretien,
      "entretienProgrammes": this.detailentretienProgrammes,
    };

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != '0') {
      //Modification
      this.entretienService.updateEntretiens(this.id, body).subscribe(result => {
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
      this.entretienService.saveEntretiens(body).subscribe(result => {
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

 /* : [''],
  : [''],
  : [''],
  DetailPrixTotal: [''],*/

  ajouter_detail(f) {
    this.isLoadingResults = true;
    var body = {
      
      "designation": f.DetailDesignation,
      "quantite": f.DetailQuantite,
      "prixUnitaire": f.DetailPrixUnit,
    };
   // alert(f.DetailQuantite*f.DetailPrixUnit);
    //ajouter dans la liste
    this.detailEntretien.push(
      {
        "id": this.n_detailEntretien++,
        "designation": f.DetailDesignation,
      "quantite": f.DetailQuantite,
      "prixUnitaire": f.DetailPrixUnit,
        "isDeleted": false
      }
    )
    //mise à jour de la table
    //this.dataSource_rele.data = this.releves;
    const result = this.detailEntretien.filter(item => item.isDeleted === false);
    this.dataSourceDetailTravaux.data = result;
   // console.log(this.releves);
  }


  supTable_DetailEnt(idC: any) {
    const index = this.detailEntretien.findIndex(id => id.id === idC);
    if (index !== -1) {
      // this.details.splice(index, 1);
      this.detailEntretien.find(item => item.id == idC).isDeleted = true;

      const result = this.detailEntretien.filter(item => item.isDeleted === false);
      this.dataSourceDetailTravaux.data = result;
      
    }
  }


  //////////////////
  onChangeTypeEntretien(event){
 
    const splitted = event.split(";");
    /*const value = splitted[0];*/
   this.pushttypeEnretretienId= splitted[0];
  this.pushtypeEntretienName= splitted[1];
   // console.log(this.pushtypeEntretienName);
  }

 /* onChangeTypeEntretien(el){
    console.log(el.getAttribute('designation'))

  }*/
  ajouter_detailEntretienProgramm(f) {
    this.isLoadingResults = true;
    var body = { 
      /*"typeEnretretienId": f.typeEnretretienId,
      "typeEntretienName": f.typeEntretienName,*/
      "typeEnretretienId": this.pushttypeEnretretienId,
      "typeEntretienName": this.pushtypeEntretienName,
      "repetition": f.repetition,
      "frequenceCode": f.frequenceCode,
      "frequenceName": f.frequenceName,
      "kilometrage": f.kilometrage,
      "rappel": f.rappel,
      "rappelPeriodeCode": f.rappelPeriodeCode,
      "rappelPeriodeName": f.rappelPeriodeName,
      "rappelKilometrage": f.rappelKilometrage,

    };
   
    //ajouter dans la liste
    this.detailentretienProgrammes.push(
      {
        "id": this.n_detailentretienProgrammes++,
      "typeEnretretienId": this.pushttypeEnretretienId,
      "typeEntretienName": this.pushtypeEntretienName,
      "repetition": f.repetition,
      "frequenceCode": f.frequenceCode,
      "frequenceName": f.frequenceName,
      "kilometrage": f.kilometrage,
      "rappel": f.rappel,
      "rappelPeriodeCode": f.rappelPeriodeCode,
      "rappelPeriodeName": f.rappelPeriodeName,
      "rappelKilometrage": f.rappelKilometrage,
        "isDeleted": false
      }

      
    )
   // console.log(this.detailentretienProgrammes);
    //mise à jour de la table
    //this.dataSource_rele.data = this.releves;
    const result = this.detailentretienProgrammes.filter(item => item.isDeleted === false);
    this.dataSourceProgramme.data = result;
   // console.log(this.releves);
  }

  supTable_DetailEntPro(idC: any) {
    const index = this.detailentretienProgrammes.findIndex(id => id.id === idC);
    if (index !== -1) {
      // this.details.splice(index, 1);
      this.detailentretienProgrammes.find(item => item.id == idC).isDeleted = true;

      const result = this.detailentretienProgrammes.filter(item => item.isDeleted === false);
      this.dataSourceProgramme.data = result;
      
    }
  }



  loadOneEntretien() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.isLoadingResults = true;
      this.entretienService.getOneEntretiens(this.id).subscribe(reponse => {
        this.OneEntretien = reponse;

        this.detailEntretien = reponse.details;
        this.dataSourceDetailTravaux.data = this.detailEntretien;

        this.detailentretienProgrammes = reponse.entretienProgrammes;
        this.dataSourceProgramme.data = this.detailentretienProgrammes;
   
        this.EntretienForm.controls['vehiculeId'].setValue(this.OneEntretien.vehiculeId);
        this.EntretienForm.controls['fournisseurId'].setValue(this.OneEntretien.fournisseurId);
        this.EntretienForm.controls['dateEntretien'].setValue(this.OneEntretien.dateEntretien);
        this.EntretienForm.controls['kilometrage'].setValue(this.OneEntretien.kilometrage);

        this.EntretienForm.controls['objetEntretien'].setValue(this.OneEntretien.objetEntretien);
        this.EntretienForm.controls['profomaUrl'].setValue(this.OneEntretien.profomaUrl);
        this.EntretienForm.controls['bonCommandeUrl'].setValue(this.OneEntretien.bonCommandeUrl);
        this.EntretienForm.controls['factureUrl'].setValue(this.OneEntretien.factureUrl);
        this.EntretienForm.controls['assuranceUrl'].setValue(this.OneEntretien.assuranceUrl);
          this.EntretienForm.controls['comment'].setValue(this.OneEntretien.comment);
        this.isLoadingResults = false;
       
      });
    }
  }


}



export interface PeriodicElement {
  number:number;
  name: string;
  position: string;
  weight: string;
  symbol: string;
  etat: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {number:1, position: 'Cylindre de roue AR', name: '2', weight: '25000', symbol: '50000', etat: 'Parc',},
  {number:2, position: 'Jeu de garniture AR', name: '1', weight: '60000', symbol: '60000', etat: 'Parc'},
  {number:3, position: 'Tambou de frein AR', name: '2', weight: '90000', symbol: '180000', etat: 'Parc'},
  {number:4, position: 'Main d\'oeuvre (Heures)', name: '6', weight: '5000', symbol: '30000', etat: 'Parc'},
  
];


export interface PeriodicElementPro {
  nameMat: string;
  positionMat: string;
  prochainMat: string;
  repectMat: string;
  executeMat: string;
  numberMat:number;
} 


const ELEMENTDATAPro: PeriodicElementPro[] = [
  {numberMat:1,positionMat: '2039 HF 01', nameMat: 'Changement de Pneus', repectMat: '14 Mois', prochainMat: '60000 Km', executeMat: 'En attente'},
  {numberMat:2,positionMat: '2039 HF 01', nameMat: 'Vidange (Huile Moteur, Filtre air, Filtre à huile) Citadine', repectMat: '6 Mois', prochainMat: '3000 Km', executeMat: 'En attente'},
];

