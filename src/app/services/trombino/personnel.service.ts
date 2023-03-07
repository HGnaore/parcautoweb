import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  urlG: string;


  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,) {
      this.urlG = this.configService.urlTrombino;
     }

     readPersonnel(): Observable<any[]> {
      return this.httpClient.get<any[]>(this.urlG + '/api/read/listepersonnel.php');
    }
  
    
    readonePersonnel(id): Observable<any> {
      return this.httpClient.get<any>(this.urlG + '/api/read/onepersonnel.php?id=' + id);
    }
  
    readPersonnelByDirection(id): Observable<any[]> {
      return this.httpClient.get<any[]>(this.urlG + '/api/read/listepersonnelpardirection.php?id=' + id);
    } 
  
    recherchepersonnelmulticritere(id: string): Observable<any[]> {
      return this.httpClient.get<any[]>(this.urlG + '/api/read/personnelrecherchemulticritere.php?id=' + id);
    }
  
    recherchepersonnelmulticritereavancee(personnel?: string): Observable<any[]> {
      return this.httpClient.get<any[]>(this.urlG + '/api/read/personnelrecherchemulticriterefront.php?id=' + personnel);
    }
  
    vueTotalemploye(): Observable<number> {
      return this.httpClient.get<number>(this.urlG + '/api/vue/totalemploye.php' );
    }
  
    vueTotalhomme(): Observable<number> {
      return this.httpClient.get<number>(this.urlG + '/api/vue/totalhomme.php' );
    }
  
    vueTotalfemme(): Observable<number> {
      return this.httpClient.get<number>(this.urlG + '/api/vue/totalfemme.php' );
    }
  
    vueTotalpardir(): Observable<any[]> {
      return this.httpClient.get<any[]>(this.urlG + '/api/vue/totalpardir.php' );
    }
  
}
