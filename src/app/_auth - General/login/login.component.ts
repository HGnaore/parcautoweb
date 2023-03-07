import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  afficheErreur = false;
  isLoadingResults = false;
  reponse: any;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.loginFormGroup = this.formBuilder.group({
      Util_Email: ['', Validators.email],
      Util_Mdp: ['', Validators.required],
      sesouvenirdemoi: ['']
    });
  }


  connexion(f) {
    this.isLoadingResults = true;
    const loginFormData = new FormData();
    loginFormData.append('Util_Email', f.Util_Email);
    loginFormData.append('Util_Mdp', f.Util_Mdp);
    loginFormData.append('sesouvenirdemoi', f.sesouvenirdemoi);
    this.authService.login(loginFormData).subscribe(result => {
      this.reponse = result;
      switch (this.reponse.success) {
        case true: {
          // statements;
          localStorage.setItem('isConnected', 'true');
          localStorage.setItem('jwt', this.reponse.results.jwt);
          localStorage.setItem('email', this.reponse.results.Util_Email);
          localStorage.setItem('nomprenoms', this.reponse.results.Util_Nomprenoms);
          localStorage.setItem('id', this.reponse.results.Id_Utilisateur);
          localStorage.setItem('premierecnx', this.reponse.results.Util_PremiereCnx);
          localStorage.setItem('image', this.reponse.results.Util_image);
          if (this.reponse.results.Util_PremiereCnx === '1') {
            window.location.href = '/modifmdp';
          } else {
            window.location.href = '/admin';
          }

          // this.router.navigateByUrl('/admin');

          /*  setTimeout(() => {
              this.router.navigateByUrl('/admin');
            }, 300);*/

          break;
        }
        case false: {
          // statements;
          localStorage.clear();
          this.afficheErreur = true;
          break;
        }
        default: {
          // statements;
          localStorage.clear();
          localStorage.setItem('isConnected', 'false');
          /*localStorage.removeItem('jwt');
          localStorage.removeItem('email');
          localStorage.removeItem('nomprenoms');
          localStorage.removeItem('id');*/
          this.afficheErreur = true;
          break;
        }

      }
      this.isLoadingResults = false;

    }, () => {
      /* localStorage.removeItem('isConnected');
       localStorage.removeItem('jwt');
       localStorage.removeItem('email');
       localStorage.removeItem('nomprenoms');
       localStorage.removeItem('id');*/
      localStorage.clear();
      this.afficheErreur = true;
      this.isLoadingResults = false;

    });

  }
}
