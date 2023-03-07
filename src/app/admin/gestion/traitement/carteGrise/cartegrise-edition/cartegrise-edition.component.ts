import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/config.service';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { Location } from '@angular/common';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cartegrise-edition',
  templateUrl: './cartegrise-edition.component.html',
  styleUrls: ['./cartegrise-edition.component.scss'],
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
export class CartegriseEditionComponent implements OnInit {
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
OneVehicule: any = [];
OneCarteGrise: any = [];
listeenergies: any = [];
listeusages: any = [];
reponse: any;
imatriculation: any;
modele: any;
marque: any;
VerifCarteGrise: any;
IDcarteGrise: any;
hidden = false;
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
  }

  ngOnInit(): void {
    this.UserProfilID = this.ProfilID.prof_id;
    this.MenuTraitementVehicule();
    this.loadOneVehiculeInfo();
    this.loadMarques();
    this.loadEnergies();
    this.loadUsages();
    this.loadOneCarteGrise(this.IDVehicule);
   
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

    loadOneVehiculeInfo() {
      this.isLoadingResults = true;
      if (this.IDVehicule !== '0') {
        this.isLoadingResults = true;
        this.vehiculeService.getOneVehicule(this.IDVehicule).subscribe(reponse => {
          this.OneVehicule = reponse;   
          this.imatriculation = this.OneVehicule.results[0].imatriculation;
          this.modele= this.OneVehicule.results[0].modele
          this.marque= this.OneVehicule.results[0].marque; 
         /* this.imagePreview = this.configService.urlgRTI+this.OneVehicule.results[0].lienPhoto;*/
          
          this.vehiculeForm.controls['modele'].setValue(this.OneVehicule.results[0].modele);

         
     
          this.isLoadingResults = false;
         // console.log(reponse);
        });
      }
    }


    loadOneCarteGrise(VehiculeID) {
      this.isLoadingResults = true;
        this.vehiculeService.getCartegrisebyvehiculeId(VehiculeID).subscribe(reponse => {
          this.OneCarteGrise = reponse; 
          this.VerifCarteGrise= this.OneCarteGrise.results.total;
          this.vehiculeForm.controls['numero'].setValue(this.OneCarteGrise.results.resultat[0].numero);
          this.vehiculeForm.controls['numchassis'].setValue(this.OneCarteGrise.results.resultat[0].numchassis);
          this.vehiculeForm.controls['datemiseenservice'].setValue(this.OneCarteGrise.results.resultat[0].datemiseenservice);
          this.vehiculeForm.controls['dateedition'].setValue(this.OneCarteGrise.results.resultat[0].dateedition);
          this.vehiculeForm.controls['codeproprietaire'].setValue(this.OneCarteGrise.results.resultat[0].codeproprietaire);
          this.vehiculeForm.controls['genre'].setValue(this.OneCarteGrise.results.resultat[0].genre);
          this.vehiculeForm.controls['couleur'].setValue(this.OneCarteGrise.results.resultat[0].couleur);
          this.vehiculeForm.controls['energie_ID'].setValue(this.OneCarteGrise.results.resultat[0].energie_ID);
          this.vehiculeForm.controls['usage_ID'].setValue(this.OneCarteGrise.results.resultat[0].usage_ID);
          this.vehiculeForm.controls['carrosserie'].setValue(this.OneCarteGrise.results.resultat[0].carrosserie);
          this.vehiculeForm.controls['nbreplace'].setValue(this.OneCarteGrise.results.resultat[0].nbreplace);
          this.vehiculeForm.controls['typetechnique'].setValue(this.OneCarteGrise.results.resultat[0].typetechnique);
          this.vehiculeForm.controls['ptac'].setValue(this.OneCarteGrise.results.resultat[0].ptac);
          this.vehiculeForm.controls['puissance'].setValue(this.OneCarteGrise.results.resultat[0].puissance);
          this.vehiculeForm.controls['poidsvide'].setValue(this.OneCarteGrise.results.resultat[0].poidsvide);

          this.vehiculeForm.controls['nbreessieux'].setValue(this.OneCarteGrise.results.resultat[0].nbreessieux);
          this.vehiculeForm.controls['cylindre'].setValue(this.OneCarteGrise.results.resultat[0].cylindre);
          this.vehiculeForm.controls['chargeutile'].setValue(this.OneCarteGrise.results.resultat[0].chargeutile);
          this.IDcarteGrise = this.OneCarteGrise.results.resultat[0].ID;
          
          this.imagePreview = this.configService.urlgRTI+this.OneCarteGrise.results.resultat[0].lienPhoto;

          this.isLoadingResults = false;
        });
    
    }

    onSubmitForm(f) {
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
      FormDataVeh.append('vehicule_ID', this.IDVehicule);
      FormDataVeh.append('date_creation', f.date_creation);
      FormDataVeh.append('date_modification', f.date_modification);
      FormDataVeh.append('ID', this.IDcarteGrise);
    
        //Update;
        if (this.VerifCarteGrise != '0') {
        this.vehiculeService.updateCartegrise(FormDataVeh).subscribe(result => {
          if (result.success==true) { 
            this.reponse = result;
          this.toastr.success(result.message);
         // this.imagePreview='';
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
          this.imagePreview='';
          this.initForm();
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

}
