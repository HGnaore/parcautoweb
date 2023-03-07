import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({ 
  providedIn: 'root'
})
export class LocationService {

 
  urlG: string;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = this.configService.urlg;
  }

  // VOITURE

  listeVehicule(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Gestion/Vehicules');
  }

  listeMarque(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Core/Marques');
  }

  listeEnergies(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Core/Energies');
  }

  listeUsages(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Core/Usages');
  }

  listeLocation(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Gestion/Locations');
  }

  getOneVehicule(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Gestion/Vehicules/ById/' + id);
  }

  getOneLocation(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Gestion/Locations/ById/' + id);
  }

  getOneVehiculebyCode(code): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Gestion/Vehicules/ByCode/' + code);
  }

  getOneLocationbyCode(code): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Gestion/Locations/ByCode/' + code);
  }

  saveVehicule(data): Observable<any> {
    return this.httpClient.post(this.urlG + '/api/Gestion/Vehicules', data);
  }

  saveLocation(data): Observable<any> {
    return this.httpClient.post(this.urlG + '/api/Gestion/Locations', data);
  }

  deleteVehicule(id) {
    return this.httpClient.delete(this.urlG + '/api/Gestion/Vehicules/' + id);
  }

  deleteLocation(id) {
    return this.httpClient.delete(this.urlG + '/api/Gestion/Locations/' + id);
  }

  updateVehicule(id, data) {
    return this.httpClient.put(this.urlG + '/api/Gestion/Vehicules/' + id, data);
  }

  updateLocation(id, data) {
    return this.httpClient.put(this.urlG + '/api/Gestion/Locations/' + id, data);
  }

}