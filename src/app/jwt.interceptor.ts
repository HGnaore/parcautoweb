import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class JwtInterceptor  implements HttpInterceptor {

  constructor(private authentificationService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser: any = this.authentificationService.currentUserValue;
    //console.log(currentUser);
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + currentUser.token
        }
      });
     // console.log(request);
    }
    //console.log(request);
    return next.handle(request);
  }
}
