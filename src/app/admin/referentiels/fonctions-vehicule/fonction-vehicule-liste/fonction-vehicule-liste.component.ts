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
@Component({
  selector: 'app-fonction-vehicule-liste',
  templateUrl: './fonction-vehicule-liste.component.html',
  styleUrls: ['./fonction-vehicule-liste.component.scss'],
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
export class FonctionVehiculeListeComponent implements OnInit {

 
   /*/////DELETE CONFIRMATION///////*/
   public popoverTitle: string = 'AVERTISSEMENT';
   public popoverMessage: string = 'Voulez-vous vraiment supprimer cette ligne?';
   public confirmClicked: boolean = false;
   public cancelClicked: boolean = false;
   /*/////END DELETE CONFIRMATION///////*/

IDVehicule: string;
vehiculeForm: FormGroup;
modeleForm: FormGroup;
isLoadingResults = true;
ModifsLoadingResults= false;
ModelemodifsLoadingResults= false;
OneVehicule: any = [];
listeenergies: any = [];
listeusages: any = [];
reponse: any;
imatriculation: any;
OneItem: any = [];
modele: any;
marque: any;
hidden = true;
ActionClose= true;
ActionOpen= false; 
listeAssureur: any = [];
listeModele: any = [];
 displayedColumns: string[] = ['number','fonction', 'action'];
 dataSource: MatTableDataSource<any>;


 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;


 Assureur: any = [];
 IDSuppression: any;
 addMarqueName: any;

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
   this.dataSource = new MatTableDataSource(this.Assureur);
  
 }

 ngOnInit(): void {}

 ngAfterViewInit() {
   this.TlisteFonction();
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

 TlisteFonction() {
   this.vehiculeService.listFoction().subscribe(reponse => {
     this.Assureur = reponse;
     this.listeAssureur = this.Assureur.results;
     this.dataSource.data = this.listeAssureur;
     this.isLoadingResults = false;
   });
 }



   initForm() {
     this.vehiculeForm = this.formBuilder.group({
      fonction: ['', Validators.required],
      fonctionID: [''],
 
     });
   }


   onSubmitForm(f) {
     this.isLoadingResults = true;
     const iD = JSON.parse(localStorage.getItem('currentUser'));
     const varID = iD.ID;
     const FormDataVeh = new FormData();
     FormDataVeh.append('ID', f.fonctionID);
     FormDataVeh.append('fonction', f.fonction);
     FormDataVeh.append('authentification_ID', varID);
     if (f.fonctionID != '') {
       //Nouveau;
       this.vehiculeService.updateFoction(FormDataVeh).subscribe(result => {
         if (result.success==true) { 
           this.reponse = result;
         this.toastr.success(result.message);
         this.initForm();
         this.TlisteFonction();
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
       this.vehiculeService.saveFoction(FormDataVeh).subscribe(result => {
         if (result.success==true) { 
           this.reponse = result;
         this.toastr.success(result.message);
         this.initForm();
         this.TlisteFonction();        
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

   
 loadOne(ID) {
   this.ModifsLoadingResults = true;
     this.OuvrirForm();
     this.vehiculeService.getFoctionbyId(ID).subscribe(reponse => {
     this.OneItem = reponse;  
       this.vehiculeForm.controls['fonctionID'].setValue(this.OneItem.results[0].ID);
       this.vehiculeForm.controls['fonction'].setValue(this.OneItem.results[0].fonction);
       this.ModifsLoadingResults = false;
     });
 
 }
 // reccuper l'id à supprimer lors de l'ouverture du modal de question
 ItemSupprime(id) {
   this.IDSuppression = id;
 }
  

 // Supprime l'enregistrement
 supprime() {
   this.vehiculeService.deleteFoction(this.IDSuppression).subscribe(reponse => {
     this.toastr.success("Suppression terminée avec succès ! ");
     this.TlisteFonction();
   }, (ret) => {
     this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
   });
 }





//////////////MODELE///////////////////////////



 getNavigation(link, id){
   if(id === ''){
       this.router.navigate([link]);
   } else {
       this.router.navigate([link + '/' + id]);
   }
}



 actionClose(f){
   if (f!=1) {
    
     this.FermerForm();
   } else {
    
     this.OuvrirForm();
   }

 }

 // reccuper l'id à supprimer lors de l'ouverture du modal de questio
 

 // Supprime l'enregistrement
/* supprimeModele(IDmodel,marqueID) {
   this.vehiculeService.deleteModeleMarque(IDmodel).subscribe(reponse => {
     this.toastr.success("Suppression terminée avec succès ! ");
     this.TlisteMarqueModele(marqueID);
   }, (ret) => {
     this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
   });
 }*/

OuvrirForm(){
 this.initForm();
this.hidden=false;
this.ActionClose= false;
this.ActionOpen= true;
}

FermerForm(){
 this.initForm();
 this.hidden=true;
 this.ActionClose= true;
 this.ActionOpen= false;
 }

}
