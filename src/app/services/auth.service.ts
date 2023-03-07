import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { utf8Encode } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlG: string;
  urlT: string;
  urlGWorflowapi:string;
  private concurentUserSubject: BehaviorSubject<object>;
  public currentUser: Observable<object>;



  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient) {
    this.urlG = this.configService.urlgRTI;
    this.urlGWorflowapi = this.configService.urlWorflowapi;
    this.concurentUserSubject = new BehaviorSubject<object>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.concurentUserSubject.asObservable();
    
    
  }

  public get currentUserValue(): object {
    return this.concurentUserSubject.value;
  }

/*
  let entetes = new HttpHeaders();
//L'écriture suivante ne fonctionne pas car l'objet ne changera pas
entetes.set('Accept-Encoding', 'gzip, deflate, sdch');
//Voici l'écriture correcte, il faut retourner l'objet dans une variable pour obtenir un header
entetes = entetes.set('Accept-Encoding', 'gzip, deflate, sdch');*/

  login(info: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
       // 'accept':  'text/plain',
        'Content-Type':  'application/json'
       // 'Authorization':  'Bearer {{access_token}}'
      }),
    };
   
    return this.httpClient.post<any>(this.urlGWorflowapi + 'workflow_api/connexion/login.php', info)
    .pipe(map(user => {
     // console.log(user.results.jwt)  
     if (user && user.results.jwt) {
       
        localStorage.setItem('currentUser', JSON.stringify(user.results));
        localStorage.setItem('UserID', JSON.stringify(user.results.Id_Utilisateur));
        localStorage.setItem('Util_PremiereCnx', JSON.stringify(user.results.Util_PremiereCnx));
        localStorage.setItem('Util_Email', JSON.stringify(user.results.Util_Email));
        localStorage.setItem('prof_id', JSON.stringify(user.results.prof_id));
        this.concurentUserSubject.next(user.results);
      }
      return user;
    }));

  } 

permission(jwt: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/api/Security/Authentication/PermissionTree', jwt);
  }

  repdecodejwt(jwt: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/connexion/repdecodejwt.php', jwt);
  }

  UpdateFirstpassword(data: any): Observable<any> {
    return this.httpClient.post<any>(this.urlGWorflowapi + '/workflow_api/application/modifmdp.php', data);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.concurentUserSubject.next(null);
  }

 

}
