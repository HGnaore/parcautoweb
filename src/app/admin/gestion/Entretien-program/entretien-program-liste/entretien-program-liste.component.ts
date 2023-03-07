import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EntretienService } from 'src/app/services/entretien.service';
@Component({
  selector: 'app-entretien-program-liste',
  templateUrl: './entretien-program-liste.component.html',
  styleUrls: ['./entretien-program-liste.component.scss'],
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
export class EntretienProgramListeComponent implements OnInit {

  Locations: any = [];
  listeLocations: any = [];
  displayedColumns: string[] = ['number','immatriculation', 'typeEnretretienName', 'Repetertous', 'objetEntretien','Description', 'action'];
  dataSource: MatTableDataSource<any>;
  IDSuppression = '';
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private entretienService: EntretienService,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource(this.Locations);
  }
  ngOnInit(): void {
    //this.listeEntretien();
  }

  listeEntretien() {
    this.entretienService.listeEntretienProgrammes().subscribe(reponse => {
      this.Locations = reponse;
      this.listeLocations = this.Locations;
      this.dataSource.data = this.listeLocations;
      this.isLoadingResults = false;
      //console.log(this.listeLocations);
    });
  }

  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  questionSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.entretienService.deleteEntretienProgrammes(this.IDSuppression).subscribe(reponse => {
      this.toastr.success("Suppression terminée avec succès ! ");
      this.listeEntretien();
    }, (ret) => {
      this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
    });
  }

  ngAfterViewInit() {
    this.listeEntretien();
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