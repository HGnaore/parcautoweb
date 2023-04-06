import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PiecesService } from "src/app/services/pieces.service";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-piece",
  templateUrl: "./piece.component.html",
  styleUrls: ["./piece.component.scss"],
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
export class PieceComponent implements OnInit {
  reponse: any;
  unePiece: any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 20, 30, 100];
  data: any = [];

  isTypeList: boolean = false;
  pieceGroup!: FormGroup;
  pieceTypeGroup!: FormGroup;
  allTypePiece: any;

  updatePiece: boolean = false;
  updatePieceType: boolean = false;

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  hidden = true;
  ActionClose = true;
  ActionOpen = false;
  ModifsLoadingResults = false;
  isLoadingResults = false;
  liste: any = [];

  displayedColumns: string[] = [
    "number",
    "designation",
    "typePiece",
    "nbjourlimite",
    "programable",
    "action",
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private builder: FormBuilder,
    private piecesService: PiecesService
  ) {
    this.initForm();
    this.dataSource = new MatTableDataSource(this.liste);
  }

  ngOnInit(): void {
    // this.initForm();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.getAllTypepiece();
    this.getAllPiece();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initForm() {
    this.pieceTypeGroup = this.builder.group({
      ID: [""],
      typePiece: ["", Validators.required],
    });

    this.pieceGroup = this.builder.group({
      ID: [""],
      designation: ["", Validators.required],
      nbreJours: [0],
      nbreKm: [0],
      typePiece: ["", Validators.required],
    });
  }

  getAllTypepiece() {
    this.piecesService.getAllTypepiece().subscribe((ret) => {
      this.reponse = ret;
      this.allTypePiece = this.reponse.results;
    });
  }

  getAllPiece() {
    this.piecesService.getAllPiece().subscribe((ret) => {
      this.reponse = ret;
      this.data = this.reponse.results;
      this.liste = this.reponse.results;
      this.dataSource.data = this.liste;
      this.isLoadingResults = false;
    });
  }

  getOnePiece(id) {
    this.OuvrirSimpleBouton();
    this.piecesService.getOnePiece(id).subscribe((ret) => {
      this.reponse = ret;
      this.unePiece = this.reponse.results;
      this.pieceGroup.controls["ID"].setValue(this.unePiece[0].ID);
      this.pieceGroup.controls["designation"].setValue(
        this.unePiece[0].designation
      );
      this.pieceGroup.controls["nbreJours"].setValue(
        this.unePiece[0].nbreJours
      );
      this.pieceGroup.controls["nbreKm"].setValue(this.unePiece[0].nbreKm);
      this.pieceGroup.controls["typePiece"].setValue(
        this.unePiece[0].typePiece
      );
    });
  }

  onSubmitPiece() {
    const formData = new FormData();
    const ID = this.pieceGroup.get("ID").value;
    formData.append("ID", ID);
    formData.append("typePiece", this.pieceGroup.get("typePiece").value);
    formData.append("designation", this.pieceGroup.get("designation").value);
    formData.append("nbreJours", this.pieceGroup.get("nbreJours").value);
    formData.append("nbreKm", this.pieceGroup.get("nbreKm").value);

    if (ID == "" || ID == null) {
      this.piecesService.savePiece(formData).subscribe((ret) => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          Swal.fire({
            title: "Succes!",
            text: this.reponse.message,
            icon: "success",
            confirmButtonText: "Ok",
          });
          this.pieceGroup.reset();
          this.getAllPiece();
        } else {
          Swal.fire({
            title: "Erreur !",
            text: this.reponse.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
    } else {
      this.piecesService.updatePiece(formData).subscribe((ret) => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          Swal.fire({
            title: "Succes!",
            text: this.reponse.message,
            icon: "success",
            confirmButtonText: "Ok",
          });
          this.pieceGroup.reset();
          this.getAllPiece();
        } else {
          Swal.fire({
            title: "Erreur !",
            text: this.reponse.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
    }
  }
  resetpieceform() {
    this.pieceGroup.reset();
  }

  resettypepieceform() {
    this.pieceTypeGroup.reset();
  }

  onSubmitPieceType() {
    const typepieceData = new FormData();
    const ID = this.pieceTypeGroup.get("ID")?.value;
    typepieceData.append("ID", ID);
    typepieceData.append(
      "typePiece",
      this.pieceTypeGroup.get("typePiece")?.value
    );
    this.piecesService.saveTypepiece(typepieceData).subscribe((ret) => {
      this.reponse = ret;
      if (this.reponse.success == true) {
        Swal.fire({
          title: "Succes!",
          text: this.reponse.message,
          icon: "success",
          confirmButtonText: "Ok",
        });
        this.pieceTypeGroup.reset();
        this.getAllTypepiece();
      } else {
        Swal.fire({
          title: "Erreur!",
          text: this.reponse.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    });
  }

  onDeletePieceType() {
    Swal.fire({
      title: "Voulez-vous vraiment supprimer cet type de pièces ?",
      showDenyButton: true,
      confirmButtonText: "Oui",
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // this.loading = true;
        // this.userService.deleteUser(id).subscribe(
        //   response => {
        //     // this.loading = false;
        //     if (response.success) {
        //       this.Toast.fire({
        //         icon: 'success',
        //         title: response.message
        //       })
        //     }
        //   }
        // );
      }
    });
  }

  /* questionSuppression(id) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette pièce ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeletePiece(id);
      }
    })
  }*/

  /**/ questionSuppression(id) {
    Swal.fire({
      title: "Vous allez supprimer le type d'entretien",
      text: "Etes-vous certain de vouloir le faire ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Non annuler",
      confirmButtonText: "Oui supprimer!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeletePiece(id);
      }
    });
  }

  onDeletePiece(id) {
    this.piecesService.deleteOne(id).subscribe((ret) => {
      this.reponse = ret;
      this.getAllPiece();
    });
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.data;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.data;
  }

  actionClose(f) {
    if (f != 1) {
      this.FermerForm();
    } else {
      this.OuvrirForm();
    }
  }

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

  /* initialisationFormulaire() {
    this.garageForm.reset();
    this.FermerForm();
  }*/

  OuvrirSimpleBouton() {
    this.hidden = false;
    this.ActionClose = false;
    this.ActionOpen = true;
  }

  initialisationFormulaire() {
    //this.garageForm.reset();
    this.FermerForm();
  }
}
