import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-firstpassword',
  templateUrl: './firstpassword.component.html',
  styleUrls: ['./firstpassword.component.scss'],
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

export class FirstpasswordComponent implements OnInit {



  loginFormGroup: FormGroup;
  afficheErreur = false;
  isLoadingResults = false;
  reponse: any;
  reponse1: any;
  UtilPremiereCnx;
  Myemail: any;
  mail = JSON.parse(localStorage.getItem('currentUser'));
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
     this.Myemail = this.mail.Util_Email;
    this.loginFormGroup.controls['Util_Email'].setValue(this.Myemail);
   
  }


  initForm() {
    this.loginFormGroup = this.formBuilder.group({
      Util_Email: ['', Validators.required],
      Util_MdpOld: ['', Validators.required],
      Util_MdpNew: ['', Validators.required],
    });
  }


  connexion(f) {
    this.isLoadingResults = true;
    const loginFormData = new FormData();
    loginFormData.append('Util_Email', f.Util_Email);
    loginFormData.append('Util_MdpOld', f.Util_MdpOld);
    loginFormData.append('Util_MdpNew', f.Util_MdpNew);
    /*var body = {
      "userName":  f.userName,
      "password": f.password 
    };*/
      //console.log(body);
    this.authService.UpdateFirstpassword(loginFormData).subscribe(result => {
      if (result.statut==true) { 
        this.reponse = result;
        this.toastr.success(result.message);
        window.location.href = 'auth/login';
       localStorage.clear();
        }
        else{
        this.toastr.error(result.message);
        this.isLoadingResults = false;
        }
      //this.router.navigate(['/tableaudebord']);
    /* this.UtilPremiereCnx = localStorage.getItem('Util_PremiereCnx');
     if (this.UtilPremiereCnx = 1) {
      window.location.href = 'auth/firstpassword';
     } else {
      window.location.href = '/admin';
     }*/
     
    }, () => {
      localStorage.clear();
      this.afficheErreur = true;
      this.isLoadingResults = false;
    });

  }
}
