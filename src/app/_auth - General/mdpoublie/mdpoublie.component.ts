import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mdpoublie',
  templateUrl: './mdpoublie.component.html',
  styleUrls: ['./mdpoublie.component.scss'],
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
export class MdpoublieComponent implements OnInit {

  mdpoubliFormGroup: FormGroup;
  reponse: any;
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.mdpoubliFormGroup = this.formBuilder.group({
      Util_Email: ['', Validators.email]
    });
  }

  envoyer(f) {
    this.isLoadingResults = true;
    const mdpoublieData = new FormData();
    mdpoublieData.append('Util_Email', f.Util_Email);
    this.userService.mdpoublie(mdpoublieData).subscribe(result => {
      this.reponse = result;
      switch (this.reponse.success) {
        case true:
          this.toastr.success(this.reponse.message);
          this.isLoadingResults = false;
          this.router.navigateByUrl('/login');
          break;
        case false:
          this.toastr.error(this.reponse.message);
          this.isLoadingResults = false;
          break;
        default:
          this.toastr.error(this.reponse.message);
          this.isLoadingResults = false;
          break;
      }
    }, () => {
      // erreur
      this.toastr.error('Erreur de connexion');
      this.isLoadingResults = false;
    });
  }

}
