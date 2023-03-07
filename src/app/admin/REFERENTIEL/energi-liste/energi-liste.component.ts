import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EnergieService } from 'src/app/services/energie.service';

@Component({
  selector: 'app-energi-liste',
  templateUrl: './energi-liste.component.html',
  styleUrls: ['./energi-liste.component.scss'],
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
export class EnergiListeComponent implements AfterViewInit, OnInit {
  Energies: any = [];
  listeEnergies: any = [];
  displayedColumns: string[] = ['code', 'designation', 'dernierPrix', 'action'];
  dataSource: MatTableDataSource<any>;
  IDSuppression = '';
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private energieService: EnergieService,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource(this.Energies);
  }
  ngOnInit(): void {
    this.listeEnergie();
  }


  listeEnergie() {
    this.energieService.listeEnergie().subscribe(reponse => {
      this.Energies = reponse;
      this.listeEnergies = this.Energies;
      this.dataSource.data = this.listeEnergies;
      this.isLoadingResults = false;
      console.log(this.listeEnergies);
    });
  }

  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  questionSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.energieService.deleteEnergie(this.IDSuppression).subscribe(() => {
      this.toastr.success('Suppression terminé avec succes !');
      this.listeEnergie();
    }, (ret) => {
      this.toastr.error(ret.message, "Erreur Code : " + ret.code);
    });
  }

  ngAfterViewInit() {
    this.listeEnergie();
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

