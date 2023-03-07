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
  selector: 'app-marque-modele-liste',
  templateUrl: './marque-modele-liste.component.html',
  styleUrls: ['./marque-modele-liste.component.scss'],
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
export class MarqueModeleListeComponent implements OnInit {
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
listeMarque: any = [];
listeModele: any = [];
  displayedColumns: string[] = ['number','Marque', 'action'];
  dataSource: MatTableDataSource<any>;

  displayedColumnsModele: string[] = ['number','Model', 'action'];
  dataSourceModele: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginatorModele: MatPaginator;
  @ViewChild(MatSort) sortModele: MatSort;

  Marque: any = [];
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
    this.initFormModele();
    this.dataSource = new MatTableDataSource(this.Marque);
    this.dataSourceModele = new MatTableDataSource(this.Modele);
   
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.TlisteMarque();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceModele.paginator = this.paginatorModele;
    this.dataSourceModele.sort = this.sortModele;
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

  TlisteMarque() {
    this.vehiculeService.listeMarque().subscribe(reponse => {
      this.Marque = reponse;
      this.listeMarque = this.Marque.results;
      this.dataSource.data = this.listeMarque;
      this.isLoadingResults = false;
    });
  }

  TlisteMarqueModele(MarqueID) {
    this.ModelemodifsLoadingResults = true;
    this.vehiculeService.getMarqueModelebyMarqueId(MarqueID).subscribe(reponse => {
      this.Modele = reponse;
      this.listeModele= this.Modele.results;
      this.dataSourceModele.data = this.listeModele;
      this.ModelemodifsLoadingResults = false;
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
        MarqueID: [''],
        ModelemarqueID: [''],
        Modeledesignation: [''], 
      });
    }


    onSubmitForm(f) {
      this.isLoadingResults = true;
      const iD = JSON.parse(localStorage.getItem('currentUser'));
      const varID = iD.ID;
      const FormDataVeh = new FormData();
      FormDataVeh.append('ID', f.MarqueID);
      FormDataVeh.append('designation', f.designation);

      if (f.MarqueID != '') {
        //Nouveau;
        this.vehiculeService.updateMarque(FormDataVeh).subscribe(result => {
          if (result.success==true) { 
            this.reponse = result;
          this.toastr.success(result.message);
          this.imagePreview='';
          this.initForm();
          this.TlisteMarque();
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
        this.vehiculeService.saveMarque(FormDataVeh).subscribe(result => {
          if (result.success==true) { 
            this.reponse = result;
          this.toastr.success(result.message);
          this.imagePreview='';
          this.initForm();
          this.TlisteMarque();
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
      this.vehiculeService.getMarquebyId(ID).subscribe(reponse => {
      this.OneItem = reponse;  
      this.vehiculeForm.controls['MarqueID'].setValue(this.OneItem.results[0].ID);
        this.vehiculeForm.controls['designation'].setValue(this.OneItem.results[0].designation);
        this.ModifsLoadingResults = false;
      });
  
  }
  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  ItemSupprime(id) {
    this.IDSuppression = id;
  }
  

  // Supprime l'enregistrement
  supprime() {
    this.vehiculeService.deleteMarque(this.IDSuppression).subscribe(reponse => {
      this.toastr.success("Suppression terminée avec succès ! ");
      this.TlisteMarque();
    }, (ret) => {
      this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
    });
  }


  OpenAddModel(ID,MarqueName) {
       this.ModelemodifsLoadingResults = true;
        this.addMarqueName=MarqueName;
        this.modeleForm.controls['ModelemarqueID'].setValue(ID);
        this.TlisteMarqueModele(ID);
  
  }


//////////////MODELE///////////////////////////
    initFormModele() {
      this.modeleForm = this.formBuilder.group({
        Modeledesignation: ['', Validators.required],
        ModelemarqueID: ['', Validators.required],
        ModeleID: [''],
       
      });
    }

    onSubmitFormModele(f) {
      this.ModelemodifsLoadingResults = true;
      const FormDataModele= new FormData();
      FormDataModele.append('ID', f.ModeleID);
      FormDataModele.append('marque_ID', f.ModelemarqueID);
      FormDataModele.append('designation', f.Modeledesignation);

      if (f.ModeleID != '') {
        //Nouveau;
        this.vehiculeService.updateModeleMarque(FormDataModele).subscribe(result => {
          if (result.success==true) { 
            this.reponse = result;
          this.toastr.success(result.message);
          this.modeleForm.controls['ModeleID'].setValue('');
          this.modeleForm.controls['Modeledesignation'].setValue('');
          this.TlisteMarqueModele(f.ModelemarqueID);
         
          }
          else{
            this.toastr.error(result.message);
            this.ModelemodifsLoadingResults = false;
          }
          
        }, (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        });
      }
      else{
        this.vehiculeService.saveModeleMarque(FormDataModele).subscribe(result => {
          if (result.success==true) { 
            this.reponse = result;
          this.toastr.success(result.message);
          this.modeleForm.controls['ModeleID'].setValue('');
          this.modeleForm.controls['Modeledesignation'].setValue('');
          this.TlisteMarqueModele(f.ModelemarqueID);
         
          }
          else{
            this.toastr.error(result.message);
            this.ModelemodifsLoadingResults = false;
          }
          
        }, (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          this.ModelemodifsLoadingResults = false;
        }); 
      }
    
  
    }



  getNavigation(link, id){
    if(id === ''){
        this.router.navigate([link]);
    } else {
        this.router.navigate([link + '/' + id]);
    }
}






loadOneModele(model_ID,ModeleName) {
this.ModifsLoadingResults = true;
this.modeleForm.controls['ModeleID'].setValue(model_ID);
this.modeleForm.controls['Modeledesignation'].setValue(ModeleName);
this.ModifsLoadingResults = false;
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
  supprimeModele(IDmodel,marqueID) {
    this.vehiculeService.deleteModeleMarque(IDmodel).subscribe(reponse => {
      this.toastr.success("Suppression terminée avec succès ! ");
      this.TlisteMarqueModele(marqueID);
    }, (ret) => {
      this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
    });
  }

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
