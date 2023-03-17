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
  varID = '';
  controlle = false;
  validationDetails = false;
  messagevalidationDetails = '';
  reponsevalidationDetails = false;

  details: any;
  undetails: any;

  typeentretienForm: FormGroup;
  typeentretiendetailsForm: FormGroup;

  //GESTION PAGINATION TABLE
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 20, 30, 100];
  data: any = [];
  //---
  //GESTION PAGINATION TABLE
  pageD: number = 1;
  countD: number = 0;
  tableSizeD: number = 3;
  tableSizesD: any = [3, 6, 12];
  dataD: any = [];
  //---

  searchValue = "";

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
      this.getAllDetailsByID(id);
    });
  }

  getAllDetailsByID(id) {
    this.entretienService.getAllDetailsTypeentretien(id).subscribe(ret => {
      this.reponse = ret;
      this.dataD = this.reponse.results;
    });
  }

  getOneDetailsByID(id) {
    this.validationDetails = false;
    this.entretienService.getOneDetailsTypeentretien(id).subscribe(ret => {
      this.reponse = ret;
      this.undetails = this.reponse.results[0];
      this.typeentretiendetailsForm.controls['ID'].setValue(this.undetails.ID);
      this.typeentretiendetailsForm.controls['designation'].setValue(this.undetails.designation);
    });
  }

  resetDetails() {
    this.typeentretiendetailsForm.reset();
    this.validationDetails = false;
  }

  questionSuppression(id) {
    Swal.fire({
      title: "Vous allez supprimer le type d'entretien",
      text: 'Etes-vous certain de vouloir le faire ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Non annuler',
      confirmButtonText: 'Oui supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteOneTypeentretien(id);
      }
    })
  }

  deleteOneTypeentretien(id) {
    this.entretienService.deleteOneTypeentretien(id).subscribe(ret => {
      this.reponse = ret;
      this.getAllTypeentretien();
    });
  }

  questionSuppressiondetails(id, idtype) {
    Swal.fire({
      title: "Vous allez supprimer le details",
      text: 'Etes-vous certain de vouloir le faire ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Non annuler',
      confirmButtonText: 'Oui supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteOneDetailsTypeentretien(id, idtype);
      }
    })
  }

  deleteOneDetailsTypeentretien(id, idtype) {
    const ID = this.typeentretienForm.get('ID')?.value;
    this.entretienService.deleteOneDetailsTypeentretien(id).subscribe(ret => {
      this.reponse = ret;
      this.getAllDetailsByID(idtype);
    });
  }


  ajoutDetails() {
    const ID = this.typeentretienForm.get('ID')?.value;
    const IDdetails = this.typeentretiendetailsForm.get('ID')?.value;
    const detailsData = new FormData();
    detailsData.append('ID', this.typeentretienForm.get('ID')?.value);
    detailsData.append('designation', this.typeentretiendetailsForm.get('designation')?.value);
    detailsData.append('IDdetails', IDdetails);


    if (ID == '' || ID == null) {
      this.validationDetails = true;
      this.messagevalidationDetails = 'Impossible d\'associer le Type d\'entretien';
      let n: number;
      n = setTimeout(function () { this.validationDetails = false; }, 500) as unknown as number;
      return;
    } 

    if (IDdetails == '' || IDdetails == null) {
      this.entretienService.savedetailstypeentretien(detailsData).subscribe(ret => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          this.reponsevalidationDetails = true;
          this.validationDetails = true;
          this.messagevalidationDetails = this.reponse.message;
          this.resetDetails();
          this.getAllDetailsByID(ID);
        } else {
          this.reponsevalidationDetails = false;
          this.validationDetails = true;
          this.messagevalidationDetails = this.reponse.message;
        }
      });
    } else {
      this.entretienService.updatedetailstypeentretien(detailsData).subscribe(ret => {
        this.reponse = ret;
        if (this.reponse.success == true) {
          this.reponsevalidationDetails = true;
          this.validationDetails = true;
          this.messagevalidationDetails = this.reponse.message;
          this.getAllDetailsByID(ID);
        } else {
          this.reponsevalidationDetails = false;
          this.validationDetails = true;
          this.messagevalidationDetails = this.reponse.message;
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
    this.resetDetails();
    this.dataD = [];
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
}
