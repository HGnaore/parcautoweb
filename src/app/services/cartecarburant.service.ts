import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: "root",
})
export class CartecarburantService {
  urlG: string;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = this.configService.urlgRTI;
  }
  /*****Cartecarburant******* */
  listCartecarburant(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cartecarburant/listescartecarburant.php"
    );
  }

  listCartecarburantactive(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cartecarburant/listescartecarburant_active.php"
    );
  }

  saveCartecarburant(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "cartecarburant/creationcartecarburant.php",
      data
    );
  }
  updateCartecarburant(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "cartecarburant/modificationcartecarburant.php",
      data
    );
  }

  getCartecarburantbyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "cartecarburant/cartecarburantparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getCartecarburantbyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cartecarburant/cartecarburantparid.php?ID=" + code
    );
  }

  deleteCartecarburant(id) {
    return this.httpClient.get(
      this.urlG + "cartecarburant/suppressioncartecarburantparid.php?ID=" + id
    );
  }

  /*****LISTE ENERGIE******* */

  listeCompagniepetro(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "cartecarburant/compagniepetroliere/listescompagniepetroliere.php"
    );
  }

  /*****LISTE ENERGIE******* */
  saveApprovisionCartecarburant(data): Observable<any> {
    return this.httpClient.post(
      this.urlG +
        "cartecarburant/approvisioncarte/creationapprovisioncarte.php",
      data
    );
  }

  listeApprovisionCartecarburant(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cartecarburant/approvisioncarte/listesapprovisioncarte.php"
    );
  }

  getApprovisionCartecarburantbyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "cartecarburant/approvisioncarte/approvisioncartecarburantparid.php?ID=" +
        code
    );
  }

  updateApprovisionCartecarburant(data): Observable<any> {
    return this.httpClient.post(
      this.urlG +
        "cartecarburant/approvisioncarte/modificationapprovisioncarte.php",
      data
    );
  }

  /*****AFFECTATION EN CARBURANT******* */

  listeActivite(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cartecarburant/activite/listesactivite.php"
    );
  }

  saveAffectationcarburant(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "cuve/affectationcarburant/creationaffectationcarburant.php",
      data
    );
  }

  listeAffectationcarburant(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "cuve/affectationcarburant/listeaffectationcarburant.php"
    );
  }

  getAffectationcarburantbyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "cuve/affectationcarburant/affectationcarburantparid.php?ID=" +
        code
    );
  }

  deleteAffectationcarburantbyId(id) {
    return this.httpClient.get(
      this.urlG + "cuve/affectationcarburant/suppressionationcarburantarid.php?ID=" + id
    );
  }


}
