import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CompteurGourmand } from './app.component';
import { HomePage } from '../pages/home/home';
import { FootprintPage } from '../pages/footprint/footprint';
import { ChoosePage } from '../pages/choose/choose';
import { CommitmentFormPage } from '../pages/commitment-form/commitment-form';
import { AdminPage } from '../pages/admin/admin';
import { TinyMCE } from './tinymce.directive';
import { Database } from './database.service';

@NgModule({
  declarations: [
    CompteurGourmand,
    CommitmentFormPage,
    HomePage,
    FootprintPage,
    ChoosePage,
    AdminPage,
    TinyMCE
  ],
  imports: [
    IonicModule.forRoot(CompteurGourmand)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CompteurGourmand,
    CommitmentFormPage,
    HomePage,
    FootprintPage,
    AdminPage,
    ChoosePage
  ],
  providers: [
    Database
  ]
})
export class AppModule {}
