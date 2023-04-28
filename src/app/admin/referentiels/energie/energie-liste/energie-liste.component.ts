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
import Swal from "sweetalert2";
@Component({
  selector: "app-energie-liste",
  templateUrl: "./energie-liste.component.html",
  styleUrls: ["./energie-liste.component.scss"],
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
export class EnergieListeComponent implements OnInit {
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
  listeEnergie: any = [];
  listeModele: any = [];
  displayedColumns: string[] = [
    "number",
    "designation",
    "dateprix",
    "prix",
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
  Modele: any = [];
  IDSuppression: any;
  addMarqueName: any;

  //GESTION PAGINATION TABLE
  pageD: number = 1;
  countD: number = 0;
  tableSizeD: number = 3;
  tableSizesD: any = [3, 6, 12];
  dataD: any = [];
  //---
  varEnergieID = false;
  hiddenTabSave = true;

  typeentretiendetailsForm: FormGroup;
  NameSuppression: any;

  constructor(
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private vehiculeService: VehiculeService
  ) {
    this.IDVehicule = this.route.snapshot.paramMap.get("id");
    this.initForm();
    this.dataSource = new MatTableDataSource(this.Energie);
    this.dataSourceModele = new MatTableDataSource(this.Modele);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.TlisteEnergie();
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

  //GESTION PAGINATION TABLE
  changeSizeD(value: string) {
    this.tableSizeD = +value;
  }

  onTableDataChangeD(event: any) {
    this.pageD = event;
    this.dataD;
  }

  onTableSizeChangeD(event: any): void {
    this.tableSizeD = event.target.value;
    this.pageD = 1;
    this.dataD;
  }
  //---

  TlisteEnergie() {
    this.vehiculeService.listeEnergie().subscribe((reponse) => {
      this.Energie = reponse;
      this.listeEnergie = this.Energie.results;
      this.dataSource.data = this.listeEnergie;
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

  initForm() {
    this.vehiculeForm = this.formBuilder.group({
      designation: ["", Validators.required],
      EnergieID: [""],
    });
    this.typeentretiendetailsForm = this.formBuilder.group({
      EnergieDetailID: [""],
      dateprix: ["", Validators.required],
      prix: ["", Validators.required],
      designationDetail: ["", Validators.required],
    });
  }

  onSubmitForm(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.Id_Utilisateur;
    const FormDataVeh = new FormData();
    FormDataVeh.append("ID", f.EnergieID);
    FormDataVeh.append("designation", f.designation);
    FormDataVeh.append("authentification_ID", varID);
    if (f.EnergieID != "") {
      //Nouveau;
      this.vehiculeService.updateEnergie(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.varEnergieID = false;
            this.initForm();
            this.TlisteEnergie();
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
      this.vehiculeService.saveEnergie(FormDataVeh).subscribe(
        (result) => {
          if (result.success == true) {
            this.reponse = result;
            this.toastr.success(result.message);
            this.varEnergieID = true;
            this.vehiculeForm.controls["EnergieID"].setValue(
              result.results.lastInsertId
            );
            this.typeentretiendetailsForm.controls["EnergieDetailID"].setValue(
              result.results.lastInsertId
            );
            this.typeentretiendetailsForm.controls["designationDetail"].disable(
              { onlySelf: true }
            );
            this.typeentretiendetailsForm.controls[
              "designationDetail"
            ].setValue(f.designation);
            this.hiddenTabSave = false;
            //this.initForm();
            this.TlisteEnergie();
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

  ajoutDetails(f) {
    this.isLoadingResults = true;
    const iD = JSON.parse(localStorage.getItem("currentUser"));
    const varID = iD.Id_Utilisateur;
    const FormDataVeh = new FormData();
    FormDataVeh.append("EnergieDetailID", f.EnergieDetailID);
    FormDataVeh.append("dateprix", f.dateprix);
    FormDataVeh.append("prix", f.prix);

    //Nouveau;
    this.vehiculeService.saveDetailEnergie(FormDataVeh).subscribe(
      (result) => {
        if (result.success == true) {
          this.reponse = result;
          this.toastr.success(result.message);
          this.resetDetails();
          this.getAllDetailsByID(f.EnergieDetailID);
          this.TlisteEnergie();
          this.isLoadingResults = false;
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

  getAllDetailsByID(id) {
    this.vehiculeService.getDetailTypeEnergiebyId(id).subscribe((ret) => {
      this.reponse = ret;
      this.dataD = this.reponse.results;
    });
  }

  resetDetails() {
    this.typeentretiendetailsForm.controls["dateprix"].setValue("");
    this.typeentretiendetailsForm.controls["prix"].setValue("");
  }

  loadOne(ID) {
    this.ModifsLoadingResults = true;
    this.OuvrirForm();
    this.vehiculeService.getEnergiebyId(ID).subscribe((reponse) => {
      this.OneItem = reponse;
      this.vehiculeForm.controls["EnergieID"].setValue(
        this.OneItem.results[0].IdAuto
      );
      this.vehiculeForm.controls["designation"].setValue(
        this.OneItem.results[0].designation
      );

      this.typeentretiendetailsForm.controls["EnergieDetailID"].setValue(
        this.OneItem.results[0].IdAuto
      );
      this.typeentretiendetailsForm.controls["designationDetail"].disable({
        onlySelf: true,
      });
      this.typeentretiendetailsForm.controls["designationDetail"].setValue(
        this.OneItem.results[0].designation
      );

      this.getAllDetailsByID(this.OneItem.results[0].IdAuto);
      this.varEnergieID = true;
      this.ModifsLoadingResults = false;
    });
  }
  // reccuper l'id à supprimer lors de l'ouverture du modal de question

  ItemSupprime(id, name) {
    this.IDSuppression = id;
    this.NameSuppression = name;
  }

  supprime() {
    if (this.NameSuppression == "Energie") {
      this.supprimeEnergie();
      return;
    } else if (this.NameSuppression == "detailEnergie") {
      this.supprimeDetailEnergie();
      return;
    } else {
    }
  } /**/

  // Supprime l'enregistrement
  supprimeEnergie() {
    this.vehiculeService.deleteEnergie(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.TlisteEnergie();
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

  supprimeDetailEnergie() {
    this.vehiculeService.deleteDetailEnergie(this.IDSuppression).subscribe(
      (reponse) => {
        this.toastr.success("Suppression terminée avec succès ! ");
        this.getAllDetailsByID(this.OneItem.results[0].IdAuto);
        this.TlisteEnergie();
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

  deleteOneTypeentretien(id) {
    /* this.entretienService.deleteOneTypeentretien(id).subscribe((ret) => {
    this.reponse = ret;
    this.getAllTypeentretien();
  });*/
  }

  questionSuppressiondetails(id, idtype) {
    /*Swal.fire({
   title: "Vous allez supprimer le details",
    text: "Etes-vous certain de vouloir le faire ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Non annuler",
    confirmButtonText: "Oui supprimer!",
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteOneDetailsTypeentretien(id, idtype);
    }
  });*/
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
    this.getAllDetailsByID("id");
    this.varEnergieID = false;
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
