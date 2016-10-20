import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CompteurGourmand } from './app.component';
import { HomePage } from '../pages/home/home';
import { FootprintPage } from '../pages/footprint/footprint';
import { ChoosePage } from '../pages/choose/choose';
import { TinyMCE } from './tinymce.directive';
import { Database } from './database.service';

@NgModule({
  declarations: [
    CompteurGourmand,
    HomePage,
    FootprintPage,
    ChoosePage,
    TinyMCE
  ],
  imports: [
    IonicModule.forRoot(CompteurGourmand)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CompteurGourmand,
    HomePage,
    FootprintPage,
    ChoosePage,
  ],
  providers: [
    Database
  ],
})
export class AppModule {}
