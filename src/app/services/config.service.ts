import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  //**en dev mac
  urlg = 'https://apiparcauto.afinov.com';
  urlTrombino = 'http://backtrombino.rti.ci';
  urlgRTI = 'http://apiparcauto.rti.ci/';
  urlWorflowapi = 'http://apiworkflow.rti.ci/';
  urlApplication = 'http://parcauto.rti.ci/';

   //*sur server RTI
  // urlg = 'http://172.16.2.16:8034'; //API
  // urlTrombino = 'http://172.16.2.16:8060';
  // urlgestock = 'http://172.16.2.16:8020';

  idUser = localStorage.getItem('id');
  var_Reattribution;
  MesTickets: boolean = false;
  MesAttributions: boolean = false;
  GestionTickets: boolean = false;
  Referentiel: boolean = false;
  Administration: boolean = false;

  ListMenuVehicule: boolean = false;
 



  OngletParcAuto: boolean = true;
  OngletConsultation: boolean = false;
  OngletModification: boolean = false;
  OngletTraitement: boolean = false;

  constructor() { }
}
