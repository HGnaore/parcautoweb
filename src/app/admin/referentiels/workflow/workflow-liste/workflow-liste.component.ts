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
import { WorkflowService } from 'src/app/services/workflow.service';
import { WorkflowappService } from 'src/app/services/workflowAppli/workflowapp.service';


@Component({
  selector: 'app-workflow-liste',
  templateUrl: './workflow-liste.component.html',
  styleUrls: ['./workflow-liste.component.scss'],
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
export class WorkflowListeComponent implements OnInit {

  /*/////DELETE CONFIRMATION///////*/
  public popoverTitle: string = 'AVERTISSEMENT';
  public popoverMessage: string = 'Voulez-vous vraiment supprimer cette ligne?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  /*/////END DELETE CONFIRMATION///////*/
isReadonly = false;
IDVehicule: string;
selecetdFile : any;
imagePreview: any;
reader: any;
listemodelebymarques: any = [];
listeAllWorkflow: any = [];
listeAllEtapeWorkflow: any = [];
listemarques: any = [];
tableData$: any = [];
vehiculeForm: FormGroup;
CircuitWorkFlowEtapeForm: FormGroup;
etapeForm: FormGroup;
validateurForm: FormGroup;
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
/*displayedColumns: string[] = ['number','Marque', 'action'];
dataSource: MatTableDataSource<any>;*/
displayedColumns: string[] = ['workf_id', 'workf_code', 'action'];
dataSource: MatTableDataSource<any>;


displayedColumnsCircuit: string[] = ['wcir_id', 'wcir_code','wcir_libelle','wcir_etape_libelle', 'action'];
dataSourceCircuit: MatTableDataSource<any>;


displayedColumnsModele: string[] = ['number','Model', 'action'];
dataSourceModele: MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

@ViewChild(MatPaginator) paginatorModele: MatPaginator;
@ViewChild(MatSort) sortModele: MatSort;

@ViewChild(MatPaginator) paginatorCircuit: MatPaginator;
@ViewChild(MatSort) sortCircuit: MatSort;


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
  private workflowService: WorkflowService,
  private WorkflowappService: WorkflowappService,
) { 
  this.IDVehicule = this.route.snapshot.paramMap.get('id');
  this.initForm();
  this.initCircuitWorkFlowEtapeForm();
  this.initFormetape();
  this.initFormValidateur();
  this.dataSource = new MatTableDataSource(this.tableData$);
  this.dataSourceCircuit = new MatTableDataSource(this.tableData$);
  this.dataSourceModele = new MatTableDataSource(this.Modele);
  
}

ngOnInit(): void {
  this.loadAllWorflow();
}

ngAfterViewInit() {
  this.loadDataTable();
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.dataSourceCircuit.paginator = this.paginatorCircuit;
  this.dataSourceCircuit.sort = this.sortCircuit;
  this.dataSourceModele.paginator = this.paginatorModele;
  this.dataSourceModele.sort = this.sortModele;


}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  this.dataSourceCircuit.filter = filterValue.trim().toLowerCase();
  this.dataSourceModele.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
  if (this.dataSourceModele.paginator) {
    this.dataSourceModele.paginator.firstPage();
  }
  if (this.dataSourceCircuit.paginator) {
    this.dataSourceCircuit.paginator.firstPage();
  }
}


loadDataTable() {
  this.workflowService.listeWorkFlow().subscribe(data => {
    this.tableData$ = data;
    this.dataSource.data = this.tableData$.results;
    this.loadAllEtapeWorflow(this.tableData$.results[0].workf_code);
    this.isLoadingResults = false;
  });
  this.loadDataTableListeCircuitEtape();
}


loadDataTableListeCircuitEtape() {
  this.workflowService.listeCircuitWorkFlow().subscribe(data => {
    this.tableData$ = data;
    this.dataSourceCircuit.data = this.tableData$.results;
    this.isLoadingResults = false;
  });
}

TlisteMarque() {
  this.vehiculeService.listeMarque().subscribe(reponse => {
    this.Marque = reponse;
    this.listeMarque = this.Marque.results;
    this.dataSource.data = this.listeMarque;
    this.isLoadingResults = false;
  });
}

TlisteMarqueModele(workflow_id) {
  this.ModelemodifsLoadingResults = true;
  this.vehiculeService.getModeleMarquebyId(workflow_id).subscribe(reponse => {
    this.Modele = reponse;
    this.listeModele= this.Modele.results;
    this.dataSourceModele.data = this.listeModele;
    this.ModelemodifsLoadingResults = false;
    this.isLoadingResults = false;
  });
}





/*
  loadModelByMarques(Maqid) {
    this.vehiculeService.getMarqueModelebyworkflow_id(Maqid).subscribe(reponse => {
      this.listemodelebymarques = reponse;
     
      });
  } 

  public changeMarque(event) {
    this.loadModelByMarques(event);
  }
*/

  initForm() {
    this.vehiculeForm = this.formBuilder.group({
      workf_designation: [''],
      workflow_id: [''],
      workf_code: ['', Validators.required],
      /*Modeleworkflow_id: [''],
      Modeledesignation: [''],*/ 
    });
  }

  initCircuitWorkFlowEtapeForm() {
    this.CircuitWorkFlowEtapeForm = this.formBuilder.group({
      wcir_code: ['', Validators.required],
      wcir_libelle: ['', Validators.required],
      workf_etp_id: ['', Validators.required],
      wcir_etape_libelle: ['', Validators.required],
    });
  }

  

  onSubmitForm(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem('currentUser'));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append('workflow_id', f.workflow_id);
    FormDataVeh.append('workf_code', f.workf_code);
    FormDataVeh.append('workf_designation', f.workf_designation);

    if (f.workflow_id != '') {
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
      this.workflowService.creerWorkFlow(FormDataVeh).subscribe(result => {
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


  onSubmitCreatCircuitValidationForm(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem('currentUser'));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append('wcir_code', f.wcir_code);
    FormDataVeh.append('wcir_libelle', f.wcir_libelle);
    FormDataVeh.append('workf_etp_id', f.workf_etp_id);
    FormDataVeh.append('wcir_etape_libelle',f.wcir_etape_libelle);

      this.workflowService.creerCircuitWorkFlow(FormDataVeh).subscribe(result => {
        if (result.success==true) { 
          this.reponse = result;
        this.toastr.success(result.message);
        this.imagePreview='';
        this.initCircuitWorkFlowEtapeForm();
        this.loadDataTableListeCircuitEtape();
       
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

  
loadOne(ID) {
  this.ModifsLoadingResults = true;
    this.OuvrirForm();
    this.isReadonly = true;
    this.WorkflowappService.listeWorkFlowByID(ID).subscribe(reponse => {
    this.OneItem = reponse;  
    this.vehiculeForm.controls['workflow_id'].setValue(this.OneItem.results[0].workflow_id);
    this.vehiculeForm.controls['workf_code'].setValue(this.OneItem.results[0].workf_code);
      this.vehiculeForm.controls['workf_designation'].setValue(this.OneItem.results[0].workf_designation);
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
      this.etapeForm.controls['Modeleworkflow_id'].setValue(ID);
      this.TlisteMarqueModele(ID);

}


//////////////MODELE///////////////////////////
  initFormetape() {
    this.etapeForm = this.formBuilder.group({
      Modeleworkflow_id: ['', Validators.required],
      etape_id: [''],
      etap_niveau: ['', Validators.required],
      etap_designation: ['', Validators.required],
      etap_code: ['', Validators.required],
      etap_fin: ['', Validators.required],
      
     
    });
  }

  initFormValidateur() {
    this.validateurForm = this.formBuilder.group({
      ValidModeleworkflow_id: ['', Validators.required],
      ValidModeleID: [''],
      Validutilisateur: ['', Validators.required],
      Validetap_fin: ['', Validators.required],

    });
  }

  onSubmitFormModele(f) {
    this.ModelemodifsLoadingResults = true;
    const FormDataModele= new FormData();
    FormDataModele.append('ID', f.ModeleID);
    FormDataModele.append('marque_ID', f.Modeleworkflow_id);
    FormDataModele.append('designation', f.Modeledesignation);

    if (f.ModeleID != '') {
      //Nouveau;
      this.vehiculeService.updateModeleMarque(FormDataModele).subscribe(result => {
        if (result.success==true) { 
          this.reponse = result;
        this.toastr.success(result.message);
        this.vehiculeForm.controls['ModeleID'].setValue('');
        this.vehiculeForm.controls['Modeledesignation'].setValue('');
        this.TlisteMarqueModele(f.Modeleworkflow_id);
       
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
        this.etapeForm.controls['etape_id'].setValue('');
        this.etapeForm.controls['Modeledesignation'].setValue('');
        this.TlisteMarqueModele(f.Modeleworkflow_id);
       
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
/*this.modeleForm.controls['ModeleID'].setValue(model_ID);
this.modeleForm.controls['Modeledesignation'].setValue(ModeleName);*/
this.ModifsLoadingResults = false;
}

actionClose(f){
  if (f!=1) {
   
    this.FermerForm();
  } else {
    this.isReadonly=false;
    this.OuvrirForm();
   
  }

}

// reccuper l'id à supprimer lors de l'ouverture du modal de questio


// Supprime l'enregistrement
supprimeModele(IDmodel,workflow_id) {
  this.vehiculeService.deleteModeleMarque(IDmodel).subscribe(reponse => {
    this.toastr.success("Suppression terminée avec succès ! ");
    this.TlisteMarqueModele(workflow_id);
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




//////////////////LE WORKFLOW///////////////////

loadAllWorflow() {
  this.WorkflowappService.listeWorkFlow().subscribe(reponse => {
    this.listeAllWorkflow = reponse;
   
  });
} 

loadAllEtapeWorflow(wofcode) {
  this.WorkflowappService.listeAllWorkFlowbyID(wofcode).subscribe(reponse => {
    this.listeAllEtapeWorkflow = reponse;
   
  });
} 


onChangeSelectedWorflowEtapeValue(event) {
  const selectEl = event.target;
  const val = selectEl.options[selectEl.selectedIndex].getAttribute('workfetpdesignation');
  this.CircuitWorkFlowEtapeForm.controls['wcir_etape_libelle'].setValue(val);
}


}
