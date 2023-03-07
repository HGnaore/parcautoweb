import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/config.service';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { Location } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DirectionService } from 'src/app/services/trombino/direction.service';
import { PersonnelService } from 'src/app/services/trombino/personnel.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-infovehicule-edition',
  templateUrl: './infovehicule-edition.component.html',
  styleUrls: ['./infovehicule-edition.component.scss'],
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
export class InfovehiculeEditionComponent implements OnInit {
  ProfilID = JSON.parse(localStorage.getItem('currentUser'));
  UserProfilID: any;

id: string;
selecetdFile : any;
imagePreview: any;
selecetdFileDoc: any;
MediaFIlePreview: any;
reader: any;
listemodelebymarques: any = [];
listeFonction:any = [];
listemarques: any = [];
vehiculeForm: FormGroup;
documentForm: FormGroup;
isLoadingResults = true;
OneVehicule: any = [];
reponse: any;
imatriculation: any;
modele: any;
marque: any;
hidden = false;
AficherImgx= false;
public listDirection: any = [];
public listPersonnel: any = [];
public onePersonnel: any = [];
PersoneImage: any;
PersoneName: any;
Dirlibelle;
dirID: any;
Document: any = [];
listeDocument: any = [];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
displayedColumns: string[] = ['number','lienPhoto','description', 'action'];
dataSource: MatTableDataSource<any>;
IDSuppression: any;
  urlPhoto: string;
  constructor(
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private vehiculeService: VehiculeService,
    private directionService: DirectionService,
    private personnelService: PersonnelService,
  ) { 
    this.dataSource = new MatTableDataSource(this.Document);
    this.id = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.initFormDocument();
  }

  ngOnInit(): void {
    this.UserProfilID = this.ProfilID.prof_id;
    this.MenuTraitementVehicule();
    this.loadOneVehiculeInfo();
    this.loadMarques();
    this.loadFonction();
    this.loadDirections();
    this.TlisteAddDocument(this.id);
   
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
      //this.isLoadingResults = false;
      this.vehiculeForm = this.formBuilder.group({
        imatriculation: [''],
        marque_ID: [''],
        modele_ID: [''], 
        typeacquisition: [''],
        fonction_ID:[''],
        lienPhoto: [''],
        Dir_libelle: [''],
        Dir_NomPrenAgent: [''],
        Ent_PieceJointe: [''],
        Dir_id: [''],
        Agent_id: [''],
        comment: [''],
      });
    }

    initFormDocument() {
      //this.isLoadingResults = false;
      this.documentForm = this.formBuilder.group({
        Description: [''],
        MediaFIle: [''],
      });
    }

    
    loadOneVehiculeInfo() {
      this.isLoadingResults = true;
      if (this.id !== '0') {
        this.isLoadingResults = true;
        this.vehiculeService.getOneVehicule(this.id).subscribe(reponse => {
          this.OneVehicule = reponse;   
          this.imatriculation = this.OneVehicule.results[0].imatriculation;
          this.modele= this.OneVehicule.results[0].modele
          this.marque= this.OneVehicule.results[0].marque; 
          this.imagePreview = this.configService.urlgRTI+this.OneVehicule.results[0].lienPhoto;
          this.vehiculeForm.controls['imatriculation'].setValue(this.OneVehicule.results[0].imatriculation);
          this.loadModelByMarques(this.OneVehicule.results[0].marque_ID);
          this.vehiculeForm.controls['marque_ID'].setValue(this.OneVehicule.results[0].marque_ID);
          this.vehiculeForm.controls['modele_ID'].setValue(this.OneVehicule.results[0].modele_ID);
         this.vehiculeForm.controls['typeacquisition'].setValue(this.OneVehicule.results[0].typeacquisition);
         this.vehiculeForm.controls['fonction_ID'].setValue(this.OneVehicule.results[0].fonctionvehicule_ID);
         this.vehiculeForm.controls['Dir_id'].setValue(this.OneVehicule.results[0].direction_ID);
         this.loadPersonnelByDirections(this.OneVehicule.results[0].direction_ID);
         this.vehiculeForm.controls['Agent_id'].setValue(this.OneVehicule.results[0].personnel_ID);
         this.loadPersonnelByID(this.OneVehicule.results[0].personnel_ID);
         this.vehiculeForm.controls['Dir_NomPrenAgent'].setValue(this.OneVehicule.results[0].personnel_nom);
         
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
          this.imagePreview='';
          /*this.initForm();
          this.getNavigation('admin/admin/vehiculeList','');*/
         
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

  MenuTraitementVehicule(){
    this.configService.ListMenuVehicule=true;
    environment.SelectIDvehicule=this.id;
    environment.SelectUserProfil = this.UserProfilID;
 
  }

  getNavigation(link, id){
    if(id === ''){
        this.router.navigate([link]);
    } else {
        this.router.navigate([link + '/' + id]);
    }
}


loadDirections() {
  this.directionService.readDirection().subscribe(
    dirData => {
      this.listDirection = dirData;
      /*console.log(this.listDirection);*/
    }
  );
}
public changeDirection(event) {
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
  this.AficherImgx= false;
   /* this.hidden = false;
     */
}

UpdateSelectedPersonnelValue(lien) {
//  const selectEl = event.target;
 // const imgx = selectEl.options[selectEl.selectedIndex].getAttribute('person-image');
 // const imgxName = selectEl.options[selectEl.selectedIndex].getAttribute('person-name');
  this.PersoneImage = lien;
  this.vehiculeForm.controls['Ent_PieceJointe'].setValue(lien);
  //this.vehiculeForm.controls['Dir_NomPrenAgent'].setValue(imgxName);
  //this.PersoneName = imgxName;
 // this.hidden = true;
 // this.AficherImgx= false;
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

  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  ItemSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.vehiculeService.deleteMedia(this.IDSuppression).subscribe(reponse => {
      this.toastr.success("Suppression terminée avec succès ! ");
      this.TlisteAddDocument(this.id);
    }, (ret) => {
      this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
    });
  }


}
