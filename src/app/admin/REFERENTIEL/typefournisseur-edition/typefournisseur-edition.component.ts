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
  selector: 'app-typefournisseur-edition',
  templateUrl: './typefournisseur-edition.component.html',
  styleUrls: ['./typefournisseur-edition.component.scss'],
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
export class TypefournisseurEditionComponent implements OnInit {

  typefournisseurForm: FormGroup;
  isLoadingResults = true;
  OneTypeFournisseur: any = [];
  id: string;
  typefournisseur: any = [];
  afficheReinit = false;
  reponse: any;
  IDDir: string;
  libDir: string;


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
    this.loadOneTypeFournisseur();
  }

  initForm() {
    this.isLoadingResults = false;
    this.typefournisseurForm = this.formBuilder.group({
      code: ['', Validators.required],
      designation: ['', Validators.required]
    });
  }

  loadOneTypeFournisseur() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.isLoadingResults = true;
      this.fournisseurService.getOneTypeFournisseur(this.id).subscribe(reponse => {
        this.OneTypeFournisseur = reponse;
        this.typefournisseurForm.controls['code'].setValue(this.OneTypeFournisseur.code);
        this.typefournisseurForm.controls['designation'].setValue(this.OneTypeFournisseur.designation);
        this.isLoadingResults = false;
        console.log(reponse);
      });
    }
  }

  onSubmitForm(f) {
    this.isLoadingResults = true;
    var body = {
      "code": f.code,
      "designation": f.designation
    };

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != '0') {
      //Modification
      this.fournisseurService.updateTypeFournisseur(this.id, body).subscribe(result => {
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
      this.fournisseurService.saveTypeFournisseur(body).subscribe(result => {
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
    this.typefournisseurForm.controls['code'].reset();
    this.typefournisseurForm.controls['designation'].reset();
  }

}