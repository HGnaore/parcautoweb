import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { EnvoimailService } from '../../services/envoimail.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  isLoadingResults = false;
  erreurOld = false;
  reponse: any;
  affichexit = false;
  infoFormData = new FormData();
  email: string;
  affichok = false;
  constructor(
    private registerFormBuilder: FormBuilder,
    private userService: UserService,
    private envoimailservice: EnvoimailService,
    private toastr: ToastrService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerFormGroup = this.registerFormBuilder.group({
      /* Util_Mdp: ['', Validators.required],
       Util_RMdp: ['', Validators.required],*/
      Util_Email: ['', Validators.email]
    });
  }

  enregistrer(f) {
    this.isLoadingResults = true;
    const registerFormData = new FormData();
    registerFormData.append('Util_Nomprenoms', f.Util_Nomprenoms);
    registerFormData.append('Util_Email', f.Util_Email);
    this.userService.demandeEnr(registerFormData).subscribe(result => {
      switch (result.success) {
        case true:
          this.toastr.success(result.message);
          this.isLoadingResults = false;
          this.location.back();
          break;

        case false:
          this.toastr.error(result.message);
          this.isLoadingResults = false;
          break;

        default:
          this.toastr.error(result.message);
          this.isLoadingResults = false;
          break;
      }
    }, () => {
      // erreur de connexion
      this.toastr.error('Erreur de connexion');
      this.isLoadingResults = false;
    });

  }

  verificationmdp(f) {
    this.erreurOld = false;
    this.isLoadingResults = true;
    if (f.Util_Mdp !== f.Util_RMdp) {
      alert('Les mots de passe ne sont pas identique !!!');
      this.erreurOld = true;
      this.isLoadingResults = false;
      return;
    } else {
      this.verificationemailtrombino(f.Util_Email);
    }
  }

  verificationemailtrombino(email) {
    this.userService.verifemailtrombino(email).subscribe(ret => {
      this.reponse = ret;
      if (this.reponse === 0) {
        this.toastr.error('Email n\'existe pas !', 'Rapprocher vous du service support au 911');
        this.isLoadingResults = false;
      } else {
        // reccuperation des données de trombino
        this.infoFormData.append('Util_Nomprenoms', this.reponse.NomPrenoms);
        this.infoFormData.append('Util_Email', this.reponse.Email);
        this.infoFormData.append('Util_IDDirection', this.reponse.DirectionId);
        this.infoFormData.append('Util_tech', '0');
        this.infoFormData.append('Util_Direction', '');
        this.infoFormData.append('Util_telephone', this.reponse.Mobile);
        this.infoFormData.append('Util_Poste', this.reponse.TelBureau);
        this.infoFormData.append('Util_Admin', '0');
        this.infoFormData.append('Util_BP', '0');

        // verification dans la base de NEO
        this.verificationemaillocal(email);
        this.isLoadingResults = false;

      }
    }, () => {
      this.toastr.error('Erreur de connexion');
    });
  }

  verificationemaillocal(email) {
    this.userService.verifemaillocal(email).subscribe(ret => {
      this.reponse = ret;
      if (this.reponse.success === true) {
        // l'email exite deja dans NEO
        this.affichexit = true;
      } else {
        // creation du compte en local
        this.email = email;
        this.onSubmitForm(this.infoFormData);
      }
    });


  }



  onSubmitForm(f) {
    this.isLoadingResults = true;
    this.userService.creatUtilisateur(this.infoFormData).subscribe(result => {
      switch (result.success) {
        case true: {
          // statements;
          this.toastr.success(result.message);
          this.envoimail(this.email);
          this.affichok = true;
          break;
        }
        case false: {
          // statements;
          this.toastr.error(result.message);
          break;
        }
        default: {
          // statements;
          this.toastr.error('Erreur de connexion au serveur', 'Le compte n\'a pas été activé');
          break;
        }

      }
      this.isLoadingResults = false;

    }, () => {
      this.toastr.error('Erreur de connexion au serveur', 'Le compte n\'a pas été activé');
      this.isLoadingResults = false;
    });
  }

  envoimail(email) {
    this.envoimailservice.creatUtilisateur(email).subscribe(res => {
      if (res.success = true) {
        this.toastr.success('Le mail a été envoyé !');
      }

    });
  }

}
