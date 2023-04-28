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
import { DirectionService } from "src/app/services/trombino/direction.service";
import { CartecarburantService } from "src/app/services/cartecarburant.service";
import { CuveService } from "src/app/services/cuve.service";
import { PersonnelService } from "src/app/services/trombino/personnel.service";
@Component({
  selector: "app-dotation-carburant",
  templateUrl: "./dotation-carburant.component.html",
  styleUrls: ["./dotation-carburant.component.scss"],
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
export class DotationCarburantComponent implements OnInit {
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
  listemodelebymarques: any = [];
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
  liste: any = [];
  listeModele: any = [];
  displayedColumns: string[] = [
    "number",
    "datecreation",
    "DirectionDemandeuse",
    "activité",
    "cuve_nom",
    "nbLitreAffectCaburant",
    "NumeroCarte",
    "MontantAffectCaburant",
    "action",
  ];
  dataSource: MatTableDataSource<any>;

  displayedColumnsModele: string[] = ["number", "Model", "action"];
  dataSourceModele: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginatorModele: MatPaginator;
  @ViewChild(MatSort) sortModele: MatSort;

  Dtcabu: any = [];
  Modele: any = [];
  IDSuppression: any;
  addMarqueName: any;

  Vehicules: any = [];
  listeVehicules: any = [];
  listeDirection: any = [];
  listeactivite: any = [];
  activite: any = [];
  listecuve: any = [];
  listepersonnebydirection: any = [];
  DataModel: any = [];
  listeData: any = [];

  constructor(
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private vehiculeService: VehiculeService,
    private directionService: DirectionService,
    private cartecarburantService: CartecarburantService,
    private cuveService: CuveService,
    private personnelService: PersonnelService
  ) {
    this.IDVehicule = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.dataSource = new MatTableDataSource(this.Dtcabu);
    this.dataSourceModele = new MatTableDataSource(this.Modele);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.TlisteVehiculevalide();
    this.loadDirection();
    this.loadActivite();
    this.loadCuveAppro();
    this.TlisteCarteCarburantActive();
    this.TlisteAffection();
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

  TlisteAffection() {
    this.cartecarburantService
      .listeAffectationcarburant()
      .subscribe((reponse) => {
        this.Dtcabu = reponse;
        this.liste = this.Dtcabu.results;
        this.dataSource.data = this.liste;
        this.isLoadingResults = false;
      });
  }

  TlisteVehiculevalide() {
    this.vehiculeService.listeVehiculeValider().subscribe((reponse) => {
      this.Vehicules = reponse;
      this.listeVehicules = this.Vehicules.results;
      //  this.dataSource.data = this.listeVehicules;
      this.isLoadingResults = false;
      //this.urlPhoto=this.configService.urlgRTI;
    });
  }

  loadDirection() {
    this.directionService.readDirection().subscribe((reponse) => {
      this.listeDirection = reponse;
    });
  }

  loadActivite() {
    this.cartecarburantService.listeActivite().subscribe((reponse) => {
      this.activite = reponse;
      this.listeactivite = this.activite.results;
    });
  }

  loadCuveAppro() {
    this.cuveService.listCuveAppro().subscribe((reponse) => {
      this.listecuve = reponse;
    });
  }

  public changecarte(event) {
    this.loadgetOneCarteinfo(event);
  }

  loadgetOneCarteinfo(ID) {
    if (ID != "") {
      this.cartecarburantService
        .getCartecarburantbyId(ID)
        .subscribe((reponse) => {
          this.OneItem = reponse;
          this.loadPersonneByID(this.OneItem.results[0].PersonneAffectID);
          this.vehiculeForm.controls["CarteDotationmensuel"].setValue(
            this.OneItem.results[0].DotationMensuelle
          );
        });
    } else {
      this.initForm();
    }
  }

  loadPersonneByID(ID) {
    this.personnelService.readonePersonnel(ID).subscribe((reponse) => {
      this.listepersonnebydirection = reponse;
      this.vehiculeForm.controls["CarteDotationDirAffect"].setValue(
        this.listepersonnebydirection.LibelleDirection
      );
      this.vehiculeForm.controls["CarteDotationUserAffect"].setValue(
        this.listepersonnebydirection.NomPrenoms
      );
    });
  }

  TlisteCarteCarburantActive() {
    this.cartecarburantService
      .listCartecarburantactive()
      .subscribe((reponse) => {
        this.DataModel = reponse;
        this.listeData = this.DataModel.results;
        this.isLoadingResults = false;
      });
  }

  /*
 loadModelByMarques(Maqid) {
   this.vehiculeService.getMarqueModelebyMarqueId(Maqid).subscribe(reponse => {
     this.listemodelebymarques = reponse;
    
     });
 } 

 public changeMarque(event) {
   this.loadModelByMarques(event);
 }
*/

  //

  initForm() {
    this.vehiculeForm = this.formBuilder.group({
      AffectCaburantID: [""],
      DateAffectCaburant: ["", Validators.required],
      VehiculeAffectCaburant: ["", Validators.required],
      DirectionAffectCaburant: ["", Validators.required],
      DirectionBeneficAffectCaburant: [""],
      ActiviteAffectCaburant: ["", Validators.required],
      EmissionAffectCaburant: [""],
      CuvreAffectCaburant: [""],
      nbLitreAffectCaburant: ["", Validators.required],
      CarteApproNumcarte: [""],
      CarteDotationmensuel: [""],
      CarteDotationDirAffect: [""],
      CarteDotationUserAffect: [""],
      MontantAffectCaburant: [""],
      ObservationAffectCaburant: [""],
    });
  }

  onSubmitForm(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.Id_Utilisateur;
    const FormDataVeh = new FormData();
    FormDataVeh.append("ID", f.AffectCaburantID);
    FormDataVeh.append("DateAffectCaburant", f.DateAffectCaburant);
    FormDataVeh.append("VehiculeAffectCaburant", f.VehiculeAffectCaburant);
    FormDataVeh.append("DirectionAffectCaburant", f.DirectionAffectCaburant);

    FormDataVeh.append(
      "DirectionBeneficAffectCaburant",
      f.DirectionBeneficAffectCaburant
    );
    FormDataVeh.append("ActiviteAffectCaburant", f.ActiviteAffectCaburant);
    FormDataVeh.append("EmissionAffectCaburant", f.EmissionAffectCaburant);
    FormDataVeh.append("CuvreAffectCaburant", f.CuvreAffectCaburant);

    FormDataVeh.append("CarteApproNumcarte", f.CarteApproNumcarte);
    if (f.MontantAffectCaburant != "") {
      FormDataVeh.append("MontantAffectCaburant", f.MontantAffectCaburant);
    } else {
      FormDataVeh.append("MontantAffectCaburant", "0");
    }

    if (f.nbLitreAffectCaburant != "") {
      FormDataVeh.append("nbLitreAffectCaburant", f.nbLitreAffectCaburant);
    } else {
      FormDataVeh.append("nbLitreAffectCaburant", "0");
    }

    FormDataVeh.append(
      "ObservationAffectCaburant",
      f.ObservationAffectCaburant
    );
    FormDataVeh.append("authentification_ID", varID);
    if (f.AffectCaburantID != "") {
      //Nouveau;
      this.vehiculeService.updateEnergie(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.imagePreview = "";
            this.initForm();
            this.TlisteAffection();
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
      this.cartecarburantService
        .saveAffectationcarburant(FormDataVeh)
        .subscribe(
          (result) => {
            if (result.success == true) {
              this.reponse = result;
              this.toastr.success(result.message);
              this.imagePreview = "";
              this.initForm();
              this.TlisteAffection();
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
    this.cartecarburantService.getAffectationcarburantbyId(ID).subscribe((reponse) => {
      this.OneItem = reponse;
      this.vehiculeForm.controls["AffectCaburantID"].setValue(
        this.OneItem.results[0].ID
      );
      this.vehiculeForm.controls["designation"].setValue(
        this.OneItem.results[0].designation
      );
      this.vehiculeForm.controls["prix"].setValue(this.OneItem.results[0].prix);
      this.vehiculeForm.controls["dateprix"].setValue(
        this.OneItem.results[0].dateprix
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
    this.cartecarburantService.deleteAffectationcarburantbyId(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteAffection();
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
