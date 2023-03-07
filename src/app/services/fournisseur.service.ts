import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  urlG: string;
 
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = this.configService.urlg;
  }

  // TYPE FOURNISSEUR
  listeTypeFournisseur(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Core/TypeFournisseurs');
  }

  getOneTypeFournisseur(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Core/TypeFournisseurs/ById/' + id);
  }

  getOneTypeFournisseurbyCode(code): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Core/TypeFournisseurs/ByCode/' + code);
  }

  saveTypeFournisseur(data): Observable<any> {
    return this.httpClient.post(this.urlG + '/api/Core/TypeFournisseurs', data);
  }

  deleteTypeFournisseur(id) {
    return this.httpClient.delete(this.urlG + '/api/Core/TypeFournisseurs/' + id);
  }

  updateTypeFournisseur(id, data) {
    return this.httpClient.put(this.urlG + '/api/Core/TypeFournisseurs/' + id, data);
  }


  // FOURNISSEUR
  listeFournisseur(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + '/api/Core/Fournisseurs');
  }

  getOneFournisseur(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Core/Fournisseurs/ById/' + id);
  }

  getOneFournisseurbyCode(code): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/api/Core/Fournisseurs/ByCode/' + code);
  }

  saveFournisseur(data): Observable<any> {
    return this.httpClient.post(this.urlG + '/api/Core/Fournisseurs', data);
  }

  deleteFournisseur(id) {
    return this.httpClient.delete(this.urlG + '/api/Core/Fournisseurs/' + id);
  }

  updateFournisseur(id, data) {
    return this.httpClient.put(this.urlG + '/api/Core/Fournisseurs/' + id, data);
  }

}
