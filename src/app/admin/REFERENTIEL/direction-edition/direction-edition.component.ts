import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
/*import { DirectionService } from 'src/app/services/direction.service';*/

@Component({
  selector: 'app-direction-edition',
  templateUrl: './direction-edition.component.html',
  styleUrls: ['./direction-edition.component.scss'],
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
export class DirectionEditionComponent implements OnInit {

  directionForm: FormGroup;
  isLoadingResults = true;
  OneDirection: any = [];
  id: string;
  listeDirection: any = [];
  direction: any = [];
  afficheReinit = false;
  reponse: any;
  IDDir: string;
  libDir: string;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    /*private directionService: DirectionService*/
    ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadOneDirection();
  }

  initForm() {
    this.isLoadingResults = false;
    this.directionForm = this.formBuilder.group({
      code: ['', Validators.required],
      designation: ['', Validators.required],
      initial: [''],
      comment: ['']
    });
  }

  loadOneDirection() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.isLoadingResults = true;
     /* this.directionService.getOneDirection(this.id).subscribe(reponse => {
        this.OneDirection = reponse;
        this.directionForm.controls['code'].setValue(this.OneDirection.code);
        this.directionForm.controls['designation'].setValue(this.OneDirection.designation);
        this.directionForm.controls['initial'].setValue(this.OneDirection.initial);
        this.directionForm.controls['comment'].setValue(this.OneDirection.comment);
        this.isLoadingResults = false;
      });*/
    }
  }


  onSubmitForm(f) {
    this.isLoadingResults = true;
    var body = {
      "code": f.code,
      "designation": f.designation,
      "initial": f.designation,
      "comment": f.designation
    };

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != '0') {
      //Modification
     /* this.directionService.updateDirection(this.id, body).subscribe(result => {
        this.reponse = result;
        this.isLoadingResults = false;
        this.toastr.success("Modification terminée avec success");
        this.location.back();
      }, (ret) => {
        this.toastr.error(ret.message, "Erreur Code : " + ret.code);
        this.isLoadingResults = false;
      });
    } else {
      //Nouveau;
      this.directionService.saveDirection(body).subscribe(result => {
        this.reponse = result;
        this.isLoadingResults = false;
        this.toastr.success("Enregistrement terminé avec success");
        this.reinitform();
      }, (ret) => {
        this.toastr.error(ret.message, "Erreur Code : " + ret.code);
        this.isLoadingResults = false;
      });
    }
*/
  }

  }


 /* reinitform() {
    this.directionForm.controls['code'].reset();
    this.directionForm.controls['designation'].reset();
    this.directionForm.controls['initial'].reset();
    this.directionForm.controls['comment'].reset();
  }*/


}