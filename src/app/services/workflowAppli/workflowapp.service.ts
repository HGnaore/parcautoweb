import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../config.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowappService {
  urlG: string;

  url = this.configurationService.urlWorflowapi;

  constructor(
    private httpClient: HttpClient,
    private configurationService: ConfigService) { }

  creerWorkFlow(data: any): Observable<any> {
    return this.httpClient.post<any>(this.url + 'workflow_api/workflow/workflow_ajout.php', data);
  }

  listeWorkFlow(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'workflow_api/workflow/workflow_liste.php');
  }

  listeAllWorkFlowbyID(code: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'workflow_api/workflow/workflow_etape_liste.php?workf_code=' + code);
  }
 

  supprimerWorkFlow(id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'workflow_api/workflow/workflow_sup.php?workflow_id=' + id);
  } 
  listeWorkFlowByID(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'workflow_api/workflow/workflow_parid.php?workflow_id=' + id);
  }

  oneworkflowetapeparid(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'workflow_api/workflow/one_workflow_etape_parid.php?workf_etp_id=' + id);
  }

  modifierWorkFlow(data: any): Observable<any> {
    return this.httpClient.post<any>(this.url + 'workflow_api/workflow/workflow_modif.php', data);
  }

  
  creerEtapeWorkFlow(data: any): Observable<any> {
    return this.httpClient.post<any>(this.url + 'workflow_api/etape/etape_ajout.php', data);
  }

  listeEtapeWorkFlowByID(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'workflow_api/etape/etape_liste.php?etap_workflow_id=' + id);
  }

  supprimerEtapeWorkFlowByID(id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'workflow_api/etape/etape_sup.php?etape_id=' + id);
  }

  listeEtapeValidationWorkFlowByID(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'workflow_api/validateur/validateur_liste_workflow_etape.php?workflow_id=' + id);
  }

  creerValidationWorkFlow(data: any): Observable<any> {
    return this.httpClient.post<any>(this.url + 'workflow_api/validateur/validateur_ajout.php', data);
  }

  listeValidationWorkFlowByID(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'workflow_api/validateur/validateur_liste.php?workflow_id=' + id);
  }

  supprimerWorkFlowEtapeValidateur(id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'workflow_api/validateur/validateur_sup.php?validateur_id=' + id);
  }


  creerInterimWorkFlow(data: any): Observable<any> {
    return this.httpClient.post<any>(this.url + 'workflow_api/interim/interim_ajout.php', data);
  }

  listeInterimWorkFlow(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'workflow_api/interim/interim_liste.php');
  }

  //////////////
  validateurlisteEtapeWorkflow(etapworkflowid,etapcode, datevalidation): Observable<any> {
    return this.httpClient.get<any>(this.url + 'workflow_api/validateur/validateur_liste_EtapeWorkflow-New.php?etap_workflow_id='+etapworkflowid+'&etap_code='+etapcode+'&datevalidation='+datevalidation);
  }

    
  sendEmailEtapworkflowidEmailListOfValidation(Format): Observable<any> {
    return this.httpClient.post<any>(this.url + 'workflow_api/mailenvoi.php', Format);
  }


  ///////RECHERCHE PAR EMAIL DES ETATPES DU VALIDATEUR////////////
  listecodeetapeparemail(etapworkflowid,email): Observable<any> {
    return this.httpClient.get<any>(this.url + 'workflow_api/validateur/listecodeetapeparemail.php?val_email='+email+'&workf_etp_id='+etapworkflowid);
  }

}