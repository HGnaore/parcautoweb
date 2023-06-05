import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: "root",
})
export class VehiculeService {
  urlG: string;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = this.configService.urlgRTI;
  }

  // VOITURE

  TotalTableaudeBord(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/tableaudebord/infotableaudebord.php"
    );
  }

  listenotification(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/notification/notificationvehicule.php"
    );
  }

  listeVehicule(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + "vehicule/listevehicule.php");
  }

  listeVehiculeValider(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/listevehiculevalider.php"
    );
  }

  listeVehiculeByCodeEtape(codeEtapeID): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG +
        "vehicule/listevehiculeparcodeetape.php?w_code_etape=" +
        codeEtapeID
    );
  }

  listeEnergies(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/energie/listeenergie.php"
    );
  }

  listeUsages(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/usage/listeusage.php"
    );
  }

  listeLocation(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + "/api/Gestion/Locations");
  }

  getOneVehicule(id): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/vehiculeparid.php?vehicule_ID=" + id
    );
  }
  getInfoVehiculebyID(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/infovehiculeparid.php?vehicule_ID=" + code
    );
  }

  getOneLocation(id): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "/api/Gestion/Locations/ById/" + id
    );
  }

  getOneVehiculebyCode(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "/api/Gestion/Vehicules/ByCode/" + code
    );
  }

  getOneLocationbyCode(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "/api/Gestion/Locations/ByCode/" + code
    );
  }

  saveVehicule(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/creationvehicule.php",
      data
    );
  }

  /************CARTE GRISE*********** */

  /*listeCarteGrise(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/cartegrise/listeusage.php"
    );
  }*/

  saveCartegrise(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/cartegrise/creationcartegrise.php",
      data
    );
  }

  updateCartegrise(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/cartegrise/modificationcartegrise.php",
      data
    );
  }

  getCartegrisebyvehiculeId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/cartegrise/cartegriseparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getCartegrisebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/cartegrise/cartegriseparid.php?ID=" + code
    );
  }

  deleteCartegrise(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/cartegrise/suppressioncartegriseparid.php?ID=" + id
    );
  }

  /************CARTE GRISE*********** */

  saveVisiteTechVignette(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/visiteetvignite/creationvisitevignette.php",
      data
    );
  }

  getOneVisitebyVehiculeId(id): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/visiteetvignite/visitevignetteparidvehicule.php?vehicule_ID=" +
        id
    );
  }

  getVisiteTechniquebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/visiteetvignite/visitevignetteparid.php?ID=" + code
    );
  }

  updateVisiteTechnique(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/visiteetvignite/modificationvisitevignette.php",
      data
    );
  }

  deleteVisiteTechnique(id) {
    return this.httpClient.get(
      this.urlG +
        "vehicule/visiteetvignite/suppressionvisitevignetteparid.php?ID=" +
        id
    );
  }

  saveAssuranceVehicule(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/assurance/creationassurance.php",
      data
    );
  }

  getOneAssurancebyVehiculeId(id): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/assurance/assuranceparidvehicule.php?vehicule_ID=" +
        id
    );
  }

  getAssurancebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/assurance/assuranceparid.php?ID=" + code
    );
  }

  updateAssurance(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/assurance/modificationassurance.php",
      data
    );
  }

  deleteAssurance(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/assurance/suppressionassuranceparid.php?ID=" + id
    );
  }

  saveLocation(data): Observable<any> {
    return this.httpClient.post(this.urlG + "/api/Gestion/Locations", data);
  }

  deleteVehicule(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/suppressionvehiculeparid.php?vehicule_ID=" + id
    );
  }

  deleteLocation(id) {
    return this.httpClient.delete(this.urlG + "/api/Gestion/Locations/" + id);
  }

  updateVehicule(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/modificationvehicule.php",
      data
    );
  }

  updateLocation(id, data) {
    return this.httpClient.put(
      this.urlG + "/api/Gestion/Locations/" + id,
      data
    );
  }

  /*****MARQUE VEHICULE******* */
  saveMarque(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/marque/creationmarque.php",
      data
    );
  }
  updateMarque(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/marque/modificationmarque.php",
      data
    );
  }

  listeMarque(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/marque/listemarque.php"
    );
  }
  getMarqueModelebyMarqueId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/marque/listemodeleparmarqueid.php?marque_ID=" + code
    );
  }

  getMarquebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/marque/marqueparid.php?ID=" + code
    );
  }

  deleteMarque(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/marque/suppressionmarqueparid.php?ID=" + id
    );
  }

  /*****ENERGIE MARQUE VEHICULE******* */
  saveEnergie(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/energie/creationenergie.php",
      data
    );
  }

  saveDetailEnergie(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/energie/creationdetailenergie.php",
      data
    );
  }

  getDetailTypeEnergiebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/energie/detailenergietypeparid.php?ID=" + code
    );
  }

  updateEnergie(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/energie/modificationenergie.php",
      data
    );
  }

  listeEnergie(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/energie/listeenergie.php"
    );
  }

  getEnergiebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/energie/energieparid.php?ID=" + code
    );
  }

  deleteEnergie(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/energie/suppressionenergie.php?ID=" + id
    );
  }

  deleteDetailEnergie(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/energie/suppressiondetailenergie.php?ID=" + id
    );
  }

  /*****USAGE VEHICULE******* */
  saveUsageVehicule(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/usage/creationusage.php",
      data
    );
  }
  updateUsageVehicule(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/usage/modificationusage.php",
      data
    );
  }

  listeUsageVehicule(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/usage/listeusage.php"
    );
  }

  getUsageVehiculebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/usage/usageparid.php?ID=" + code
    );
  }

  deleteUsageVehicule(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/usage/suppressionusageparid.php?ID=" + id
    );
  }

  /*****Assureur VEHICULE******* */
  saveAssureur(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/assurance/creationassureur.php",
      data
    );
  }
  updateAssureur(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/assurance/modificationassureur.php",
      data
    );
  }

  listeAssureur(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/assurance/listeassureur.php"
    );
  }

  getAssureurbyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/assurance/assureurparid.php?ID=" + code
    );
  }

  deleteAssureur(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/assurance/suppressionassureurparid.php?ID=" + id
    );
  }

  /*****MODELE MARQUE VEHICULE******* */
  saveModeleMarque(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/marque/creationmodele.php",
      data
    );
  }
  updateModeleMarque(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/marque/modificationmodele.php",
      data
    );
  }

  listeModeleMarque(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/marque/listemarque.php"
    );
  }

  getModeleMarquebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/marque/marqueparid.php?ID=" + code
    );
  }

  deleteModeleMarque(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/marque/suppressionmodeleparid.php?ID=" + id
    );
  }

  /*****FONCTION VEHICULE******* */
  listFoction(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/fonctionvehicule/listefonctionvehicule.php"
    );
  }

  saveFoction(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/fonctionvehicule/creationfonctionvehicule.php",
      data
    );
  }
  updateFoction(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/fonctionvehicule/modificationfonctionvehicule.php",
      data
    );
  }

  getFoctionbyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/fonctionvehicule/fonctionvehiculeparid.php?ID=" +
        code
    );
  }

  deleteFoction(id) {
    return this.httpClient.get(
      this.urlG +
        "vehicule/fonctionvehicule/suppressionfonctionvehicule.php?ID=" +
        id
    );
  }

  /*****MEDIA VEHICULE******* */
  listMedia(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/mediavehicule/listefonctionvehicule.php"
    );
  }

  saveMedia(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/mediavehicule/creationmediavehicule.php",
      data
    );
  }
  updateMedia(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/mediavehicule/modificationfonctionvehicule.php",
      data
    );
  }

  getMediabyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/mediavehicule/mediaparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getMediaVehiculebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/mediavehicule/mediaparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  deleteMedia(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/mediavehicule/suppressionmediaparid.php?ID=" + id
    );
  }

  /*****TYPE ENTRETIEN VEHICULE******* */
  listTypeEntretien(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/typeentretien/listetypeentretien.php"
    );
  }

  saveTypeEntretien(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/typeentretien/creationtypeentretien.php",
      data
    );
  }
  updateTypeEntretien(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/typeentretien/modificationtypeentretien.php",
      data
    );
  }

  getTypeEntretienbyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/typeentretien/typeentretienparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getTypeEntretienVehiculebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/typeentretien/typeentretienparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  deleteTypeEntretien(id) {
    return this.httpClient.get(
      this.urlG +
        "vehicule/typeentretien/suppressiontypeentretienparid.php?ID=" +
        id
    );
  }

  /*****GARAGISTRE VEHICULE******* */
  listGaragiste(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/garagiste/listegaragiste.php"
    );
  }

  saveGaragiste(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/garagiste/creationgaragiste.php",
      data
    );
  }
  updateGaragiste(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/garagiste/modificationgaragiste.php",
      data
    );
  }

  getGaragistebyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/garagiste/garagisteparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getGaragisteVehiculebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/mediavehicule/typeentretienparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  deleteGaragiste(id) {
    return this.httpClient.get(
      this.urlG +
        "vehicule/mediavehicule/suppressiontypeentretienparid.php?ID=" +
        id
    );
  }

  /*****PANNE VEHICULE******* */
  listPanne(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/panne/listepanne.php"
    );
  }
  listPanneaReparer(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/panne/listepanneareparer.php"
    );
  }

  savePanne(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/panne/creationpanne.php",
      data
    );
  }
  updatePanne(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/panne/modificationpanne.php",
      data
    );
  }

  getPannebyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/panne/panneparidvehicule.php?vehicule_ID=" + code
    );
  }

  getListePanneAreparerbyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/panne/panneareparerparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getListePanneAreparerbyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/panne/panneareparerparid.php?ID=" + code
    );
  }

  getPannebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/panne/panneparid.php?ID=" + code
    );
  }

  deletePanne(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/panne/suppressionpanneparid.php?ID=" + id
    );
  }

  /*****SINISTRE VEHICULE******* */
  listSinistre(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/sinistre/listesinistre.php"
    );
  }

  /* listSinistre(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/sinistre/listepanneareparer.php"
    );
  }*/

  listeNatureSinistre(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.urlG + "vehicule/sinistre/listenaturesinistre.php"
    );
  }

  saveSinistre(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/sinistre/creationsinistre.php",
      data
    );
  }
  updateSinistre(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/sinistre/modificationsinistre.php",
      data
    );
  }

  updateSinistrePourReparation(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/sinistre/modificationsinistrePourReparation.php",
      data
    );
  }

  getSinistrebyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/sinistre/sinistreparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getListeSinistreAreparerbyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/sinistre/sinistreareparerparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getListeSinistreAreparerbyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/sinistre/sinistreareparerparid.php?ID=" + code
    );
  }

  getSinistrebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/sinistre/sinistreparid.php?ID=" + code
    );
  }

  deleteSinistre(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/sinistre/suppressionsinistreparid.php?ID=" + id
    );
  }

  /*****REPARATION VEHICULE******* */
  listReparation(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/reparation/listereparation.php"
    );
  }

  saveReparation(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/reparation/creationreparation.php",
      data
    );
  }

  saveReparationDetail(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/reparation/creationdetailreparation.php",
      data
    );
  }
  updateReparation(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/reparation/modificationreparation.php",
      data
    );
  }

  getReparationbyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/reparation/reparationparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getReparationDetailbyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/reparation/reparationdetailparidvehicule.php?ID=" +
        code
    );
  }

  getReparationbyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/reparation/reparationparid.php?ID=" + code
    );
  }

  updatePanneOrSinistreId(code, vehiculeID): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/reparation/updatepanneorsinistreId.php?ID=" +
        code +
        "&vehiculeID=" +
        vehiculeID
    );
  }

  updatePanneOrSinistreIdToZERO(code, vehiculeID): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/reparation/updatepanneorsinistreIdtozero.php?ID=" +
        code +
        "&vehiculeID=" +
        vehiculeID
    );
  }

  deleteReparation(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/reparation/suppressionreparationparid.php?ID=" + id
    );
  }

  deleteReparationDetail(id) {
    return this.httpClient.get(
      this.urlG +
        "vehicule/reparation/suppressiondetailreparationparid.php?ID=" +
        id
    );
  }

  /*****ENTRETIENT VEHICULE******* */
  listEntretient(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/entretien/listereparation.php"
    );
  }

  saveEntretien(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/entretien/creationentretien.php",
      data
    );
  }

  saveEntretienDetail(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/entretien/creationdetailentretien.php",
      data
    );
  }

  saveEntretienProgramme(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/entretien/creationentretienprogramme.php",
      data
    );
  }

  getEntretienDetailbyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/entretien/entretiendetailparidvehicule.php?ID=" +
        code
    );
  }

  getEntretienbyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/entretien/entretienparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getEntretienProgrammeDetailbyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/entretien/entretiendetailprogrammeparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getEntretienyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/entretien/entretienparid.php?ID=" + code
    );
  }

  updateEntretien(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/entretien/modificationentretien.php",
      data
    );
  }

  deleteEntretien(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/entretien/suppressionentretienparid.php?ID=" + id
    );
  }

  deleteEntretienProgramm(id) {
    return this.httpClient.get(
      this.urlG +
        "vehicule/entretien/suppressionentretienprogrammeparid.php?ID=" +
        id
    );
  }

  deleteEntretienDetail(id) {
    return this.httpClient.get(
      this.urlG +
        "vehicule/entretien/suppressiondetailentretienparid.php?ID=" +
        id
    );
  }

  /*****KILOMETRAGE VEHICULE******* */

  saveKilometrage(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/kilometrage/creationkilometrage.php",
      data
    );
  }

  getKilometragebyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/kilometrage/kilometrageparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getKilometragebyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/kilometrage/kilometrageparid.php?ID=" + code
    );
  }

  updateKilometrage(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/kilometrage/modificationkilometrage.php",
      data
    );
  }

  deletekilometrage(id) {
    return this.httpClient.get(
      this.urlG +
        "vehicule/kilometrage/suppressionkilometrageparid.php?ID=" +
        id
    );
  }

  /*****INFRACTION VEHICULE******* */
  listInfraction(): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/sinistre/listesinistre.php"
    );
  }

  saveInfraction(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/infraction/creationinfraction.php",
      data
    );
  }
  updateInfraction(data): Observable<any> {
    return this.httpClient.post(
      this.urlG + "vehicule/infraction/modificationinfraction.php",
      data
    );
  }

  getInfractionbyIdVehicule(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG +
        "vehicule/infraction/infractionparidvehicule.php?vehicule_ID=" +
        code
    );
  }

  getInfractionbyId(code): Observable<any> {
    return this.httpClient.get<any>(
      this.urlG + "vehicule/infraction/infractionparid.php?ID=" + code
    );
  }

  deleteInfraction(id) {
    return this.httpClient.get(
      this.urlG + "vehicule/infraction/suppressioninfractionparid.php?ID=" + id
    );
  }
}
