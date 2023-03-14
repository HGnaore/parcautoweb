import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntretienService } from 'src/app/services/entretien.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-entretien',
  templateUrl: './type-entretien.component.html',
  styleUrls: ['./type-entretien.component.scss']
})

export class TypeEntretienComponent implements OnInit {

  reponse: any;
  data: any;
  varID = '';
  controlle = false;

  typeentretienForm: FormGroup;
  typeentretiendetailsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private entretienService: EntretienService,
  ) {
    this.typeentretienForm = this.formBuilder.group(
      {
        ID: [''],
        designation: ['', Validators.required],
        controlle: [0],
        nbjourlimite: [0],
        programable: [0],
        intervaljourprog: [0]
      }
    );
    this.typeentretiendetailsForm = this.formBuilder.group({
      ID: [''],
      designation: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllTypeentretien();
  }

  setColor(val) {
    if (val == 1) {
      return "text-success";
    } else {
      return "text-danger";
    }
  }

  getAllTypeentretien() {
    this.entretienService.getAllTypeentretien().subscribe(ret => {
      this.reponse = ret;
      this.data = this.reponse.results;
    });
  }

  activeDetails(id) {
    this.entretienService.getOneTypeentretienByIdAuto(id).subscribe(ret => {
      this.reponse = ret;

      this.typeentretienForm.controls['ID'].setValue(this.reponse.results[0].ID);
      this.typeentretienForm.controls['designation'].setValue(this.reponse.results[0].designation);
      this.typeentretienForm.controls['controlle'].setValue(this.reponse.results[0].controlle);
      this.typeentretienForm.controls['nbjourlimite'].setValue(this.reponse.results[0].nbjourlimite);
      this.typeentretienForm.controls['programable'].setValue(this.reponse.results[0].programable);

      this.getAllTypeentretien();
    });
  }

  getOneTypeentretien(id) {
    this.entretienService.getOneTypeentretienById(id).subscribe(ret => {
      this.reponse = ret;

      this.typeentretienForm.controls['ID'].setValue(this.reponse.results[0].ID);
      this.typeentretienForm.controls['designation'].setValue(this.reponse.results[0].designation);
      this.typeentretienForm.controls['controlle'].setValue(this.reponse.results[0].controlle);
      this.typeentretienForm.controls['nbjourlimite'].setValue(this.reponse.results[0].nbjourlimite);
      this.typeentretienForm.controls['programable'].setValue(this.reponse.results[0].programable);
    });
  }

  ajoutDetails() {
    const ID = this.typeentretienForm.get('ID')?.value;
    const IDdetails = this.typeentretiendetailsForm.get('ID')?.value;
    const detailsData = new FormData();
    detailsData.append('ID', this.typeentretienForm.get('ID')?.value);
    detailsData.append('designation', this.typeentretiendetailsForm.get('designation')?.value);
    if (ID == '' || ID == null) {
      Swal.fire({
        title: 'Erreur !',
        text: 'Impossible d\'associer le Type d\'entretien',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    } else {

    }

    if (IDdetails == '' || IDdetails == null) {
      this.entretienService.savedetailstypeentretien(detailsData).subscribe(ret => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          //////////////////////////////////////////

          Swal.fire({
            title: this.reponse.message,
            text: "Voulez-vous ajouter des détails ?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Non ',
            confirmButtonText: 'Oui je veux ajouter des détails'
          }).then((result) => {
            if (result.isConfirmed) {
              this.activeDetails(this.reponse.results);
            } else {
              this.getAllTypeentretien();
              this.reinitialiseForm();
            }
          })

          //////////////////////////////////////

        } else {
          Swal.fire({
            title: 'Echec!',
            text: this.reponse.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    } else {
      this.entretienService.updatedetailstypeentretien(detailsData).subscribe(ret => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          Swal.fire({
            title: 'Succes!',
            text: this.reponse.message,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.getAllTypeentretien();
          this.reinitialiseForm();
        } else {
          Swal.fire({
            title: 'Echec!',
            text: this.reponse.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }


  enregistrer() {
    const ID = this.typeentretienForm.get('ID')?.value;
    var controlle = this.typeentretienForm.get('controlle')?.value;
    var programable = this.typeentretienForm.get('programable')?.value;
    if (controlle == true) {
      controlle = 1;
    } else {
      controlle = 0;
    }
    if (programable == true) {
      programable = 1;
    } else {
      programable = 0;
    }
    const typeentretienData = new FormData();
    typeentretienData.append('ID', this.typeentretienForm.get('ID')?.value);
    typeentretienData.append('designation', this.typeentretienForm.get('designation')?.value);
    typeentretienData.append('controlle', controlle);
    typeentretienData.append('nbjourlimite', this.typeentretienForm.get('nbjourlimite')?.value);
    typeentretienData.append('programable', programable);
    typeentretienData.append('intervaljourprog', '0');

    if (ID == '' || ID == null) {
      this.entretienService.saveTypeentretient(typeentretienData).subscribe(ret => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          //////////////////////////////////////////

          Swal.fire({
            title: this.reponse.message,
            text: "Voulez-vous ajouter des détails ?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Non ',
            confirmButtonText: 'Oui je veux ajouter des détails'
          }).then((result) => {
            if (result.isConfirmed) {
              this.activeDetails(this.reponse.results);
            } else {
              this.getAllTypeentretien();
              this.reinitialiseForm();
            }
          })

          //////////////////////////////////////

        } else {
          Swal.fire({
            title: 'Echec!',
            text: this.reponse.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    } else {
      this.entretienService.updateTypeentretient(typeentretienData).subscribe(ret => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          Swal.fire({
            title: 'Succes!',
            text: this.reponse.message,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.getAllTypeentretien();
          this.reinitialiseForm();
        } else {
          Swal.fire({
            title: 'Echec!',
            text: this.reponse.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }

  reinitialiseForm() {
    this.typeentretienForm.reset();
    this.typeentretienForm.controls['nbjourlimite'].setValue(0);
  }
}
