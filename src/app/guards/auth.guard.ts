import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  reponse: any;
  repmessage: string;

  constructor(private authentificationService: AuthService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    var token = this.authentificationService.currentUserValue;
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
