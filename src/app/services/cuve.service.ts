import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: "root",
})
export class CuveService {
  urlG: string;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = this.configService.urlgRTI;
  }
  /*****CUVE******* */
  listCuve(): Observable<any> {
    return this.httpClient.get<any>(this.urlG + "cuve/listescuve.php");
  }

  saveCuve(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "cuve/creationinfraction.php",
      data
    );
  }
  updateCuve(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "cuve/modificationinfraction.php",
      data
    );
  }

  getCuvebyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cuve/infractionparidvehicule.php?vehicule_ID=" + code
    );
  }

  getCuvebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cuve/infractionparid.php?ID=" + code
    );
  }

  deleteCuve(id) {
    return this.httpClient.get(
      this.urlG + "cuve/suppressioninfractionparid.php?ID=" + id
    );
  }

  /*****APPROVISIONNEMENT******* */

  listCuveAppro(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cuve/approvisionnement/listeappro.php"
    );
  }

  DerniereCuveAppro(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cuve/approvisionnement/derniereappro.php"
    );
  }

  DerniereCuveApproByCuveID(ID): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cuve/approvisionnement/derniereapprobycuveid.php?ID="+ID
    );
  }

  saveCuveAppro(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "cuve/approvisionnement/creationcuveappro.php",
      data
    );
  }
  updateCuveAppro(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "cuve/approvisionnement/modificationappro.php",
      data
    );
  }

  getCuveApprobyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cuve/approvisionnement/cuveapproparid.php?ID=" + code
    );
  }

  deleteCuveAppro(id) {
    return this.httpClient.get(
      this.urlG + "cuve/approvisionnement/suppressionapproparid.php?ID=" + id
    );
  }
}
