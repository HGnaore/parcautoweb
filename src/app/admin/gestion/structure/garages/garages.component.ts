import { Component, OnInit } from '@angular/core';
import { GaragesService } from 'src/app/services/garages.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.scss']
})
export class GaragesComponent implements OnInit {

  garages: any;
  reponse: any;

  //FORMULAIRE
  garageForm: FormGroup;

  //GESTION PAGINATION TABLE
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 20, 30, 100];
  data: any = [];
  //---

  searchValue = "";

  constructor(private garagesService: GaragesService,
    private formBuilder: FormBuilder) {
    this.garageForm = this.formBuilder.group({
      ID: [''],
      designation: ['', Validators.required],
      localisation: ['', Validators.required],
      fixe: ['', Validators.required],
      portable: ['', Validators.required],
      email: [''],
      fax: [''],
      pf_nomprenoms: [''],
      pf_portable: [''],
      pf_email: ['']
    });
  }

  ngOnInit(): void {
    this.getAllGarage();
  }

  enconstruction() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'En construction',
      text: "La liste des factures du garage",
      showConfirmButton: false,
      timer: 1500
    })
  }

  getAllGarage() {
    this.garagesService.getAllGarage().subscribe(ret => {
      this.reponse = ret;
      this.data = this.reponse.results;
    });
  }

  getOneGarage(id) {
    this.garagesService.getOneGarage(id).subscribe(ret => {
      this.reponse = ret;
      this.garageForm.controls['ID'].setValue(this.reponse.results[0].ID);
      this.garageForm.controls['designation'].setValue(this.reponse.results[0].designation);
      this.garageForm.controls['localisation'].setValue(this.reponse.results[0].localisation);
      this.garageForm.controls['fixe'].setValue(this.reponse.results[0].fixe);
      this.garageForm.controls['portable'].setValue(this.reponse.results[0].portable);
      this.garageForm.controls['email'].setValue(this.reponse.results[0].email);
      this.garageForm.controls['fax'].setValue(this.reponse.results[0].fax);
      this.garageForm.controls['pf_nomprenoms'].setValue(this.reponse.results[0].pf_nomprenoms);
      this.garageForm.controls['pf_portable'].setValue(this.reponse.results[0].pf_portable);
      this.garageForm.controls['pf_email'].setValue(this.reponse.results[0].pf_email);
    });
  }

  deleteOneGarage(id) {
    this.garagesService.deleteGarage(id).subscribe(ret => {
      this.reponse = ret;
      if (this.reponse.success == true) {
        Swal.fire({
          title: 'Succes!',
          text: this.reponse.message,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.getAllGarage();
        this.initialisationFormulaire();
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

  questionSuppression(id) {
    Swal.fire({
      title: 'Etes-vous certain de vouloir le faire ?',
      text: "Vous allez supprimer le garage",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Non annuler',
      confirmButtonText: 'Oui supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteOneGarage(id);
      }
    })
  }

  saveGarage() {
    const id = this.garageForm.get('ID')?.value;
    const garageData = new FormData();
    garageData.append('ID', this.garageForm.get('ID')?.value);
    garageData.append('designation', this.garageForm.get('designation')?.value);
    garageData.append('localisation', this.garageForm.get('localisation')?.value);
    garageData.append('fixe', this.garageForm.get('fixe')?.value);
    garageData.append('portable', this.garageForm.get('portable')?.value);
    garageData.append('email', this.garageForm.get('email')?.value);
    garageData.append('fax', this.garageForm.get('fax')?.value);
    garageData.append('pf_nomprenoms', this.garageForm.get('pf_nomprenoms')?.value);
    garageData.append('pf_portable', this.garageForm.get('pf_portable')?.value);
    garageData.append('pf_email', this.garageForm.get('pf_email')?.value);

    if (id == '') {
      this.garagesService.saveGarage(garageData).subscribe(ret => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          Swal.fire({
            title: 'Succes!',
            text: this.reponse.message,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.getAllGarage();
          this.initialisationFormulaire();
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
      this.garagesService.updateGarage(garageData).subscribe(ret => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          Swal.fire({
            title: 'Succes!',
            text: this.reponse.message,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.getAllGarage();
          this.initialisationFormulaire();
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

  initialisationFormulaire() {
    this.garageForm.reset();
  }


  //GESTION PAGINATION TABLE
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
  //---
}
