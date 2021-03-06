import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, Events } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { Presentation } from '../pages/presentation/presentation';
import { CgMiracast } from '../providers/cg-miracast';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { EventListPage } from '../pages/event-list/event-list';
import { CommitmentListPage } from '../pages/commitment-list/commitment-list';
// import { UpgradePage } from '../pages/upgrade/upgrade';
import { ReinitPage } from '../pages/reinit/reinit';
import { StatsPage } from '../pages/stats/stats';
// import { ContactPage } from '../pages/contact/contact';

@Component({
  templateUrl: 'app.component.html'
})
export class CompteurGourmand {
  @ViewChild(Nav) nav : Nav;

  pages: Array<{title: string, component: any}>;

  //rootPage = HomePage;
  rootPage: any

  constructor(public platform: Platform, public menu: MenuController, public miracast: CgMiracast, public events: Events) {

    this.pages = [
      {title: 'Configuration', component: ConfigurationPage},
      {title: 'Liste des événements', component: EventListPage},
      {title: 'Liste des engagements', component: CommitmentListPage},
      // {title: "Mise à jour de l'app", component: UpgradePage},
      {title: "Statistiques", component: StatsPage},
      {title: "Réinitialisation", component: ReinitPage},
    ];

    platform.ready().then(() => {
      StatusBar.styleDefault();
      miracast.init();

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
          // this.nav.setRoot(HomePage, {}, {animate: false});
    });



  }

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component, {});
  }

  logout() {
    this.menu.close();
    this.events.publish('user:logout');
  }

}
