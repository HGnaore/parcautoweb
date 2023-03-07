import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({ 
  selector: 'app-typefournisseur-liste',
  templateUrl: './typefournisseur-liste.component.html',
  styleUrls: ['./typefournisseur-liste.component.scss'],
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

export class TypefournisseurListeComponent implements AfterViewInit, OnInit {
  Typefournisseurs: any = [];
  listeTypefournisseurs: any = [];
  displayedColumns: string[] = ['code', 'designation', 'action'];
  dataSource: MatTableDataSource<any>;
  IDSuppression = '';
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fournisseurService: FournisseurService,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource(this.Typefournisseurs);
  }
  ngOnInit(): void {
    this.listeTypefournisseur();
  }

  listeTypefournisseur() {
    this.fournisseurService.listeTypeFournisseur().subscribe(reponse => {
      this.Typefournisseurs = reponse;
      this.listeTypefournisseurs = this.Typefournisseurs;
      this.dataSource.data = this.listeTypefournisseurs;
      this.isLoadingResults = false;
      console.log(this.listeTypefournisseurs);
    });
  }

  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  questionSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.fournisseurService.deleteTypeFournisseur(this.IDSuppression).subscribe(() => {
      this.toastr.success('Suppression terminé avec succes !');
      this.listeTypefournisseur();
    }, (ret) => {
      console.log(ret);
      this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
    });
  }

  ngAfterViewInit() {
    this.listeTypefournisseur();
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