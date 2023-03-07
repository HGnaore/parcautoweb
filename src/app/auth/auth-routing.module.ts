import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstpasswordComponent } from './firstpassword/firstpassword.component';
import { LoginComponent } from './login/login.component';
import { MdpoublieComponent } from './mdpoublie/mdpoublie.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mdpoublie', component: MdpoublieComponent },
  { path: 'firstpassword', component: FirstpasswordComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
