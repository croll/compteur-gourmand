import { Component } from '@angular/core';

import { NavController, ModalController, Events, MenuController } from 'ionic-angular';
import { FootprintPage } from '../footprint/footprint';
import { ChoosePage } from '../choose/choose';
import { UserContributions } from '../../providers/user-contributions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isAdmin = false;
  count: number = 0;
  timer: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private userContributions: UserContributions, private events: Events, private menuCtrl: MenuController) {
    events.subscribe('user:logout', () => {
      this.userContributions.isAdmin = false;
    });
    this.timer = setInterval(() => {
      this.count = 0;
    }, 1500);
  }

  openPopup() {
    let modal = this.modalCtrl.create(FootprintPage);
    modal.present();
  }

  openPage(p) {
    this.navCtrl.push(p);
  }

  begin() {
    this.userContributions.init().then(() => {
      this.navCtrl.push(ChoosePage)
    })
  }

  showAdmin() {
    this.count++;
    if (this.count == 3) {
      this.userContributions.isAdmin = true;
      this.menuCtrl.open();
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
