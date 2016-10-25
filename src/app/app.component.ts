import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { Presentation } from '../pages/presentation/presentation';
import { CgMiracast } from '../providers/cg-miracast';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class CompteurGourmand {
  //rootPage = HomePage;
  rootPage: any

  constructor(platform: Platform, public miracast: CgMiracast) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    switch (miracast.mode) {
        case "tablette":
          this.rootPage = HomePage;
        break;
        case "presentation":
          this.rootPage = Presentation;
        break;
        default:
          console.error("Pas de cg-part !");
          this.rootPage = HomePage;
    }
  }
}
