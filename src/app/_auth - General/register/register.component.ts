import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

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

  constructor(
    private registerFormBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private location: Location) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerFormGroup = this.registerFormBuilder.group({
      Util_Nomprenoms: ['', Validators.required],
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

}
