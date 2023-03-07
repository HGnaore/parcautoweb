import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-vehicule-list',
  templateUrl: './vehicule-list.component.html',
  styleUrls: ['./vehicule-list.component.scss'],
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
export class VehiculeListComponent implements AfterViewInit, OnInit {
  UserID:any = JSON.parse(localStorage.getItem('currentUser'));
  ProfilID = JSON.parse(localStorage.getItem('currentUser'));
  UserProfilID: any; 
  MyUserProfilID: any;
  selecetdFile : File;
imagePreview: any;
listemodelebymarques: any = [];
listemarques: any = [];
  Vehicules: any = [];v
  vehiculeForm: FormGroup;
  listeVehicules: any = [];
  displayedColumns: string[] = ['number','lienPhoto','immatriculation', 'modele', 'typeacquisition','personnel_nom', 'action'];
  dataSource: MatTableDataSource<any>;
  IDSuppression = '';
  isLoadingResults = true;
  reponse: any;
  enModif = false;
  reader: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  urlPhoto: string;
  ListMenuVehicule: boolean;
  id: string;
  constructor(
    private vehiculeService: VehiculeService,
    private formBuilder: FormBuilder,
    private configService: ConfigService,
    private location: Location,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource(this.Vehicules);
    this. activeMenu();
    this.initForm();
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.UserProfilID = this.ProfilID.prof_id;
    this.MenuTraitementVehicule();
    this.loadMarques();
    this.TlisteVehicule();
  }

  activeMenu(){
    this.configService.OngletConsultation = false;
    this.configService.OngletModification = false;
    this.configService.OngletTraitement = false;
  }

  TlisteVehicule() {
    this.vehiculeService.listeVehicule().subscribe(reponse => {
      this.Vehicules = reponse;
      this.listeVehicules = this.Vehicules.results;
      this.dataSource.data = this.listeVehicules;
      this.isLoadingResults = false;
    this.urlPhoto=this.configService.urlgRTI;
    });
  }

  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  ItemSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.vehiculeService.deleteVehicule(this.IDSuppression).subscribe(reponse => {
      this.toastr.success("Suppression terminée avec succès ! ");
      this.TlisteVehicule();
    }, (ret) => {
      this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
    });
  }

  ngAfterViewInit() {
   // this.TlisteVehicule();
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



    //////////////
    onFileUpload(event){
      this.selecetdFile = event.target.files[0];
      this.reader = new FileReader();
      this.reader.onload = () => {
      this.imagePreview = this.reader.result;
      };
      this.reader.readAsDataURL(this.selecetdFile);
     /* this.vehiculeForm.get('lienPhoto').setValue(this.selecetdFile);*/
      }

   /*   onFileSelect_fact_justi(event) {
        if (event.target.files.length > 0) {
          const fileannx = event.target.files[0];
          this.ValidedForm.get('Aff_justicatif').setValue(fileannx);
        }
      }*/
 
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
        imatriculation: ['', Validators.required],
        marque_ID: ['', Validators.required],
        modele_ID: ['', Validators.required],
        typeacquisition: ['', Validators.required],
        lienPhoto: [''],
        kmachat: ['', Validators.required],
       
      });
    }


    onSubmitForm(f) {
      this.isLoadingResults = true;
      const iD = JSON.parse(localStorage.getItem('currentUser'));
      const varID = iD.ID;
      const FormDataVeh = new FormData();
      FormDataVeh.append('imatriculation', f.imatriculation);
      FormDataVeh.append('marque_ID', f.marque_ID);
      FormDataVeh.append('modele_ID', f.modele_ID);
      FormDataVeh.append('typeacquisition', f.typeacquisition);
      FormDataVeh.append('lienPhoto', this.selecetdFile);
      FormDataVeh.append('authentification_ID', varID);
      
        //Nouveau;
        this.vehiculeService.saveVehicule(FormDataVeh).subscribe(result => {
          if (result.success==true) { 
            this.reponse = result;
          this.toastr.success(result.message);
          this.imagePreview='';
          this.initForm();
          this.TlisteVehicule();      
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

    MenuTraitementVehicule(){

      this.configService.ListMenuVehicule=true;
      environment.SelectIDvehicule=this.id;
      environment.SelectUserProfil = this.UserProfilID;
      this.MyUserProfilID = environment.SelectUserProfil;
    
      //
    }


}


