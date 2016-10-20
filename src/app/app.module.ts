import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CompteurGourmand } from './app.component';
import { HomePage } from '../pages/home/home';
import { TinyMCE } from './tinymce.directive';
import { Database } from './database.service';

@NgModule({
  declarations: [
    CompteurGourmand,
    HomePage,
    TinyMCE
  ],
  imports: [
    IonicModule.forRoot(CompteurGourmand)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CompteurGourmand,
    HomePage
  ],
  providers: [
    Database
  ],
})
export class AppModule {}
