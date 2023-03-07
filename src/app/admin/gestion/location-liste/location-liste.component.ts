import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { VehiculeService } from 'src/app/services/vehicule.service';

@Component({
  selector: 'app-location-liste', 
  templateUrl: './location-liste.component.html',
  styleUrls: ['./location-liste.component.scss'],
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
export class LocationListeComponent implements AfterViewInit, OnInit {
  Locations: any = [];
  listeLocations: any = [];
  displayedColumns: string[] = ['number','Immatriculation', 'Periode', 'nbJour', 'Montant', 'Motif', 'action'];
  dataSource: MatTableDataSource<any>;
  IDSuppression = '';
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vehiculeservice: VehiculeService,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource(this.Locations);
  }
  ngOnInit(): void {
    this.listeLocation();
  }

  listeLocation() {
    this.vehiculeservice.listeLocation().subscribe(reponse => {
      this.Locations = reponse;
      this.listeLocations = this.Locations;
      this.dataSource.data = this.listeLocations;
      this.isLoadingResults = false;
      console.log(this.listeLocations);
    });
  }

  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  questionSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.vehiculeservice.deleteLocation(this.IDSuppression).subscribe(reponse => {
      this.toastr.success("Suppression terminée avec succès ! ");
      this.listeLocation();
    }, (ret) => {
      this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
    });
  }

  ngAfterViewInit() {
    this.listeLocation();
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

