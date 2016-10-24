import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CompteurGourmand } from './app.component';
import { HomePage } from '../pages/home/home';
import { FootprintPage } from '../pages/footprint/footprint';
import { ChoosePage } from '../pages/choose/choose';
import { EventListPage } from '../pages/event-list/event-list';
import { EventFormPage } from '../pages/event-form/event-form';
import { CommitmentListPage } from '../pages/commitment-list/commitment-list';
import { CommitmentFormPage } from '../pages/commitment-form/commitment-form';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { TinyMCE } from './tinymce.directive';
import { Database } from './database.service';

@NgModule({
  declarations: [
    CompteurGourmand,
    CommitmentListPage,
    CommitmentFormPage,
    ConfigurationPage,
    HomePage,
    FootprintPage,
    ChoosePage,
    EventListPage,
    EventFormPage,
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
    HomePage,
    FootprintPage,
    ChoosePage
  ],
  providers: [
    Database
  ]
})
export class AppModule {}
