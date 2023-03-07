import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-fournisseur-edition',
  templateUrl: './fournisseur-edition.component.html',
  styleUrls: ['./fournisseur-edition.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(1000, style({ opacity: 0 })))
    ])
  ]
})
export class FournisseurEditionComponent implements OnInit {

  fournisseurForm: FormGroup;
  isLoadingResults = true;
  OneFournisseur: any = [];
  id: string;
  fournisseur: any = [];
  afficheReinit = false;
  reponse: any;
  IDDir: string;
  libDir: string;

  listeTypefournisseurs: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private fournisseurService: FournisseurService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initForm();
  }

  ngOnInit() {
    this.listeTypefournisseur();
    this.loadOneFournisseur();

  }

  initForm() {
    this.isLoadingResults = false;
    this.fournisseurForm = this.formBuilder.group({
      code: ['', Validators.required],
      designation: ['', Validators.required],
      typeFournisseurId: ['', Validators.required],
      localisation: [''],
      telephone: [''],
      email: [''],
      contactNomPrenoms: [''],
      contactFonction: [''],
      contactTelephone: [''],
      contactEmail: ['']
    });
  }

  listeTypefournisseur() {
    this.fournisseurService.listeTypeFournisseur().subscribe(reponse => {
      this.listeTypefournisseurs = reponse;
      this.isLoadingResults = false;
      console.log(this.listeTypefournisseurs);
    });
  }

  loadOneFournisseur() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.isLoadingResults = true;
      this.fournisseurService.getOneFournisseur(this.id).subscribe(reponse => {
        this.OneFournisseur = reponse;
        this.fournisseurForm.controls['code'].setValue(this.OneFournisseur.code);
        this.fournisseurForm.controls['designation'].setValue(this.OneFournisseur.designation);
        this.fournisseurForm.controls['typeFournisseurId'].setValue(this.OneFournisseur.typeFournisseurId);
        this.fournisseurForm.controls['localisation'].setValue(this.OneFournisseur.localisation);
        this.fournisseurForm.controls['telephone'].setValue(this.OneFournisseur.telephone);
        this.fournisseurForm.controls['email'].setValue(this.OneFournisseur.email);
        this.fournisseurForm.controls['contactNomPrenoms'].setValue(this.OneFournisseur.contactNomPrenoms);
        this.fournisseurForm.controls['contactFonction'].setValue(this.OneFournisseur.contactFonction);
        this.fournisseurForm.controls['contactTelephone'].setValue(this.OneFournisseur.contactTelephone);
        this.fournisseurForm.controls['contactEmail'].setValue(this.OneFournisseur.contactEmail);
        this.isLoadingResults = false;
        console.log(reponse);
      });
    }
  }

  onSubmitForm(f) {
    this.isLoadingResults = true;
    var body = {
      "code": f.code,
      "designation": f.designation,
      "typeFournisseurId": f.typeFournisseurId,
      "localisation": f.localisation,
      "telephone": f.telephone,
      "email": f.email,
      "contactNomPrenoms": f.contactNomPrenoms,
      "contactFonction": f.contactFonction,
      "contactTelephone": f.contactTelephone,
      "contactEmail": f.contactEmail
    };

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != '0') {
      //Modification
      this.fournisseurService.updateFournisseur(this.id, body).subscribe(result => {
        this.reponse = result;
        this.isLoadingResults = false;
        this.toastr.success("Modification terminée avec success");
        this.location.back();
      }, (ret) => {
        this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
        this.isLoadingResults = false;
      });
    } else {
      //Nouveau;
      this.fournisseurService.saveFournisseur(body).subscribe(result => {
        this.reponse = result;
        this.isLoadingResults = false;
        this.toastr.success("Enregistrement terminé avec success");
        this.reinitform();
      }, (ret) => {
        this.toastr.error(ret.error.message + ' : ' + ret.error.description + '[' + ret.message + ']', "Erreur Code : " + ret.error.code);
        this.isLoadingResults = false;
      });
    }

  }

  reinitform() {
    this.fournisseurForm.controls['code'].reset();
    this.fournisseurForm.controls['designation'].reset();
    this.fournisseurForm.controls['typeFournisseurId'].reset();
    this.fournisseurForm.controls['localisation'].reset();
    this.fournisseurForm.controls['telephone'].reset();
    this.fournisseurForm.controls['email'].reset();
    this.fournisseurForm.controls['contactNomPrenoms'].reset();
    this.fournisseurForm.controls['contactFonction'].reset();
    this.fournisseurForm.controls['contactTelephone'].reset();
    this.fournisseurForm.controls['contactEmail'].reset();
  }

}