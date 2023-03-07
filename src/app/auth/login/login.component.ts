import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';
import { ToastrService } from 'ngx-toastr';

 
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
  reponse1: any;
  UtilPremiereCnx;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private userService: UserService,
    public configService: ConfigService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  connexion(f) { 
    this.isLoadingResults = true; 
    const loginFormData = new FormData();
    loginFormData.append('Util_Email', f.userName);
    loginFormData.append('Util_Mdp', f.password);
    /*var body = {
      "userName":  f.userName,
      "password": f.password 
    };*/
      //console.log(body);
    this.authService.login(loginFormData).subscribe(result => {
      this.reponse = result;
      //this.router.navigate(['/tableaudebord']);
     this.UtilPremiereCnx =  JSON.parse(localStorage.getItem('Util_PremiereCnx'));
     if (this.UtilPremiereCnx == 1) {
      window.location.href = 'auth/firstpassword';
     } else {
      window.location.href = '/admin';
     }
     
    }, () => {
      localStorage.clear();
      this.afficheErreur = true;
      this.isLoadingResults = false;
    });

  }
}
