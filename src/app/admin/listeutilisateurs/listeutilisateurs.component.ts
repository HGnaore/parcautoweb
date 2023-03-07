import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-listeutilisateurs',
  templateUrl: './listeutilisateurs.component.html',
  styleUrls: ['./listeutilisateurs.component.scss'],
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
export class ListeutilisateursComponent implements AfterViewInit {
  Utilisateurs: any = [];
  listeUsers: any = [];
  displayedColumns: string[] = ['Util_Nomprenoms', 'Util_Email', 'Util_Direction', 'Util_telephone', 'Util_Poste', 'Util_tech', 'Util_Admin', 'Util_BP', 'boutons'];
  dataSource: MatTableDataSource<any>;
  IDSuppression = '';
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usersService: UserService,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource(this.Utilisateurs);
  }


  listeUtilisateurs() {
    this.usersService.listeUtilisateur().subscribe(reponse => {
      this.Utilisateurs = reponse;
      this.listeUsers = this.Utilisateurs.results.liste;
      this.dataSource.data = this.listeUsers;
      this.isLoadingResults = false;
      console.log(this.listeUsers);
    });
  }

  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  questionSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.usersService.deleteDirection(this.IDSuppression).subscribe(reponse => {
      switch (reponse.success) {
        case true: {
          // statements;
          this.toastr.success(reponse.message);
          this.listeUtilisateurs();
          break;
        }
        case false: {
          // statements;
          this.toastr.error(reponse.message);
          break;
        }
        default: {
          // statements;
          this.toastr.error('Erreur de connexion au serveur');
          break;
        }

      }
    });
    this.IDSuppression = '';
  }

  ngAfterViewInit() {
    this.listeUtilisateurs();
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

