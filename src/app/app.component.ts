import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { EventListPage } from '../pages/event-list/event-list';
import { CommitmentListPage } from '../pages/commitment-list/commitment-list';

@Component({
  templateUrl: 'app.component.html'
})
export class CompteurGourmand {

  @ViewChild(Nav) nav : Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public menu: MenuController) {

    this.pages = [
      {title: 'Configuration', component: ConfigurationPage},
      {title: 'Liste des événements', component: EventListPage},
      {title: 'Liste des engagements', component: CommitmentListPage},
    ];

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
    // this.nav.setRoot(page.component);
  }

}
