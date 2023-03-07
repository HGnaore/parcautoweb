import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/config.service';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visitetechnique-edition',
  templateUrl: './visitetechnique-edition.component.html',
  styleUrls: ['./visitetechnique-edition.component.scss'],
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
export class VisitetechniqueEditionComponent implements OnInit {
  ProfilID = JSON.parse(localStorage.getItem('currentUser'));
  UserProfilID: any;
IDVehicule: string;
selecetdFile : any;
imagePreview: any;
reader: any;
listemodelebymarques: any = [];
listemarques: any = [];
vehiculeForm: FormGroup;
isLoadingResults = true;
ModifsLoadingResults= false;
OneVehicule: any = [];
listeenergies: any = [];
listeusages: any = [];
reponse: any;
imatriculation: any;
OneVisite: any = [];
modele: any;
marque: any;
hidden = true;
ActionClose= true;
ActionOpen= false; 
addOrUpdate= true;
  listeVehicules: any = [];
  
  displayedColumns: string[] = ['number','datevisite','lieu', 'montantvisite','numerovignette','montantvignette','dateexpiration','rappel', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Vehicules: any = [];
  IDSuppression: any;
  constructor(
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private vehiculeService: VehiculeService,
  ) { 
    this.IDVehicule = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.dataSource = new MatTableDataSource(this.Vehicules);
  }

  ngOnInit(): void {
    this.UserProfilID = this.ProfilID.prof_id;
    this.MenuTraitementVehicule();
    this.loadOneVehiculeInfo();
   /* this.loadMarques();
    this.loadEnergies();
    this.loadUsages();
    this.loadOneCarteGrise(this.IDVehicule);*/
   
  }

  ngAfterViewInit() {
    this.TlisteVisteVehicule();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  TlisteVisteVehicule() {
    this.vehiculeService.getOneVisitebyVehiculeId(this.IDVehicule).subscribe(reponse => {
      this.Vehicules = reponse;
      this.listeVehicules = this.Vehicules.results.resultat;
      this.dataSource.data = this.listeVehicules;
      this.isLoadingResults = false;
    });
  }

    //////////////
    onFileUpload(event){
      this.selecetdFile = event.target.files[0];
      this.reader = new FileReader();
      this.reader.onload = () => {
      this.imagePreview = this.reader.result;
      };
      this.reader.readAsDataURL(this.selecetdFile);
      }

    ///////////////
    loadMarques() {
      this.vehiculeService.listeMarque().subscribe(reponse => {
        this.listemarques = reponse;
        //this.isLoadingResults = false;
      });
    }

    loadModelByMarques(Maqid) {
      this.vehiculeService.getMarqueModelebyMarqueId(Maqid).subscribe(reponse => {
        this.listemodelebymarques = reponse;
       
     //   this.vehiculeLocationForm.controls['modeleId'].setValue(this.listemodelebymarques[0].id);
      });
    } 
  
    public changeMarque(event) {
      this.loadModelByMarques(event);
    }


    initForm() {
      //this.isLoadingResults = false;
      this.vehiculeForm = this.formBuilder.group({
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
        lienPhoto: [''],
        VehiculeVignetteID: [''],
       
      });
    }

    loadOneVehiculeInfo() {
      this.isLoadingResults = true;
      if (this.IDVehicule !== '0') {
        this.isLoadingResults = true;
        this.vehiculeService.getOneVehicule(this.IDVehicule).subscribe(reponse => {
          this.OneVehicule = reponse;   
          this.imatriculation = this.OneVehicule.results[0].imatriculation;
          this.modele= this.OneVehicule.results[0].modele
          this.marque= this.OneVehicule.results[0].marque; 
        
          this.isLoadingResults = false;
        });
      }
    }

  MenuTraitementVehicule(){
    this.configService.ListMenuVehicule=true;
    environment.SelectIDvehicule=this.IDVehicule;
    environment.SelectUserProfil = this.UserProfilID;
 
  }
    onSubmitForm(f) {
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
      FormDataVeh.append('vehicule_ID', this.IDVehicule);
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
    
  
    }



  loadOneVisiteVignette(VignetteID) {
    this.addOrUpdate= false;
    this.OuvrirForm();
      this.vehiculeService.getVisiteTechniquebyId(VignetteID).subscribe(reponse => {
      this.OneVisite = reponse;  
      this.vehiculeForm.controls['VehiculeVignetteID'].setValue(this.OneVisite.results.resultat[0].ID);
      this.imagePreview = this.configService.urlgRTI+this.OneVisite.results.resultat[0].lienPhoto;
        this.vehiculeForm.controls['montantvisite'].setValue(this.OneVisite.results.resultat[0].montantvisite);
        this.vehiculeForm.controls['cat'].setValue(this.OneVisite.results.resultat[0].cat);
       this.vehiculeForm.controls['kms'].setValue(this.OneVisite.results.resultat[0].kms);
        this.vehiculeForm.controls['stat'].setValue(this.OneVisite.results.resultat[0].stat);
        this.vehiculeForm.controls['datevisite'].setValue(this.OneVisite.results.resultat[0].datevisite);
        this.vehiculeForm.controls['dateexpiration'].setValue(this.OneVisite.results.resultat[0].dateexpiration);
        this.vehiculeForm.controls['rappel'].setValue(this.OneVisite.results.resultat[0].rappel);
        this.vehiculeForm.controls['observation'].setValue(this.OneVisite.results.resultat[0].observation);
        this.vehiculeForm.controls['montantvignette'].setValue(this.OneVisite.results.resultat[0].montantvignette);
        this.vehiculeForm.controls['numerovignette'].setValue(this.OneVisite.results.resultat[0].numerovignette);
        this.vehiculeForm.controls['ncc'].setValue(this.OneVisite.results.resultat[0].ncc);
        this.vehiculeForm.controls['lieu'].setValue(this.OneVisite.results.resultat[0].lieu);
        this.ModifsLoadingResults = false;
      });
  
  }


  getNavigation(link, id){
    if(id === ''){
        this.router.navigate([link]);
    } else {
        this.router.navigate([link + '/' + id]);
    }
}

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


  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  ItemSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.vehiculeService.deleteVisiteTechnique(this.IDSuppression).subscribe(reponse => {
      this.toastr.success("Suppression terminée avec succès ! ");
      this.TlisteVisteVehicule();
    }, (ret) => {
      this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
    });
  }

  actionClose(f){
    if (f!=1) {
     
      this.FermerForm();
    } else {
     
      this.OuvrirForm();
    }

  }



OuvrirForm(){
this.hidden=false;
this.ActionClose= false;
this.ActionOpen= true;
}

FermerForm(){
  this.hidden=true;
  this.ActionClose= true;
  this.ActionOpen= false;
  this.initForm();
  this.addOrUpdate= true;
  this.imagePreview='';
  }

}
