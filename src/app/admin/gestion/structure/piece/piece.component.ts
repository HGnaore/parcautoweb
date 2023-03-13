import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 20, 30, 100];
  data: any = [];

  isTypeList: boolean = false;
  pieceGroup!: FormGroup;
  pieceTypeGroup!: FormGroup;

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
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm() {
    this.pieceGroup = this.builder.group({
      id: [''],
      type: ['', Validators.required],
      libelle: ['', Validators.required],
      jrAvtRechange: ['1', Validators.required],
      kmAvtRechange: ['1', Validators.required],
    });

    this.pieceTypeGroup = this.builder.group({
      id: [''],
      libelle: ['', Validators.required],
    });
  }

  onSubmitPiece() {
    const formData = new FormData();

    formData.append('', this.pieceGroup.get('id').value);
    formData.append('', this.pieceGroup.get('type').value);
    formData.append('', this.pieceGroup.get('libelle').value);
    formData.append('', this.pieceGroup.get('jrAvtRechange').value);
    formData.append('', this.pieceGroup.get('kmAvtRechange').value);

    if (!this.updatePiece) {
      this.Toast.fire({
        icon: 'success',
        title: 'response.message'
      })
    }
    else {
      Swal.fire({
        title: 'Voulez-vous vraiment modifier cette pièce ?',
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
      this.pieceGroup.reset();
      this.updatePiece = false;
    }
  }

  onSubmitPieceType() {
    const formData = new FormData();

    formData.append('', this.pieceTypeGroup.get('id').value);
    formData.append('', this.pieceTypeGroup.get('libelle').value);

    if (!this.updatePieceType) {
      this.Toast.fire({
        icon: 'success',
        title: 'response.message'
      })
    }
    else {
      Swal.fire({
        title: 'Voulez-vous vraiment modifier cet type de pièces ?',
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
      this.pieceTypeGroup.reset();
      this.updatePieceType = false;
    }
  }

  onUpdatePiece(piece: any) {
    this.updatePiece = true;

    this.pieceGroup.patchValue({
      id: piece.id,
      type: piece.type,
      libelle: piece.libelle,
      jrAvtRechange: piece.jrAvtRechange,
      kmAvtRechange: piece.jrAvtRechange,
    });
  }

  onUpdatePieceType(pieceType: any) {
    this.updatePieceType = true;

    this.pieceTypeGroup.patchValue({
      id: pieceType.id,
      libelle: pieceType.libelle,
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

  onDeletePiece() {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette pièce ?',
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
