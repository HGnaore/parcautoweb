import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TrombinoService {
  urlT: String = '';

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
  //  this.urlT = this.configService.urlTrombino;
  }

  verifemailtrombino(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlT + '/api/read/personnelrecherchemulticritere.php?id=' + id);
  }
  /* msjphoto(): Observable<any[]> {
     return this.httpClient.get<any[]>(this.urlT + '/api/update/personnelconv.php');
   }*/

}
