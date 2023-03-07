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
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { AssureurService } from 'src/app/services/assureur.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-assurence-edition',
  templateUrl: './assurence-edition.component.html',
  styleUrls: ['./assurence-edition.component.scss'],
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
export class AssurenceEditionComponent implements OnInit {
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
modele: any;
marque: any;
libFournisseur;
listeVehicules: any = [];
listeassureur: any = [];
OneAssurance: any = [];
hidden = true;
ActionClose= true;
ActionOpen= false;
addOrUpdate= true;
displayedColumns: string[] = ['number','assure','assueur','numpolice', 'datedebut', 'datefin','rappel', 'action'];
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
    private assureurService: AssureurService,
    
  ) { 
    this.IDVehicule = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.dataSource = new MatTableDataSource(this.Vehicules);
  }

  ngOnInit(): void {
    this.UserProfilID = this.ProfilID.prof_id;
    this.MenuTraitementVehicule();
    this.loadOneVehiculeInfo();
    this.loadAssureur();
  /*  this.loadMarques();
    this.loadEnergies();
    this.loadUsages();

    this.loadOneCarteGrise(this.IDVehicule);*/
  }

  ngAfterViewInit() {
    this.TlisteAssuranceVehicule();
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


  TlisteAssuranceVehicule() {
    this.vehiculeService.getOneAssurancebyVehiculeId(this.IDVehicule).subscribe(reponse => {
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

    loadOneVehiculeInfo() {
      this.isLoadingResults = true;
      if (this.IDVehicule !== '0') {
        this.isLoadingResults = true;
        this.vehiculeService.getOneVehicule(this.IDVehicule).subscribe(reponse => {
          this.OneVehicule = reponse;   
          this.imatriculation = this.OneVehicule.results[0].imatriculation;
          this.modele= this.OneVehicule.results[0].modele
         this.isLoadingResults = false;
         // console.log(reponse);
        });
      }
    }

    onSubmitForm(f) {
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
      FormDataVeh.append('vehicule_ID', this.IDVehicule);
      if (f.assure_ID != '') {
        //Nouveau;
        this.vehiculeService.updateAssurance(FormDataVeh).subscribe(result => {
          if (result.success==true) { 
            this.reponse = result;
          this.toastr.success(result.message);
          this.addOrUpdate= true;
          this.imagePreview='';
          this.initForm();
          this.TlisteAssuranceVehicule();
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
          this.imagePreview='';
          this.initForm();
          this.TlisteAssuranceVehicule();
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

    loadOneAssurance(AssurID) {
      this.addOrUpdate= false;
      this.OuvrirForm();
      this.ModifsLoadingResults = true;
        this.vehiculeService.getAssurancebyId(AssurID).subscribe(reponse => {
        this.OneAssurance = reponse;  
        this.vehiculeForm.controls['assure_ID'].setValue(this.OneAssurance.results.resultat[0].ID);
        this.imagePreview = this.configService.urlgRTI+this.OneAssurance.results.resultat[0].lienPhoto;
          this.vehiculeForm.controls['assure'].setValue(this.OneAssurance.results.resultat[0].assure);
          this.vehiculeForm.controls['adresse'].setValue(this.OneAssurance.results.resultat[0].adresse);
         this.vehiculeForm.controls['profession'].setValue(this.OneAssurance.results.resultat[0].profession);
          this.vehiculeForm.controls['numpolice'].setValue(this.OneAssurance.results.resultat[0].numpolice);
          this.vehiculeForm.controls['datedebut'].setValue(this.OneAssurance.results.resultat[0].datedebut);
          this.vehiculeForm.controls['datefin'].setValue(this.OneAssurance.results.resultat[0].datefin);
          this.vehiculeForm.controls['rappel'].setValue(this.OneAssurance.results.resultat[0].rappel);
          this.vehiculeForm.controls['assureur_ID'].setValue(this.OneAssurance.results.resultat[0].assureur_ID);
          this.ModifsLoadingResults = false;
        });
    
    }

  MenuTraitementVehicule(){
    this.configService.ListMenuVehicule=true;
    environment.SelectIDvehicule=this.IDVehicule;
    environment.SelectUserProfil = this.UserProfilID;
 
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
    this.vehiculeService.deleteAssurance(this.IDSuppression).subscribe(reponse => {
      this.toastr.success("Suppression terminée avec succès ! ");
      this.TlisteAssuranceVehicule();
    }, (ret) => {
      this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
    });
  }



  loadAssureur() {
    this.assureurService.listeAssureur().subscribe(reponse => {
      this.listeassureur = reponse;
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
