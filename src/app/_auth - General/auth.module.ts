import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MdpoublieComponent } from './mdpoublie/mdpoublie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifmotdepasseComponent } from './modifmotdepasse/modifmotdepasse.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, MdpoublieComponent, ModifmotdepasseComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
