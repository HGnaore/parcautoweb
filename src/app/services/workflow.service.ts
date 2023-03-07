import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  urlG: string;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = this.configService.urlgRTI;
  }

 
  creerWorkFlow(data): Observable<any> {
    return this.httpClient.post<any>(this.urlG + 'workflow-parcauto/ajout_workflow.php', data);
  }

  listeWorkFlow(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + 'workflow-parcauto/liste_workflow.php');
  }

  creerCircuitWorkFlow(data): Observable<any> {
    return this.httpClient.post<any>(this.urlG + 'workflow-parcauto/ajout_circuit.php', data);
  }

  listeCircuitWorkFlow(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + 'workflow-parcauto/liste_circuit.php');
  }

  VerificationcircuitWorkFlow(codeCircuit): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + 'workflow-parcauto/verification_circuit.php?wcir_code='+codeCircuit);
  }
  
  updateVehiculeEtapeCodeForValidation(Format): Observable<any> {
    return this.httpClient.post<any>(this.urlG + 'vehicule/modifcodeetapevehicule.php', Format);
  }

  TheEndValidationVehicule(Format): Observable<any> {
    return this.httpClient.post<any>(this.urlG + 'vehicule/validevehicule.php', Format);
  }

  //////////////////////////////////

//////////////****GESTION DES CIRCUIT DU WORKFLOW ******************* */


CreateBonCaisseComment(data): Observable<any> {
  return this.httpClient.post<any>(this.urlG + 'bonDecaissement/create/creatbondecaissecomment.php', data);
}

creerValidationBonDecaissement(bcaisseid, workflowid, workflowetape, Todate, lemodedepaiement): Observable<any> {
  return this.httpClient.get<any>(this.urlG + 'workflow_api/validateur/validateur_liste_EtapeWorkflow.php?bcaisse_id=' + bcaisseid + '&workflow_id=' + workflowid + '&etap_code=' + workflowetape + '&datevalidation=' + Todate + '&modedepaiement=' + lemodedepaiement+ '&modedepaiement=' + lemodedepaiement);
}


SendMailValidationBonDeCaisseWorkFlow(Format): Observable<any> {
  return this.httpClient.post<any>(this.urlG + 'bonDecaissement/SendMail/SendMailEnvoieWorkflow.php', Format); 
}
SendMailRejeteBonDeCaisse(Format): Observable<any> {
  return this.httpClient.post<any>(this.urlG + 'bonDecaissement/SendMail/SendMailRejetBonCaisse.php', Format);
}

SendMailTraitementRejeteORCorectionBonDeCaisse(Format): Observable<any> {
  return this.httpClient.post<any>(this.urlG + 'bonDecaissement/SendMail/SendMailTraitementRejeteORCorectionBonDeCaisse.php', Format);
}

updatebondecaissestatut(statut): Observable<any> {
  return this.httpClient.post<any>(this.urlG + 'bonDecaissement/update/updatebondecaissestatut.php', statut);
}

readBonCaisseparvalidateur(IdUtilisateur, dateVal): Observable<any> {
  return this.httpClient.get<any>(this.urlG + 'bonDecaissement/read/readBonCaisseparvalidateur.php?Id_Utilisateur=' + IdUtilisateur + '&dateVal=' + dateVal);
}












  //////////////////////////////////////////////////////////
  

  listeWorkFlowByID(id): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + 'workflow-parcauto/workflow/workflow_parid.php?workflow_id=' + id);
  }

  creerEtapeWorkFlow(data): Observable<any> {
    return this.httpClient.post<any>(this.urlG + 'workflow-parcauto/etape/etape_ajout.php', data);
  }

  listeEtapeWorkFlowByID(id): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + 'workflow-parcauto/etape/etape_liste.php?etap_workflow_id=' + id);
  }

  supprimerEtapeWorkFlowByID(id): Observable<any> {
    return this.httpClient.delete<any>(this.urlG + 'bpDirection/delete/direction.php?id=' + id);
  }


  creerValidationWorkFlow(data): Observable<any> {
    return this.httpClient.post<any>(this.urlG + 'workflow-parcauto/validateur/validateur_ajout.php', data);
  }

  listeValidationWorkFlowByID(id): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG + 'workflow-parcauto/validateur/validateur_liste.php?workflow_id=' + id);
  }


  creerInterimWorkFlow(data): Observable<any> {
    return this.httpClient.post<any>(this.urlG + 'workflow-parcauto/interim/interim_ajout.php', data);
  }

  listeInterimWorkFlow(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlG  + 'workflow-parcauto/interim/interim_liste.php');
  }
}
