import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PiecesService } from 'src/app/services/pieces.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
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
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(
    private builder: FormBuilder,
    private piecesService: PiecesService
  ) {
    this.pieceTypeGroup = this.builder.group({
      ID: [''],
      typePiece: ['', Validators.required],
    });

    this.pieceGroup = this.builder.group({
      ID: [''],
      designation: ['', Validators.required],
      nbreJours: [0],
      nbreKm: [0],
      typePiece: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm() {
    this.getAllTypepiece();
    this.getAllPiece();
  }

  getAllTypepiece() {
    this.piecesService.getAllTypepiece().subscribe(ret => {
      this.reponse = ret;
      this.allTypePiece = this.reponse.results;
    });
  }

  getAllPiece() {
    this.piecesService.getAllPiece().subscribe(ret => {
      this.reponse = ret;
      this.data = this.reponse.results;
    });
  }

  getOnePiece(id) {
    this.piecesService.getOnePiece(id).subscribe(ret => {
      this.reponse = ret;
      this.unePiece = this.reponse.results;
      this.pieceGroup.controls['ID'].setValue(this.unePiece[0].ID);
      this.pieceGroup.controls['designation'].setValue(this.unePiece[0].designation);
      this.pieceGroup.controls['nbreJours'].setValue(this.unePiece[0].nbreJours);
      this.pieceGroup.controls['nbreKm'].setValue(this.unePiece[0].nbreKm);
      this.pieceGroup.controls['typePiece'].setValue(this.unePiece[0].typePiece);

    });
  }

  onSubmitPiece() {
    const formData = new FormData();
    const ID = this.pieceGroup.get('ID').value;
    formData.append('ID', ID);
    formData.append('typePiece', this.pieceGroup.get('typePiece').value);
    formData.append('designation', this.pieceGroup.get('designation').value);
    formData.append('nbreJours', this.pieceGroup.get('nbreJours').value);
    formData.append('nbreKm', this.pieceGroup.get('nbreKm').value);

    if (ID == '' || ID == null) {
      this.piecesService.savePiece(formData).subscribe(ret => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          Swal.fire({
            title: 'Succes!',
            text: this.reponse.message,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.pieceGroup.reset();
          this.getAllPiece();
        } else {
          Swal.fire({
            title: 'Erreur !',
            text: this.reponse.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }

      });
    } else {
      this.piecesService.updatePiece(formData).subscribe(ret => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          Swal.fire({
            title: 'Succes!',
            text: this.reponse.message,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.pieceGroup.reset();
          this.getAllPiece();
        } else {
          Swal.fire({
            title: 'Erreur !',
            text: this.reponse.message,
            icon: 'error',
            confirmButtonText: 'Ok'
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
    const ID = this.pieceTypeGroup.get('ID')?.value;
    typepieceData.append('ID', ID);
    typepieceData.append('typePiece', this.pieceTypeGroup.get('typePiece')?.value);
    this.piecesService.saveTypepiece(typepieceData).subscribe(ret => {
      this.reponse = ret;
      if (this.reponse.success == true) {
        Swal.fire({
          title: 'Succes!',
          text: this.reponse.message,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.pieceTypeGroup.reset();
        this.getAllTypepiece();
      }
      else {
        Swal.fire({
          title: 'Erreur!',
          text: this.reponse.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }



  onDeletePieceType() {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet type de pièces ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
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
    })
  }

  questionSuppression(id) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette pièce ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.onDeletePiece(id);
      }
    })
  }

  onDeletePiece(id) {
    this.piecesService.deleteOne(id).subscribe(ret => {
      this.reponse = ret;

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

}
