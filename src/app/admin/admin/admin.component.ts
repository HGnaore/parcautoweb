import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
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
export class AdminComponent implements OnInit {
  UseriD = JSON.parse(localStorage.getItem('currentUser'));
  AllcurrentUser = JSON.parse(localStorage.getItem('currentUser'));

  ProfilID = JSON.parse(localStorage.getItem('currentUser'));
  UserProfilID: any;

  idUtilisateur: string;
  nomprenoms: string;
  nbreAttrib = 0;
  result: any = [];
  image: string;
  MesTickets: boolean = false;
  MesAttributions: boolean = false;
  GestionTickets: boolean = false;
  Referentiel: boolean = false;
  Administration: boolean = false;
  Bonpour: boolean = false;
  ListMenuVehicule: boolean = false;

  OngletParcAuto: boolean = true;
  OngletConsultation: boolean = false;
  OngletModification: boolean = false;
  OngletTraitement: boolean = false;
  
 Myprofil: any;
  title = 'NEO';
  isAuth = 'n'; 
  registr = false;
  AficlistMenuVehicule;
  IDvehicule: string;


  totalVisite: any;
  notifTitle: string;
  tableData$: any = [];
  public listopVisite: any = [];
  niveauValide: any;
  totalAssurance: any;
  listopAsurance: any;
  totalEntretienprogramme: any;
  listEntretienprogramme: any;

  constructor(
    public configService: ConfigService,
    private router: Router,
    private authService: AuthService,
    private vehiculeService: VehiculeService
  ) { }



  ngOnInit() {
    this.UserProfilID = this.ProfilID.prof_id;
    this.nomprenoms = this.ProfilID.Util_Nomprenoms;
   this.image = this.ProfilID.Util_photo;
   
    this.MenuReferentiel();
    this.loadTopBonpourNotification();

    //this.configService.ListMenuVehicule=true;
   /* this.idUtilisateur = localStorage.getItem('id');
    this.nomprenoms = localStorage.getItem('nomprenoms');
    this.image = localStorage.getItem('image');

    if (localStorage.getItem('Util_BP') == 'true') {
      this.Bonpour = true;
    }

    if (localStorage.getItem('Util_tech') == 'true') {
      this.MesTickets = true;
      this.MesAttributions = true;
      this.GestionTickets = true;
    }
    if (localStorage.getItem('Util_Admin') == 'true') {
      this.MesTickets = true;
      this.MesAttributions = true;
      this.GestionTickets = true;
      this.Administration = true;
      this.Referentiel = true;
      this.Bonpour = true;
    }*/
/*if(this.UseriD.ID){
  this.ListMenuVehicule = this.configService.ListMenuVehicule=true;

}*/
    
    // setInterval(() => this.NbreAttribution(this.idUtilisateur), 5600);
  }


  deconnexion() {
    this.authService.logout();
    /*localStorage.clear();
    localStorage.removeItem('isConnected');
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('nomprenoms');
    localStorage.removeItem('id');*/
    this.router.navigateByUrl('/auth');
  }

  MenuReferentiel(){ 
   /* this.configService.ListMenuVehicule=true;*/
    this.IDvehicule=environment.SelectIDvehicule;
   this.Myprofil = environment.SelectUserProfil = this.UserProfilID;
 
  }


  loadTopBonpourNotification() {
   this.vehiculeService.listenotification().subscribe(
      topcinqret => {
        this.tableData$ = topcinqret;
        this.totalVisite = this.tableData$.results.notifvisitevignette.length;
        this.totalAssurance = this.tableData$.results.notifassurance.length;
        this.totalEntretienprogramme = this.tableData$.results.entretienprogramme.length;
        

        this.listopVisite = this.tableData$.results.notifvisitevignette.slice(0, 10);
        this.listopAsurance = this.tableData$.results.notifassurance.slice(0, 10);
        this.listEntretienprogramme = this.tableData$.results.entretienprogramme.slice(0, 10);
       /* if (this.listopVisite[0]['NiveauVal'] == 1) {
          this.niveauValide = 'bonpour/valider/update/';
          this.notifTitle = 'En attente de validation';
        } else {
          this.niveauValide = 'bonpour/update/';
          this.notifTitle = 'Enregistré(s)';
        }*/

      }
    );
  }

}
