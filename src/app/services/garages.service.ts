import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class GaragesService {
  urlG: string;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = this.configService.urlgRTI;
  }

  // TYPE FOURNISSEUR
  getAllGarage(): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/vehicule/garagiste/listegaragiste.php');
  }
  saveGarage(data): Observable<any> {
    return this.httpClient.post(this.urlG + '/vehicule/garagiste/creationgaragiste.php', data);
  }

  getOneGarage(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/vehicule/garagiste/garagisteparid.php?ID=' + id);
  }

  updateGarage(data) {
    return this.httpClient.post(this.urlG + '/vehicule/garagiste/modificationgaragiste.php', data);
  }

  deleteGarage(id) {
    return this.httpClient.get(this.urlG + '/vehicule/garagiste/suppressiongaragisteparid.php?ID=' + id);
  }



}
