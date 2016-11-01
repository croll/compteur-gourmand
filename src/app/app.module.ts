import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CompteurGourmand } from './app.component';
import { HomePage } from '../pages/home/home';
import { Presentation } from '../pages/presentation/presentation';
import { FootprintPage } from '../pages/footprint/footprint';
import { ChoosePage } from '../pages/choose/choose';
import { EventListPage } from '../pages/event-list/event-list';
import { EventFormPage } from '../pages/event-form/event-form';
import { CommitmentListPage, CommitmentAddModal } from '../pages/commitment-list/commitment-list';
import { CommitmentFormPage } from '../pages/commitment-form/commitment-form';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { CommitmentChoicePage } from '../pages/commitment-choice/commitment-choice';
import { UpgradePage } from '../pages/upgrade/upgrade';
import { TinyMCE } from './tinymce.directive';
import { Database } from './database.service';
import { CgMiracast } from '../providers/cg-miracast';
import { StoredEvent } from '../db/event';
import { StoredConfiguration } from '../db/configuration';
import { StoredContribution } from '../db/contribution';

@NgModule({
  declarations: [
    CompteurGourmand,
    CommitmentListPage,
    CommitmentFormPage,
    ConfigurationPage,
    CommitmentChoicePage,
    HomePage,
    Presentation,
    FootprintPage,
    ChoosePage,
    EventListPage,
    EventFormPage,
    CommitmentAddModal,
    UpgradePage,
    TinyMCE
  ],
  imports: [
      IonicModule.forRoot(CompteurGourmand)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CompteurGourmand,
    EventFormPage,
    EventListPage,
    CommitmentFormPage,
    CommitmentListPage,
    ConfigurationPage,
    CommitmentChoicePage,
    HomePage,
    Presentation,
    FootprintPage,
    ChoosePage,
    CommitmentAddModal,
    UpgradePage,
  ],
  providers: [
    Database,
    CgMiracast,
    StoredEvent,
    StoredConfiguration,
    StoredContribution,
  ]
})
export class AppModule {}
