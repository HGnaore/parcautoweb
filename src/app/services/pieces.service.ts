import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PiecesService {
  urlG: string;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = this.configService.urlgRTI;
  }

  // TYPE PIECE
  getAllTypepiece(): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/vehicule/typepiece/readAll.php');
  }
  saveTypepiece(data): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/vehicule/typepiece/create.php', data);
  }
  updateTypepiece(data): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/vehicule/typepiece/update.php', data);
  }

  //  PIECE
  getAllPiece(): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/vehicule/piece/readAll.php');
  }
  getOnePiece(id): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/vehicule/piece/readOne.php?ID=' + id);
  }
  savePiece(data): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/vehicule/piece/create.php', data);
  }
  updatePiece(data): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/vehicule/piece/update.php', data);
  }
  deleteOne(id: any): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/vehicule/piece/deleteOne.php?ID=' + id);
  }

  /*getOneById(id: any): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/vehicule/typeentretien/typeentretienparid.php?ID=' + id);
  }

 

  update(data): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/vehicule/typeentretien/modificationtypeentretien.php', data);
  }

  deleteOneById(id: any): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/vehicule/typeentretien/typeentretienparid.php?ID=' + id);
  }*/
  // FIN TYPE PIECE

}