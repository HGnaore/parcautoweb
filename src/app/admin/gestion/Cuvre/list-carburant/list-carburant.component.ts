import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ConfigService } from "src/app/services/config.service";
import { VehiculeService } from "src/app/services/vehicule.service";
import { Location } from "@angular/common";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { CuveService } from "src/app/services/cuve.service";

@Component({
  selector: "app-list-carburant",
  templateUrl: "./list-carburant.component.html",
  styleUrls: ["./list-carburant.component.scss"],
  animations: [
    // the fade-in/fade-out animation.
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(1000)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(":leave", animate(1000, style({ opacity: 0 }))),
    ]),
  ],
})
export class ListCarburantComponent implements OnInit {
  /*/////DELETE CONFIRMATION///////*/
  public popoverTitle: string = "AVERTISSEMENT";
  public popoverMessage: string = "Voulez-vous vraiment supprimer cette ligne?";
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  /*/////END DELETE CONFIRMATION///////*/

  IDVehicule: string;
  selecetdFile: any;
  imagePreview: any;
  reader: any;
  listecuve: any = [];
  listemarques: any = [];
  vehiculeForm: FormGroup;
  modeleForm: FormGroup;
  isLoadingResults = true;
  ModifsLoadingResults = false;
  ModelemodifsLoadingResults = false;
  OneVehicule: any = [];
  listeenergies: any = [];
  listeusages: any = [];
  reponse: any;
  imatriculation: any;
  OneItem: any = [];
  modele: any;
  marque: any;
  hidden = true;
  ActionClose = true;
  ActionOpen = false;
  DerniereCuve: any = [];
  listeModele: any = [];
  displayedColumns: string[] = [
    "number",
    "datecreation",
    "DirectionDemandeuse",
    "initial",
    "activité",
    "objet",
    "Datedebut",
    "nblitrereel",
    "action",
  ];
  dataSource: MatTableDataSource<any>;

  displayedColumnsModele: string[] = ["number", "Model", "action"];
  dataSourceModele: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginatorModele: MatPaginator;
  @ViewChild(MatSort) sortModele: MatSort;

  Energie: any = [];
  denierecuve: any = [];
  Modele: any = [];
  IDSuppression: any;
  addMarqueName: any;
  listeData: any = [];

  constructor(
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private vehiculeService: VehiculeService,
    private cuveService: CuveService
  ) {
    this.IDVehicule = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.dataSource = new MatTableDataSource(this.Energie);
    this.dataSourceModele = new MatTableDataSource(this.Modele);
  }

  ngOnInit(): void {
    this.loadCuve();
  }

  ngAfterViewInit() {
    this.TlisteAppro();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceModele.paginator = this.paginatorModele;
    this.dataSourceModele.sort = this.sortModele;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceModele.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSourceModele.paginator) {
      this.dataSourceModele.paginator.firstPage();
    }
  }

  TlisteAppro() {
    this.cuveService.listCuveAppro().subscribe((reponse) => {
      this.Energie = reponse;
      this.listecuve = this.Energie.results;
      this.dataSource.data = this.listecuve;
      this.isLoadingResults = false;
    });
  }

  DerniereAppro() {
    this.cuveService.DerniereCuveAppro().subscribe((reponse) => {
      this.denierecuve = reponse;
      this.DerniereCuve = this.denierecuve.results;
      this.vehiculeForm.controls["approlitreinitial"].setValue(
        this.denierecuve.results[0].nblitrereel
      );
    });
  }

  loadCuve() {
    this.cuveService.listCuve().subscribe((reponse) => {
      this.listecuve = reponse;
    });
  }

  /**/

  initForm() {
    this.vehiculeForm = this.formBuilder.group({
      approcuvreID: [""],
      approdate: ["", Validators.required],
      approcuvre: ["", Validators.required],
      approlitreinitial: [""],
      approlitrecout: [""],
      approlitreappro: ["", Validators.required],
      approdescription: [""],
    });
  }

  initFormSave() {
    this.vehiculeForm.controls["approcuvreID"].setValue('');
    this.vehiculeForm.controls["approdate"].setValue('');
    this.vehiculeForm.controls["approlitreinitial"].setValue('');
    this.vehiculeForm.controls["approlitrecout"].setValue('');
    this.vehiculeForm.controls["approlitreappro"].setValue('');
    this.vehiculeForm.controls["approdescription"].setValue('');
    this.loadCuve();
  }

  onSubmitForm(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.Id_Utilisateur;
    const FormDataVeh = new FormData();
    FormDataVeh.append("approcuvreID", f.approcuvreID);
    FormDataVeh.append("approdate", f.approdate);
    FormDataVeh.append("approcuvre", f.approcuvre);
    FormDataVeh.append("approlitreinitial", f.approlitreinitial);
    FormDataVeh.append("approlitrecout", f.approlitrecout);
    FormDataVeh.append("approlitreappro", f.approlitreappro);
    FormDataVeh.append("approdescription", f.approdescription);
    FormDataVeh.append("authentification_ID", varID);
    if (f.approcuvreID != "") {
      //Nouveau;
      this.cuveService.updateCuveAppro(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.imagePreview = "";
            this.initFormSave();
            this.loadCuve();
            this.TlisteAppro();
            //  this.getNavigation('admin/admin/vehiculeList','');
          } else {
            this.toastr.error(result.message);
            this.isLoadingResults = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          this.isLoadingResults = false;
        }
      );
    } else {
      this.cuveService.saveCuveAppro(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.imagePreview = "";
            this.initFormSave();
            this.loadCuve();
            this.TlisteAppro();
            //  this.getNavigation('admin/admin/vehiculeList','');
          } else {
            this.toastr.error(result.message);
            this.isLoadingResults = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          this.isLoadingResults = false;
        }
      );
    }
  }

  loadOne(ID) {
    this.ModifsLoadingResults = true;
    this.OuvrirForm();
    this.cuveService.getCuveApprobyId(ID).subscribe((reponse) => {
      this.OneItem = reponse;
      this.vehiculeForm.controls["approcuvreID"].setValue(
        this.OneItem.results[0].ID
      );
      this.vehiculeForm.controls["approdate"].setValue(
        this.OneItem.results[0].approdate
      );
      this.vehiculeForm.controls["approcuvre"].setValue(
        this.OneItem.results[0].approcuvreID
      );
      this.vehiculeForm.controls["approlitreinitial"].setValue(
        this.OneItem.results[0].nblitrereel
      );

      this.vehiculeForm.controls["approlitrecout"].setValue(
        this.OneItem.results[0].prix
      );
      this.vehiculeForm.controls["approlitreappro"].setValue(
        this.OneItem.results[0].approlitreappro
      );
      this.vehiculeForm.controls["approdescription"].setValue(
        this.OneItem.results[0].approdescription
      );
      this.ModifsLoadingResults = false;
    });
  }

  loadMCuveByIdDernierAppro(ID) {
    this.cuveService.DerniereCuveApproByCuveID(ID).subscribe((reponse) => {
      this.listeData = reponse;
      this.vehiculeForm.controls["approlitreinitial"].setValue(
        this.listeData.results[0].nblitrereel
      );
      this.vehiculeForm.controls["approlitrecout"].setValue(
        this.listeData.results[0].prix
      );
    });
  }

  public Onchange(event) {
    this.loadMCuveByIdDernierAppro(event);
  }

  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  ItemSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.cuveService.deleteCuveAppro(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteAppro();
        this.loadCuve();
      },
      (ret) => {
        this.toastr.error(
          ret.error.message +
            " : " +
            ret.error.description +
            "[" +
            ret.message +
            "]",
          "Erreur Code : " + ret.error.code
        );
      }
    );
  }

  //////////////MODELE///////////////////////////

  getNavigation(link, id) {
    if (id === "") {
      this.router.navigate([link]);
    } else {
      this.router.navigate([link + "/" + id]);
    }
  }

  actionClose(f) {
    if (f != 1) {
      this.FermerForm();
    } else {
      this.OuvrirForm();
    }
  }

  OuvrirForm() {
    this.initFormSave();
    this.hidden = false;
    this.ActionClose = false;
    this.ActionOpen = true;
  }

  FermerForm() {
    this.initFormSave();
    this.hidden = true;
    this.ActionClose = true;
    this.ActionOpen = false;
  }
}
