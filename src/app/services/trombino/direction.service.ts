import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  urlG: string;


  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,) {
      this.urlG = this.configService.urlTrombino;
     }

  readDirection(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/read/listedirection.php');
  }

  readoneDirection(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/read/onedirection.php?id=' + id);
  }

  recherchedirections(id?: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/read/onedirectionrecherche.php?id=' + id);
  }

  recherchedirectionsmulticritere(id?: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/read/directionrecherchemulticritere.php?id=' + id);
  }

  readoneDirectionSite(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/read/onedirectionsite.php?id=' + id);
  }

}
