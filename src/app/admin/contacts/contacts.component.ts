import { TrombinoService } from '../../services/trombino.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
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
export class ContactsComponent implements OnInit, AfterViewInit {
  listeEmploye: any[];
  /*displayedColumns: string[] = ['UnAgent', 'UnAgent2', 'UnAgent3'];
  dataSource: MatTableDataSource<any>;*/
  //obs: Observable<any>;
  valRecherche: String = "";
  isLoadingResults: boolean = false;
  /*@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;*/

  constructor(private trombinoService: TrombinoService) {
    //this.dataSource = new MatTableDataSource(this.listeEmploye);
  }

  ngOnInit(): void {
    //this.obs = this.dataSource.connect();
  }

  applyFilter() {
    if (!this.valRecherche) {
      this.listeEmploye = [];
      return;
    }
    if (this.valRecherche.length <= 1) {
      return;
    }
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.trombinoService.verifemailtrombino(this.valRecherche.trim().toLowerCase()).pipe(debounceTime(1000),
    this.isLoadingResults = true;
    this.trombinoService.verifemailtrombino(this.valRecherche).pipe(debounceTime(1000),
      distinctUntilChanged()).subscribe(res => {
        // console.log(filterValue.trim().toLowerCase());
        console.log(this.valRecherche);
        this.listeEmploye = res;
        this.isLoadingResults = false;
        //  this.dataSource.data = this.listeEmploye;

        /*  if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }*/
        /* this.ngOnInit();
         this.ngAfterViewInit();
         console.log(this.listeEmploye);*/
      });

  }
  ngAfterViewInit() {
    /*  this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;*/
  }

}
