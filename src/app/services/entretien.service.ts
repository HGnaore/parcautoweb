import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  
  urlG: string;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
    
  ) {
    this.urlG = this.configService.urlg;
  }

  // ENTRETIEN

  listeEntretiens(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Gestion/Entretiens');
  }

  listeEntretienProgrammes(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Gestion/EntretienProgrammes');
  }



  getOneEntretiens(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Gestion/Entretiens/ById/' + id);
  }

  getOneEntretienProgrammes(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Gestion/EntretienProgrammes/ById/' + id);
  }



  saveEntretiens(data): Observable<any> {
    return this.httpClient.post(this.urlG + '/api/Gestion/Entretiens', data);
  }

  saveEntretienProgrammes(data): Observable<any> {
    return this.httpClient.post(this.urlG + '/api/Gestion/EntretienProgrammes', data);
  }

  deleteEntretiens(id) {
    return this.httpClient.delete(this.urlG + '/api/Gestion/Entretiens/' + id);
  }

  deleteEntretienProgrammes(id) {
    return this.httpClient.delete(this.urlG + '/api/Gestion/EntretienProgrammes/' + id);
  }

  updateEntretiens(id, data) {
    return this.httpClient.put(this.urlG + '/api/Gestion/Entretiens/' + id, data);
  }

  updateEntretienProgrammes(id, data) {
    return this.httpClient.put(this.urlG + '/api/Gestion/EntretienProgrammes/' + id, data);
  } 

  ////////////TYPE ENTRETIEN

  
  listeTypeEntretiens(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Core/TypeEntretiens');
  }


}
