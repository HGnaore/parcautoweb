import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ConfigService } from "src/app/services/config.service";
import { VehiculeService } from "src/app/services/vehicule.service";
import { DirectionService } from "src/app/services/trombino/direction.service";
import { PersonnelService } from "src/app/services/trombino/personnel.service";
import { CartecarburantService } from "src/app/services/cartecarburant.service";
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
@Component({
  selector: "app-carte-carburant",
  templateUrl: "./carte-carburant.component.html",
  styleUrls: ["./carte-carburant.component.scss"],
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
export class CarteCarburantComponent implements OnInit {
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
  listepersonnebydirection: any = [];
  listeDirection: any = [];
  listemarques: any = [];
  sendForm: FormGroup;
  modeleForm: FormGroup;
  isLoadingResults = true;
  ModifsLoadingResults = false;
  ModelemodifsLoadingResults = false;
  OneVehicule: any = [];
  listeenergies: any = [];
  listeCompagniePetro: any = [];
  CompagniePetro: any = [];
  listeusages: any = [];
  reponse: any;
  imatriculation: any;
  OneItem: any = [];
  modele: any;
  marque: any;
  hidden = true;
  ActionClose = true;
  ActionOpen = false;
  listeData: any = [];
  listeModele: any = [];
  displayedColumns: string[] = [
    "number",
    "NumeroCarte",
    "CompagnieID",
    "DotationMensuelle",
    "Suiviconso",
    "StatutCarte",
    "action",
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  DataModel: any = [];

  IDSuppression: any;
  addMarqueName: any;

  constructor(
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private vehiculeService: VehiculeService,
    private cartecarburantService: CartecarburantService,
    private directionService: DirectionService,
    private personnelService: PersonnelService
  ) {
    this.IDVehicule = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.dataSource = new MatTableDataSource(this.DataModel);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadCompagniePetro();
    this.loadDirection();
    this.TlisteCarteCarburant();
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

  TlisteCarteCarburant() {
    this.cartecarburantService.listCartecarburant().subscribe((reponse) => {
      this.DataModel = reponse;
      this.listeData = this.DataModel.results;
      this.dataSource.data = this.listeData;
      this.isLoadingResults = false;
    });
  }

  loadCompagniePetro() {
    this.cartecarburantService.listeCompagniepetro().subscribe((reponse) => {
      this.CompagniePetro = reponse;
      this.listeCompagniePetro = this.CompagniePetro.results;
    });
  }

  loadDirection() {
    this.directionService.readDirection().subscribe((reponse) => {
      this.listeDirection = reponse;
    });
  }

  loadPersonneByDirection(DirID) {
    this.personnelService
      .readPersonnelByDirection(DirID)
      .subscribe((reponse) => {
        this.listepersonnebydirection = reponse;
      });
  }

  public changeDirection(event) {
    this.loadPersonneByDirection(event);
  }

  initForm() {
    this.sendForm = this.formBuilder.group({
      CarteCarburantID: [""],
      NumeroCarte: ["", Validators.required],
      CompagnieID: [""],
      DotationMensuelle: [""],
      Suiviconso: [""],
      StatutCarte: [""],
      CarteGestion: [""],
      DateAffectation: [""],
      DirectionAffect: [""],
      PersonneAffectID: [""],
      Observations: [""],
    });
  }

  onSubmitForm(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.ID;
    const FormDataVeh = new FormData();
    FormDataVeh.append("ID", f.CarteCarburantID);
    FormDataVeh.append("NumeroCarte", f.NumeroCarte);
    FormDataVeh.append("CompagnieID", f.CompagnieID);
    FormDataVeh.append("DotationMensuelle", f.DotationMensuelle);
    FormDataVeh.append("Suiviconso", f.Suiviconso);
    FormDataVeh.append("StatutCarte", f.StatutCarte);
    FormDataVeh.append("CarteGestion", f.CarteGestion);
    FormDataVeh.append("DateAffectation", f.DateAffectation);
    FormDataVeh.append("DirectionAffect", f.DirectionAffect);
    FormDataVeh.append("PersonneAffectID", f.PersonneAffectID);
    FormDataVeh.append("Observations", f.Observations);
    if (f.CarteCarburantID != "") {
      //Nouveau;
      this.cartecarburantService.updateCartecarburant(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.imagePreview = "";
            this.initForm();
            this.TlisteCarteCarburant();
            //  this.getNavigation('admin/admin/vehiculeList','');
          } else {
            this.toastr.error(result.message);
            this.isLoadingResults = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    } else {
      this.cartecarburantService.saveCartecarburant(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.imagePreview = "";
            this.initForm();
            this.TlisteCarteCarburant();
            //  this.getNavigation('admin/admin/vehiculeList','');
          } else {
            this.toastr.error(result.message);
            this.isLoadingResults = false;
          }
        },
        (ret) => {
          this.toastr.error(ret.message, "Erreur Code : " + ret.code);
          //this.isLoadingResults = false;
        }
      );
    }
  }

  loadOne(ID) {
    this.ModifsLoadingResults = true;
    this.OuvrirForm();
    this.cartecarburantService
      .getCartecarburantbyId(ID)
      .subscribe((reponse) => {
        this.OneItem = reponse;
        this.sendForm.controls["CarteCarburantID"].setValue(
          this.OneItem.results[0].ID
        );
        this.sendForm.controls["NumeroCarte"].setValue(
          this.OneItem.results[0].NumeroCarte
        );
        this.sendForm.controls["CompagnieID"].setValue(
          this.OneItem.results[0].CompagnieID
        );
        this.sendForm.controls["DotationMensuelle"].setValue(
          this.OneItem.results[0].DotationMensuelle
        );
        this.sendForm.controls["Suiviconso"].setValue(
          this.OneItem.results[0].Suiviconso
        );
        this.sendForm.controls["StatutCarte"].setValue(
          this.OneItem.results[0].StatutCarte
        );
        this.sendForm.controls["CarteGestion"].setValue(
          this.OneItem.results[0].CarteGestion
        );
        this.sendForm.controls["DateAffectation"].setValue(
          this.OneItem.results[0].DateAffectation
        );
        this.sendForm.controls["DirectionAffect"].setValue(
          this.OneItem.results[0].DirectionAffect
        );
        this.loadPersonneByDirection(this.OneItem.results[0].DirectionAffect);
        this.sendForm.controls["PersonneAffectID"].setValue(
          this.OneItem.results[0].PersonneAffectID
        );
        this.sendForm.controls["Observations"].setValue(
          this.OneItem.results[0].Observations
        );
        this.ModifsLoadingResults = false;
      });
  }
  // reccuper l'id à supprimer lors de l'ouverture du modal de question
  ItemSupprime(id) {
    this.IDSuppression = id;
  }

  // Supprime l'enregistrement
  supprime() {
    this.vehiculeService.deleteEnergie(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteCarteCarburant();
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

  // reccuper l'id à supprimer lors de l'ouverture du modal de questio

  // Supprime l'enregistrement
  /* supprimeModele(IDmodel,marqueID) {
  this.vehiculeService.deleteModeleMarque(IDmodel).subscribe(reponse => {
    this.toastr.success("Suppression terminée avec succès ! ");
    this.TlisteMarqueModele(marqueID);
  }, (ret) => {
    this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
  });
}*/

  OuvrirForm() {
    this.initForm();
    this.hidden = false;
    this.ActionClose = false;
    this.ActionOpen = true;
  }

  FermerForm() {
    this.initForm();
    this.hidden = true;
    this.ActionClose = true;
    this.ActionOpen = false;
  }
}

export interface PeriodicElement {
  name: string;
  position: string;
  prochain: string;
  repect: string;
  energie: string;
  vehicule: string;
  direction: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    direction: "D_INFORMATION",
    vehicule: "45585",
    position: "23/12/2021",
    name: "En Service",
    repect: "",
    prochain: "19500000",
    energie: "50000",
  },
  {
    direction: "RADIO_CI",
    vehicule: "45586",
    position: "23/11/2021",
    name: "Perdu",
    repect: "28/11/2021",
    prochain: "3250000",
    energie: "50000",
  },
];
