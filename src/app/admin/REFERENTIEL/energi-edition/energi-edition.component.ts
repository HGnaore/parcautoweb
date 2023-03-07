import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnergieService } from 'src/app/services/energie.service';


@Component({
  selector: 'app-energi-edition',
  templateUrl: './energi-edition.component.html',
  styleUrls: ['./energi-edition.component.scss'],
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
export class EnergiEditionComponent implements OnInit {

  energieForm: FormGroup;
  isLoadingResults = true;
  OneEnergie: any = [];
  id: string;
  energie: any = [];
  afficheReinit = false;
  reponse: any;
  IDDir: string;
  libDir: string;

  enModif = false;
  details = [];
  nDetails = 0;

  energies: any = [];
  listeenergies: any = [];
  displayedColumns: string[] = ['date', 'prix', 'action'];
  dataSource: MatTableDataSource<any>;
  IDSuppression = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private energieService: EnergieService) {
    this.id = this.route.snapshot.paramMap.get('id');
    /* if (this.id == '0') {
       this.enModif = false;
     } else {
       this.enModif = true;
     }*/
    this.initForm();
    this.dataSource = new MatTableDataSource(this.energies);
  }

  ngOnInit() {
    this.loadOneEnergie();
    //  this.listeenergie();
  }

  initForm() {
    this.isLoadingResults = false;
    this.energieForm = this.formBuilder.group({
      code: ['', Validators.required],
      designation: ['', Validators.required],
      date: [''],
      dernierPrix: ['']
    });
  }

  loadOneEnergie() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.isLoadingResults = true;
      this.energieService.getOneEnergie(this.id).subscribe(reponse => {
        this.OneEnergie = reponse;
        this.details = reponse.details;
        this.dataSource.data = this.details;
        this.energieForm.controls['code'].setValue(this.OneEnergie.code);
        this.energieForm.controls['designation'].setValue(this.OneEnergie.designation);
        this.energieForm.controls['initial'].setValue(this.OneEnergie.initial);
        this.energieForm.controls['comment'].setValue(this.OneEnergie.comment);
        this.isLoadingResults = false;
        console.log(reponse);
      });
    }
  }

  ajouter(f) {
    this.isLoadingResults = true;
    var body = {
      "code": f.code,
      "designation": f.designation,
      "date": f.date,
      "dernierPrix": f.dernierPrix
    };

    //ajouter dans la liste
    this.details.push(
      {
        "id": this.nDetails++,
        "date": f.date,
        "prix": f.dernierPrix,
        "isDeleted": false
      }
    )
    //mise à jour de la table
    this.dataSource.data = this.details;
    /*this.energieService.getOneEnergiebyCode(f.code).subscribe(reponse => {

    }, () => {

    });*/

  }

  // supprimer dans la table
  supTable(idC: any) {
    const index = this.details.findIndex(id => id.id === idC);
    if (index !== -1) {
      // this.details.splice(index, 1);
      this.details.find(item => item.id == idC).isDeleted = true;

      const result = this.details.filter(item => item.isDeleted === false);
      this.dataSource.data = result;
      console.log(this.details);
    }
  }

  onSubmitForm(f) {
    this.isLoadingResults = true;
    var body = {
      "code": f.code,
      "designation": f.designation,
      "date": f.date,
      "dernierPrix": f.dernierPrix,
      "details": this.details
    };

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != '0') {
      //Modification
      this.energieService.updateEnergie(this.id, body).subscribe(result => {
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
      this.energieService.saveEnergie(body).subscribe(result => {
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


  reinitform() {
    this.energieForm.controls['code'].reset();
    this.energieForm.controls['designation'].reset();
    this.energieForm.controls['date'].reset();
    this.energieForm.controls['dernierPrix'].reset();
  }



  /////////////-----
  /*  listeenergie() {
      this.energieService.listeEnergie().subscribe(reponse => {
        this.energies = reponse;
        this.listeenergies = this.energies;
        this.dataSource.data = this.listeenergies;
        this.isLoadingResults = false;
        console.log(this.listeenergies);
      });
    }*/

  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  questionSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.energieService.deleteEnergie(this.IDSuppression).subscribe(() => {
      this.toastr.success('Suppression terminé avec succes !');
      // this.listeenergie();
    }, (ret) => {
      this.toastr.error(ret.message, "Erreur Code : " + ret.code);
    });
  }

  ngAfterViewInit() {
    // this.listeenergie();
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

}