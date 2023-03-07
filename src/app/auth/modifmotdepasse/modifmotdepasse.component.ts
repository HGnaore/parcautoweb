import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modifmotdepasse',
  templateUrl: './modifmotdepasse.component.html',
  styleUrls: ['./modifmotdepasse.component.scss'],
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
export class ModifmotdepasseComponent implements OnInit {

  modifFormGroup: FormGroup;
  reponse: any;
  isLoadingResults = false;
  erreurOld = false;
  erreurNew = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.modifFormGroup = this.formBuilder.group({
      Util_MdpOld: ['', Validators.required],
      Util_MdpNew: ['', Validators.required],
      Util_MdpNewR: ['', Validators.required]
    });
  }

  enregistrer(f) {
    this.isLoadingResults = true;
    this.erreurNew = false;
    this.erreurOld = false;

    if (f.Util_MdpNew !== f.Util_MdpNewR) {
      this.toastr.error('les deux mots de passes ne sont identique');
      this.isLoadingResults = false;
      this.erreurNew = true;
      return;
    }

    const modifData = new FormData();
    modifData.append('Util_MdpOld', f.Util_MdpOld);
    modifData.append('Util_MdpNew', f.Util_MdpNew);
    modifData.append('Id_Utilisateur', localStorage.getItem('id'));
    this.userService.modifmdp(modifData).subscribe(result => {
      this.reponse = result;
      switch (this.reponse.success) {
        case true: {
          // statements;
          this.toastr.success(result.message);
          window.location.href = '/admin';
          break;
        }
        case false: {
          // statements;
          this.toastr.error(result.message);
          if (result.results === 'OLD') {
            this.erreurOld = true;
          }
          break;
        }
        default: {
          // statements;
          this.toastr.error(result.message);
          break;
        }

      }
      this.isLoadingResults = false;
    }, () => {
      // erreur
      this.toastr.error('Erreur de connexion');
      this.isLoadingResults = false;
    });
  }

}
