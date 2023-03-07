import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlG: string;
  urlT: string;
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient) {
    this.urlG = this.configService.urlg;
   // this.urlT = this.configService.urlTrombino;
  }

  listeUtilisateurTrombino(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlT + '/api/read/listepersonnel.php');
  }

  listeUtilisateur(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/utilisateurs/listeutilisateur.php');
  }

  listeUtilisateurDsi(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/utilisateurs/listeutilisateurDsi.php');
  }

  creatUtilisateur(utilisateur: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/utilisateurs/creationutilisateur.php', utilisateur);
  }
  updateUtilisateur(utilisateur: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/utilisateurs/updateutilisateur.php', utilisateur);
  }

  modifmdp(utilisateur: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/utilisateurs/modifmdp.php', utilisateur);
  }

  demandeEnr(utilisateur: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/utilisateurs/demandeEnr.php', utilisateur);
  }


  reinitmdp(utilisateur: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/utilisateurs/reinitmdp.php', utilisateur);
  }

  mdpoublie(utilisateur: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/utilisateurs/mdpoublie.php', utilisateur);
  }

  readoneUtilisateur(Id_Utilisateur): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/utilisateurs/Oneutilisateur.php?Id_Utilisateur=' + Id_Utilisateur);
  }

  deleteDirection(Id_Utilisateur) {
    return this.httpClient.delete<any>(this.urlG + '/utilisateurs/DeleteOneutilisateur.php?Id_Utilisateur=' + Id_Utilisateur);
  }

  login(info: any): Observable<any[]> {
    return this.httpClient.post<any[]>(this.urlG + '/connexion/login.php', info);
  }

  verifemailtrombino(email: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlT + '/api/read/verifemailtrombino.php?Email=' + email);
  }

  verifemaillocal(Util_Email: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/utilisateurs/verifiutilisateurparemail.php?Util_Email=' + Util_Email);
  }

}
