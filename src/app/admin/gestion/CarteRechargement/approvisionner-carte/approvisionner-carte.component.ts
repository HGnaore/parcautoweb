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
  selector: 'app-approvisionner-carte',
  templateUrl: './approvisionner-carte.component.html',
  styleUrls: ['./approvisionner-carte.component.scss'],
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

export class ApprovisionnerCarteComponent implements OnInit {
  displayedColumnsCarte: string[] = ['position','vehicule','energie','direction', 'name','repect', 'action'];
  dataSourceCarte = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  /*/////DELETE CONFIRMATION///////*/
  public popoverTitle: string = 'AVERTISSEMENT';
  public popoverMessage: string = 'Voulez-vous vraiment supprimer cette ligne?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  /*/////END DELETE CONFIRMATION///////*/

IDVehicule: string;
selecetdFile : any;
imagePreview: any;
reader: any;
listemodelebymarques: any = [];
listemarques: any = [];
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
listeEnergie: any = [];
listeModele: any = [];
displayedColumns: string[] = ['number','datecreation','DirectionDemandeuse','activité','objet','Datedebut', 'action'];
dataSource: MatTableDataSource<any>;

displayedColumnsModele: string[] = ['number','Model', 'action'];
dataSourceModele: MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

@ViewChild(MatPaginator) paginatorModele: MatPaginator;
@ViewChild(MatSort) sortModele: MatSort;

Energie: any = [];
Modele: any = [];
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
  this.dataSource = new MatTableDataSource(this.Energie);
  this.dataSourceModele = new MatTableDataSource(this.Modele);
 
}

ngOnInit(): void {}

ngAfterViewInit() {
  this.TlisteEnergie();
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.dataSourceModele.paginator = this.paginatorModele;
  this.dataSourceModele.sort = this.sortModele;
  this.dataSourceCarte.paginator = this.paginator;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  this.dataSourceModele.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
  if (this.dataSourceModele.paginator) {
    this.dataSourceModele.paginator.firstPage();
  }
}

TlisteEnergie() {
  this.vehiculeService.listeEnergie().subscribe(reponse => {
    this.Energie = reponse;
    this.listeEnergie = this.Energie.results;
    this.dataSource.data = this.listeEnergie;
    this.isLoadingResults = false;
  });
}

/*
  loadModelByMarques(Maqid) {
    this.vehiculeService.getMarqueModelebyMarqueId(Maqid).subscribe(reponse => {
      this.listemodelebymarques = reponse;
     
      });
  } 

  public changeMarque(event) {
    this.loadModelByMarques(event);
  }
*/

  initForm() {
    this.vehiculeForm = this.formBuilder.group({
     designation: ['', Validators.required],
      EnergieID: [''],
      prix: ['', Validators.required],
      dateprix: ['', Validators.required],
    });
  }


  onSubmitForm(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem('currentUser'));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append('ID', f.EnergieID);
    FormDataVeh.append('designation', f.designation);
    FormDataVeh.append('prix', f.prix);
    FormDataVeh.append('dateprix', f.dateprix);
    FormDataVeh.append('authentification_ID', varID);
    if (f.EnergieID != '') {
      //Nouveau;
      this.vehiculeService.updateEnergie(FormDataVeh).subscribe(result => {
        if (result.success==true) { 
          this.reponse = result;
        this.toastr.success(result.message);
        this.imagePreview='';
        this.initForm();
        this.TlisteEnergie();
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
      this.vehiculeService.saveEnergie(FormDataVeh).subscribe(result => {
        if (result.success==true) { 
          this.reponse = result;
        this.toastr.success(result.message);
        this.imagePreview='';
        this.initForm();
        this.TlisteEnergie();
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

  
loadOne(ID) {
  this.ModifsLoadingResults = true;
    this.OuvrirForm();
    this.vehiculeService.getEnergiebyId(ID).subscribe(reponse => {
    this.OneItem = reponse;  
      this.vehiculeForm.controls['EnergieID'].setValue(this.OneItem.results[0].ID);
      this.vehiculeForm.controls['designation'].setValue(this.OneItem.results[0].designation);
      this.vehiculeForm.controls['prix'].setValue(this.OneItem.results[0].prix);
      this.vehiculeForm.controls['dateprix'].setValue(this.OneItem.results[0].dateprix);
      this.ModifsLoadingResults = false;
    });

}
// reccuper l'id à supprimer lors de l'ouverture du modal de question
ItemSupprime(id) {
  this.IDSuppression = id;
}


// Supprime l'enregistrement
supprime() {
  this.vehiculeService.deleteEnergie(this.IDSuppression).subscribe(reponse => {
    this.toastr.success("Suppression terminée avec succès ! ");
    this.TlisteEnergie();
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





export interface PeriodicElement {
  name: string;
  position: string;
  prochain: string;
  repect: string;
  energie: string;
  vehicule:string;
  direction:string;
} 

const ELEMENT_DATA: PeriodicElement[] = [
  {direction:'D_INFORMATION', vehicule:'45585', position: '23/12/2021', name: 'En Service', repect: '', prochain: '19500000', energie: '50000'},
  {direction:'RADIO_CI',vehicule:'45586', position: '23/11/2021', name: 'Perdu', repect: '28/11/2021', prochain: '3250000', energie: '50000'},
 ];