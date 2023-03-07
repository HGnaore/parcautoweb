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
  selector: 'app-entretien-program-edition',
  templateUrl: './entretien-program-edition.component.html',
  styleUrls: ['./entretien-program-edition.component.scss'],
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

export class EntretienProgramEditionComponent implements OnInit {
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
  n_detailentretienProgrammes = 0;
  OneEntretienProgram: any = [];
  displayedColumns: string[] = ['number','designation', 'quantite', 'prixUnitaire', 'action'];
  dataSourceDetailTravaux: MatTableDataSource<any>;


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

  }

  ngOnInit(): void {
    this.loadVehicule();
   // this.loadFournisseur();
    this.loadTypeEntretien();
    this.loadOneEntretienProgram();
  }

 /* loadFournisseur() {
    this.fournisseurService.listeFournisseur().subscribe(reponse => {
      this.listefournisseur = reponse;
    
    });
  }*/

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
      vehiculeId: [''],
      typeEntretienId: [''],
      repetition: [''],
      frequenceCode: [''],
      kilometrage: [''],
      rappel: [''],
      rappelPeriodeCode: [''],
      rappelKilometrage: [''],
      comment: [''],
   
    });
  }

  onSubmitForm(f) {
    this.isLoadingResults = true;
    var body = {
      "vehiculeId": f.vehiculeId,
      "typeEntretienId": f.typeEntretienId,
      "repetition": f.repetition,
      "frequenceCode": f.frequenceCode,
      "kilometrage": f.kilometrage,
      "rappel": f.rappel,
      "rappelPeriodeCode": f.rappelPeriodeCode,
      "rappelKilometrage": f.rappelKilometrage,
      "comment": f.comment,
    };

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != '0') {
      //Modification
      this.entretienService.updateEntretienProgrammes(this.id, body).subscribe(result => {
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
      this.entretienService.saveEntretienProgrammes(body).subscribe(result => {
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


  loadOneEntretienProgram() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.isLoadingResults = true;
      this.entretienService.getOneEntretienProgrammes(this.id).subscribe(reponse => {
        this.OneEntretienProgram = reponse;
        this.EntretienForm.controls['vehiculeId'].setValue(this.OneEntretienProgram.vehiculeId);
        this.EntretienForm.controls['typeEntretienId'].setValue(this.OneEntretienProgram.typeEntretienId);
        this.EntretienForm.controls['repetition'].setValue(this.OneEntretienProgram.repetition);
        this.EntretienForm.controls['frequenceCode'].setValue(this.OneEntretienProgram.frequenceCode);
        this.EntretienForm.controls['kilometrage'].setValue(this.OneEntretienProgram.kilometrage);
        this.EntretienForm.controls['rappel'].setValue(this.OneEntretienProgram.rappel);
        this.EntretienForm.controls['rappelPeriodeCode'].setValue(this.OneEntretienProgram.rappelPeriodeCode);
        this.EntretienForm.controls['rappelKilometrage'].setValue(this.OneEntretienProgram.rappelKilometrage);
        this.EntretienForm.controls['comment'].setValue(this.OneEntretienProgram.comment);
      
        this.isLoadingResults = false;

      });
    }
  }


}