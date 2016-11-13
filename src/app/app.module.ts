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
import { EngagementConfirmPage } from '../pages/engagement-confirm/engagement-confirm';
import { ContactPage } from '../pages/contact/contact';
import { ContributePage } from '../pages/contribute/contribute';
import { UpgradePage } from '../pages/upgrade/upgrade';
import { ReinitPage } from '../pages/reinit/reinit';
import { CommitmentDetailPage } from '../pages/commitment-detail/commitment-detail';
import { TinyMCEDirective } from './tinymce.directive';
import { Database } from './database.service';
import { CgMiracast } from '../providers/cg-miracast';
import { StoredEvent } from '../db/event';
import { StoredConfiguration } from '../db/configuration';
import { StoredContribution } from '../db/contribution';
import { StoredUser } from '../db/user';
import { UserContributions } from '../providers/user-contributions';

@NgModule({
  declarations: [
    CompteurGourmand,
    CommitmentListPage,
    CommitmentFormPage,
    ConfigurationPage,
    CommitmentChoicePage,
    CommitmentDetailPage,
    HomePage,
    Presentation,
    FootprintPage,
    ChoosePage,
    EventListPage,
    EventFormPage,
    EngagementConfirmPage,
    ContributePage,
    CommitmentAddModal,
    UpgradePage,
    ReinitPage,
    ContactPage,
    TinyMCEDirective
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
    CommitmentDetailPage,
    ConfigurationPage,
    CommitmentChoicePage,
    EngagementConfirmPage,
    ContributePage,
    HomePage,
    Presentation,
    FootprintPage,
    ChoosePage,
    CommitmentAddModal,
    ContactPage,
    UpgradePage,
    ReinitPage
  ],
  providers: [
    Database,
    CgMiracast,
    StoredEvent,
    StoredConfiguration,
    StoredContribution,
    StoredUser,
    UserContributions,
  ]
})
export class AppModule {}
