import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MdpoublieComponent } from './auth/mdpoublie/mdpoublie.component';
import { ModifmotdepasseComponent } from './auth/modifmotdepasse/modifmotdepasse.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { StatComponent } from './StatistiqueCmidi/stat/stat.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
  { path: 'mdpoublie', component: MdpoublieComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'modifmdp', component: ModifmotdepasseComponent },
  { path: 'Statcmidi', component: StatComponent },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
