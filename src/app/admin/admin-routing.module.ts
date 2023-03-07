import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './footer/footer.component';
import { ListeutilisateursComponent } from './listeutilisateurs/listeutilisateurs.component';
import { TableaudebordComponent } from './tableaudebord/tableaudebord.component';
/*import { UtilisateurComponent } from './utilisateur/utilisateur.component';*/
import { ContactsComponent } from './contacts/contacts.component';
import { AuthGuard } from '../guards/auth.guard';
import { VehiculeListComponent } from './gestion/vehicule-list/vehicule-list.component';
import { VehiculeEditionComponent } from './gestion/vehicule-edition/vehicule-edition.component';
import { DirectionListComponent } from './REFERENTIEL/direction-list/direction-list.component';
import { DirectionEditionComponent } from './REFERENTIEL/direction-edition/direction-edition.component';
import { EnergiListeComponent } from './REFERENTIEL/energi-liste/energi-liste.component';
import { EnergiEditionComponent } from './REFERENTIEL/energi-edition/energi-edition.component';
import { TypefournisseurListeComponent } from './REFERENTIEL/typefournisseur-liste/typefournisseur-liste.component';
import { TypefournisseurEditionComponent } from './REFERENTIEL/typefournisseur-edition/typefournisseur-edition.component';
import { FournisseurListeComponent } from './REFERENTIEL/fournisseur-liste/fournisseur-liste.component';
import { FournisseurEditionComponent } from './REFERENTIEL/fournisseur-edition/fournisseur-edition.component';
import { LocationListeComponent } from './gestion/location-liste/location-liste.component';
import { LocationEditionComponent } from './gestion/location-edition/location-edition.component';
import { EntretienListeComponent } from './gestion/Entretien/entretien-liste/entretien-liste.component';
/*import { EntretienEditionComponent } from './gestion/Entretien/entretien-edition/entretien-edition.component';*/
import { EntretienEditionComponent } from './gestion/traitement/entretien/entretien-edition/entretien-edition.component';
import { EntretienProgramListeComponent } from './gestion/Entretien-program/entretien-program-liste/entretien-program-liste.component';
import { EntretienProgramEditionComponent } from './gestion/Entretien-program/entretien-program-edition/entretien-program-edition.component';
import { InfovehiculeEditionComponent } from './gestion/traitement/infoVehicule/infovehicule-edition/infovehicule-edition.component';
import { CartegriseEditionComponent } from './gestion/traitement/carteGrise/cartegrise-edition/cartegrise-edition.component';
import { VisitetechniqueEditionComponent } from './gestion/traitement/visiteTechnique/visitetechnique-edition/visitetechnique-edition.component';
import { AssurenceEditionComponent } from './gestion/traitement/assurance/assurence-edition/assurence-edition.component';
import { PannereparationEditionComponent } from './gestion/traitement/panneReparation/pannereparation-edition/pannereparation-edition.component';
import { AccidentEditionComponent } from './gestion/traitement/accident/accident-edition/accident-edition.component';
import { MarqueModeleListeComponent } from './referentiels/marqueModele/marque-modele-liste/marque-modele-liste.component';
import { MarqueModeleEditionComponent } from './referentiels/marqueModele/marque-modele-edition/marque-modele-edition.component';
import { EnergieListeComponent } from './referentiels/energie/energie-liste/energie-liste.component';
import { UsageListeComponent } from './referentiels/usage/usage-liste/usage-liste.component';
import { AssureurListeComponent } from './referentiels/assureur/assureur-liste/assureur-liste.component';
import { FonctionVehiculeListeComponent } from './referentiels/fonctions-vehicule/fonction-vehicule-liste/fonction-vehicule-liste.component';
import { ConsultationVehiculeComponent } from './gestion/ParcAuto/consultationVehicule/consultation-vehicule/consultation-vehicule.component';
import { ModificationVehiculeComponent } from './gestion/ParcAuto/modificationVehicule/modification-vehicule/modification-vehicule.component';
import { TraitementVehiculeComponent } from './gestion/ParcAuto/traitementVehicule/traitement-vehicule/traitement-vehicule.component';
import { DemandeVehiculeComponent } from './gestion/DemandeVehicule/demande-vehicule/demande-vehicule.component';
import { CreateDemandeVehiculeComponent } from './gestion/DemandeVehicule/create-demande-vehicule/create-demande-vehicule.component';
import { DemandeCarburantComponent } from './gestion/Cuvre/demande-carburant/demande-carburant.component';
import { DotationCarburantComponent } from './gestion/Cuvre/dotation-carburant/dotation-carburant.component';
import { ListCarburantComponent } from './gestion/Cuvre/list-carburant/list-carburant.component';
import { CarteCarburantComponent } from './gestion/CarteRechargement/carte-carburant/carte-carburant.component';
import { CarteFerComponent } from './gestion/CarteRechargement/carte-fer/carte-fer.component';
import { ApprovisionnerCarteComponent } from './gestion/CarteRechargement/approvisionner-carte/approvisionner-carte.component';
import { WorkflowListeComponent } from './referentiels/workflow/workflow-liste/workflow-liste.component';
import { ProfilComponent } from './parametre/profil/profil.component';
import { UtilisateurComponent } from './parametre/utilisateur/utilisateur.component';
import { ValidationVehiculeComponent } from './gestion/ParcAuto/validation-vehicule/validation-vehicule.component';
import { TypeEntretienComponent } from './gestion/structure/type-entretien/type-entretien.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'tableaudebord', pathMatch: 'full' },
      { path: 'tableaudebord', component: TableaudebordComponent, canActivate: [AuthGuard] },
      { path: 'footer', component: FooterComponent },
      { path: 'listeutilisateurs', component: ListeutilisateursComponent },
      { path: 'utilisateur/:id', component: UtilisateurComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'vehiculeList', component: VehiculeListComponent, canActivate: [AuthGuard] },
      { path: 'validvehiculeList', component: ValidationVehiculeComponent, canActivate: [AuthGuard] },
      { path: 'vehiculeEdition/:id/:ProfilID', component: VehiculeEditionComponent, canActivate: [AuthGuard] },
      { path: 'locationList', component: LocationListeComponent, canActivate: [AuthGuard] },
      { path: 'locationEdition/:id', component: LocationEditionComponent, canActivate: [AuthGuard] },

      { path: 'entretienList', component: EntretienListeComponent, canActivate: [AuthGuard] },
      { path: 'structure/type-entretien', component: TypeEntretienComponent, canActivate: [AuthGuard] },
     /* { path: 'entretienEdition/:id', component: EntretienEditionComponent, canActivate: [AuthGuard] },*/
      { path: 'entretienProgramList', component: EntretienProgramListeComponent, canActivate: [AuthGuard] },
      { path: 'entretienProgramEdition/:id', component: EntretienProgramEditionComponent, canActivate: [AuthGuard] },

      { path: 'directionList', component: DirectionListComponent, canActivate: [AuthGuard] },
      { path: 'directionEdition/:id', component: DirectionEditionComponent, canActivate: [AuthGuard] },
      { path: 'energiList', component: EnergiListeComponent, canActivate: [AuthGuard] },
      { path: 'energiEdition/:id', component: EnergiEditionComponent, canActivate: [AuthGuard] },
      { path: 'typefournisseurList', component: TypefournisseurListeComponent, canActivate: [AuthGuard] },
      { path: 'typefournisseurEdition/:id', component: TypefournisseurEditionComponent, canActivate: [AuthGuard] },
      { path: 'fournisseurList', component: FournisseurListeComponent, canActivate: [AuthGuard] },
      { path: 'fournisseurEdition/:id', component: FournisseurEditionComponent, canActivate: [AuthGuard] },

      /////////REFERENTIEL////////////
      { path: 'marqueList/:ProfilID', component: MarqueModeleListeComponent, canActivate: [AuthGuard] },
      { path: 'marqueEdition/:ProfilID', component: MarqueModeleEditionComponent, canActivate: [AuthGuard] },
      { path: 'energieList/:ProfilID', component: EnergieListeComponent, canActivate: [AuthGuard] },
      { path: 'usageList/:ProfilID', component: UsageListeComponent, canActivate: [AuthGuard] },
      { path: 'assureurList/:ProfilID', component: AssureurListeComponent, canActivate: [AuthGuard] },
      { path: 'fonctionList/:ProfilID', component: FonctionVehiculeListeComponent,canActivate: [AuthGuard] },
      { path: 'workflowList/:ProfilID', component: WorkflowListeComponent,canActivate: [AuthGuard] },
      { path: 'workflowList/:ProfilID', component: WorkflowListeComponent,canActivate: [AuthGuard] },
      { path: 'param/profilList/:ProfilID', component: ProfilComponent,canActivate: [AuthGuard] },
      { path: 'param/userList/:ProfilID', component: UtilisateurComponent,canActivate: [AuthGuard] },
      
       /* { path: 'vehiculePanneReparation/:id/:ProfilID', component: PannereparationEditionComponent, canActivate: [AuthGuard] },
      { path: 'vehiculeAccident/:id/:ProfilID', component: AccidentEditionComponent, canActivate: [AuthGuard] },*/

       ///////////TRAITEMENT//////////
       { path: 'vehiculeInfo/:id/:ProfilID', component: InfovehiculeEditionComponent, canActivate: [AuthGuard] },
       { path: 'vehiculeCardGrise/:id/:ProfilID', component: CartegriseEditionComponent, canActivate: [AuthGuard] },
       { path: 'vehiculeVisiteVign/:id/:ProfilID', component: VisitetechniqueEditionComponent, canActivate: [AuthGuard] },
       { path: 'vehiculeAssurance/:id/:ProfilID', component: AssurenceEditionComponent, canActivate: [AuthGuard] },
       { path: 'vehiculeEntretien/:id/:ProfilID', component: EntretienEditionComponent, canActivate: [AuthGuard] },
       { path: 'vehiculePanneReparation/:id/:ProfilID', component: PannereparationEditionComponent, canActivate: [AuthGuard] },
       { path: 'vehiculeAccident/:id/:ProfilID', component: AccidentEditionComponent, canActivate: [AuthGuard] },
   
      ///////////PARC AUTO//////////
      { path: 'parcauto/consultVehicule/:id/:ProfilID', component: ConsultationVehiculeComponent, canActivate: [AuthGuard] },
      { path: 'parcauto/modifVehicule/:id/:ProfilID', component: ModificationVehiculeComponent,canActivate: [AuthGuard] },
      { path: 'parcauto/traitemVehicule/:id/:ProfilID', component: TraitementVehiculeComponent, canActivate: [AuthGuard] },

      { path: 'parcauto/demandeVehicule/:id', component: DemandeVehiculeComponent, canActivate: [AuthGuard] },
      { path: 'parcauto/createDemandeVehicule/:id', component: CreateDemandeVehiculeComponent, canActivate: [AuthGuard] },
     
      { path: 'parcauto/cuvreCarburant/:id', component: ListCarburantComponent, canActivate: [AuthGuard] },
      { path: 'parcauto/cuvreDotationCarburant/:id', component: DotationCarburantComponent, canActivate: [AuthGuard] },
      { path: 'parcauto/cuvreDemandeCarburant/:id', component: DemandeCarburantComponent, canActivate: [AuthGuard] },
   
      { path: 'parcauto/carteCarburant/:id', component: CarteCarburantComponent, canActivate: [AuthGuard] },
      { path: 'parcauto/carteFer/:id', component: CarteFerComponent, canActivate: [AuthGuard] },
      { path: 'parcauto/approvionnercartecaburant/:id', component: ApprovisionnerCarteComponent, canActivate: [AuthGuard] },


  
   
     /* { path: 'vehiculeAssurance/:id/:ProfilID', component: AssurenceEditionComponent, canActivate: [AuthGuard] },
      { path: 'vehiculeEntretien/:id/:ProfilID', component: EntretienEditionComponent, canActivate: [AuthGuard] },
      { path: 'vehiculePanneReparation/:id/:ProfilID', component: PannereparationEditionComponent, canActivate: [AuthGuard] },
      { path: 'vehiculeAccident/:id/:ProfilID', component: AccidentEditionComponent, canActivate: [AuthGuard] },*/

    

    ]
  },
  { path: '**', redirectTo: 'admin' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
