import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EnergieService {
  urlG: string; 

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = this.configService.urlg;
  }


  listeEnergie(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Core/Energies');
  }

  getOneEnergie(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Core/Energies/ById/' + id);
  }

  getOneEnergiebyCode(code): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Core/Energies/ByCode/' + code);
  }

  saveEnergie(data): Observable<any> {
    return this.httpClient.post(this.urlG + '/api/Core/Energies', data);
  }

  deleteEnergie(id) {
    return this.httpClient.delete(this.urlG + '/api/Core/Energies/' + id);
  }

  updateEnergie(id, data) {
    return this.httpClient.put(this.urlG + '/api/Core/Energies/' + id, data);
  }

}
