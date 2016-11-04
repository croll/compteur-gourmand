import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { Presentation } from '../pages/presentation/presentation';
import { CgMiracast } from '../providers/cg-miracast';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { EventListPage } from '../pages/event-list/event-list';
import { CommitmentListPage } from '../pages/commitment-list/commitment-list';
import { UpgradePage } from '../pages/upgrade/upgrade';
import { EngagementConfirmPage } from '../pages/engagement-confirm/engagement-confirm';

@Component({
  templateUrl: 'app.component.html'
})
export class CompteurGourmand {
  @ViewChild(Nav) nav : Nav;

  pages: Array<{title: string, component: any}>;

  //rootPage = HomePage;
  rootPage: any

  constructor(public platform: Platform, public menu: MenuController, public miracast: CgMiracast) {

    this.pages = [
      {title: 'Configuration', component: ConfigurationPage},
      {title: 'Liste des événements', component: EventListPage},
      {title: 'Liste des engagements', component: CommitmentListPage},
      {title: "Mise à jour de l'app", component: UpgradePage},
    ];

    platform.ready().then(() => {
      StatusBar.styleDefault();
      miracast.init();
      // Temporary hack to disable animations


      switch (miracast.mode) {
        case "tablette":
          // this.rootPage = EngagementConfirmPage;
          this.rootPage = HomePage;
        break;
        case "presentation":
          this.rootPage = Presentation;
        break;
        default:
          console.error("Pas de cg-part !");
          this.rootPage = HomePage;
      }
          // this.nav.setRoot(HomePage, {}, {animate: false});
    });

  }

  openPage(page) {
    this.menu.close();
    // Temporary hack to disable animations
    this.nav.push(page.component, {}, {animate: false});
    // this.nav.setRoot(page.component);
  }

}
