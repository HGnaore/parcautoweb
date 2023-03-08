import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { TableaudebordComponent } from './tableaudebord/tableaudebord.component';
import { FooterComponent } from './footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListeutilisateursComponent } from './listeutilisateurs/listeutilisateurs.component';
import { UtilisateurComponent } from './parametre/utilisateur/utilisateur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsComponent } from './contacts/contacts.component';
import { MatCardModule } from '@angular/material/card';
import { VehiculeListComponent } from './gestion/vehicule-list/vehicule-list.component';
import { VehiculeEditionComponent } from './gestion/vehicule-edition/vehicule-edition.component';
import { MatIconModule } from '@angular/material/icon';
import { DirectionListComponent } from './REFERENTIEL/direction-list/direction-list.component';
import { DirectionEditionComponent } from './REFERENTIEL/direction-edition/direction-edition.component';
import { EnergiEditionComponent } from './REFERENTIEL/energi-edition/energi-edition.component';
import { EnergiListeComponent } from './REFERENTIEL/energi-liste/energi-liste.component';
import { TypefournisseurListeComponent } from './REFERENTIEL/typefournisseur-liste/typefournisseur-liste.component';
import { TypefournisseurEditionComponent } from './REFERENTIEL/typefournisseur-edition/typefournisseur-edition.component';
import { FournisseurEditionComponent } from './REFERENTIEL/fournisseur-edition/fournisseur-edition.component';
import { FournisseurListeComponent } from './REFERENTIEL/fournisseur-liste/fournisseur-liste.component';
import { LocationListeComponent } from './gestion/location-liste/location-liste.component';
import { LocationEditionComponent } from './gestion/location-edition/location-edition.component';
import { EntretienListeComponent } from './gestion/Entretien/entretien-liste/entretien-liste.component';
import { EntretienEditionComponent } from './gestion/Entretien/entretien-edition/entretien-edition.component';
import { EntretienProgramEditionComponent } from './gestion/Entretien-program/entretien-program-edition/entretien-program-edition.component';
import { EntretienProgramListeComponent } from './gestion/Entretien-program/entretien-program-liste/entretien-program-liste.component';
import { InfovehiculeEditionComponent } from './gestion/traitement/infoVehicule/infovehicule-edition/infovehicule-edition.component';
import { CartegriseEditionComponent } from './gestion/traitement/carteGrise/cartegrise-edition/cartegrise-edition.component';
import { VisitetechniqueEditionComponent } from './gestion/traitement/visiteTechnique/visitetechnique-edition/visitetechnique-edition.component';
import { AssurenceEditionComponent } from './gestion/traitement/assurance/assurence-edition/assurence-edition.component';
import { PannereparationEditionComponent } from './gestion/traitement/panneReparation/pannereparation-edition/pannereparation-edition.component';
import { AccidentEditionComponent } from './gestion/traitement/accident/accident-edition/accident-edition.component';
import { MarqueModeleEditionComponent } from './referentiels/marqueModele/marque-modele-edition/marque-modele-edition.component';
import { EnergieListeComponent } from './referentiels/energie/energie-liste/energie-liste.component';
import { UsageListeComponent } from './referentiels/usage/usage-liste/usage-liste.component';
import { MarqueModeleListeComponent } from './referentiels/marqueModele/marque-modele-liste/marque-modele-liste.component';
import { AssureurListeComponent } from './referentiels/assureur/assureur-liste/assureur-liste.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FonctionVehiculeListeComponent } from './referentiels/fonctions-vehicule/fonction-vehicule-liste/fonction-vehicule-liste.component';
import { ModificationVehiculeComponent } from './gestion/ParcAuto/modificationVehicule/modification-vehicule/modification-vehicule.component';
import { ConsultationVehiculeComponent } from './gestion/ParcAuto/consultationVehicule/consultation-vehicule/consultation-vehicule.component';
import { TraitementVehiculeComponent } from './gestion/ParcAuto/traitementVehicule/traitement-vehicule/traitement-vehicule.component';
import { DemandeVehiculeComponent } from './gestion/DemandeVehicule/demande-vehicule/demande-vehicule.component';
import { ListCarburantComponent } from './gestion/Cuvre/list-carburant/list-carburant.component';
import { DotationCarburantComponent } from './gestion/Cuvre/dotation-carburant/dotation-carburant.component';
import { DemandeCarburantComponent } from './gestion/Cuvre/demande-carburant/demande-carburant.component';
import { CarteCarburantComponent } from './gestion/CarteRechargement/carte-carburant/carte-carburant.component';
import { CarteFerComponent } from './gestion/CarteRechargement/carte-fer/carte-fer.component';
import { CreateDemandeVehiculeComponent } from './gestion/DemandeVehicule/create-demande-vehicule/create-demande-vehicule.component';
import { ApprovisionnerCarteComponent } from './gestion/CarteRechargement/approvisionner-carte/approvisionner-carte.component';
import { WorkflowListeComponent } from './referentiels/workflow/workflow-liste/workflow-liste.component';
import { WorkflowValidateurComponent } from './referentiels/workflow/workflow-validateur/workflow-validateur.component';
import { WorkflowEtapeComponent } from './referentiels/workflow/workflow-etape/workflow-etape.component';
import { ProfilComponent } from './parametre/profil/profil.component';
import { ValidationVehiculeComponent } from './gestion/ParcAuto/validation-vehicule/validation-vehicule.component';
import { TypeEntretienComponent } from './gestion/structure/type-entretien/type-entretien.component';
import { GaragesComponent } from './gestion/structure/garages/garages.component';
import { EntretienFiltreComponent } from './gestion/structure/entretien-filtre/entretien-filtre.component';


@NgModule({
  declarations: [AdminComponent,
    TableaudebordComponent,
    FooterComponent,
    ListeutilisateursComponent,
    UtilisateurComponent,
    ContactsComponent,
    VehiculeListComponent,
    VehiculeEditionComponent,
    DirectionListComponent,
    DirectionEditionComponent,
    EnergiEditionComponent,
    EnergiListeComponent,
    TypefournisseurListeComponent,
    TypefournisseurEditionComponent,
    FournisseurEditionComponent,
    FournisseurListeComponent,
    LocationListeComponent,
    LocationEditionComponent,
    EntretienListeComponent,
    EntretienEditionComponent,
    EntretienProgramEditionComponent,
    EntretienProgramListeComponent,
    InfovehiculeEditionComponent,
    CartegriseEditionComponent,
    VisitetechniqueEditionComponent,
    AssurenceEditionComponent,
    PannereparationEditionComponent,
    AccidentEditionComponent,
    MarqueModeleListeComponent,
    MarqueModeleEditionComponent,
    EnergieListeComponent,
    UsageListeComponent,
    AssureurListeComponent,
    FonctionVehiculeListeComponent,
    ModificationVehiculeComponent,
    ConsultationVehiculeComponent,
    TraitementVehiculeComponent,
    DemandeVehiculeComponent,
    ListCarburantComponent,
    DotationCarburantComponent,
    DemandeCarburantComponent,
    CarteCarburantComponent,
    CarteFerComponent,
    CreateDemandeVehiculeComponent,
    ApprovisionnerCarteComponent,
    WorkflowListeComponent,
    WorkflowValidateurComponent,
    WorkflowEtapeComponent,
    ProfilComponent,
    ValidationVehiculeComponent,
    TypeEntretienComponent,
    GaragesComponent,
    EntretienFiltreComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
  ]
})
export class AdminModule {


}
